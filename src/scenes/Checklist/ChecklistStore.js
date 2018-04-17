// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { applicationPrefix } from 'constants/app';
import { categories } from 'constants/general';
import { message, notification } from 'antd';
import AppStore from 'stores/AppStore';

type ByCategoryData = {
  error: Object,
  percentage: Object,
  severitylist: Array<string>,
};

type GraphType = 'treemap' | 'barchart';

class ChecklistStore {
  app: AppStore;

  @observable byCategoryData: ByCategoryData;
  @observable fileError: ?string;
  @observable categoryError: ?string;
  @observable categoryLoading: boolean = false;
  @observable fileLoading: boolean = false;
  @observable activeCategory: string = categories[0];
  @observable treeRoot: string = 'src';
  @observable byFileGraphType: GraphType = 'treemap';

  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  isEmptyObject = (obj: Object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  isEmptyArray = (array: Array<*>) => {
    return array.length === 0 && array.constructor === Array;
  };

  errorSort = (a: Object, b: Object) => {
    return (
      this.app.severityList.indexOf(a.severity) -
      this.app.severityList.indexOf(b.severity)
    );
  };

  errorFilter = (error: Object) =>
    this.activeSeverities.includes(error.severity);

  // Get all category issues (filtered and sorted)
  getCategoryIssues = (category: string) => {
    if (!this.byCategoryData) return null;
    const issues = this.byCategoryData.error[category];
    if (issues instanceof Array) {
      return this.byCategoryData.error[category]
        .sort(this.errorSort)
        .filter(this.errorFilter);
    }
    // Otherwise it is a category with subcategories
    let res = {};
    Object.keys(issues).forEach(key => {
      res[key] = {
        ...issues[key],
        detail: issues[key].detail
          .sort(this.errorSort)
          .filter(this.errorFilter),
      };
    });
    return res;
  };

  // Get all issues associated with files. Note that we also make sure to
  // apply the currently active filters
  getAllIssues = (files: Object) => {
    let res = [];
    Object.keys(files).forEach(file => {
      res = [...res, ...files[file]];
    });
    return res.filter(this.errorFilter);
  };

  canExpandTree = (dir: string): boolean => {
    return (
      this.byFileData[dir] &&
      Object.keys(this.byFileData[dir].directories).length > 0
    );
  };

  // Perform a bfs to format the data in a nested way that actually matches
  // the directory structure of the project itself
  directoryBfs = (directory: string): [Object, number] => {
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('directories')
    ) {
      return [{}, 0];
    }
    let res = {
      directories: {},
      files: this.byFileData[directory].files,
    };
    let total = this.getAllIssues(this.byFileData[directory].files).length;
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      res.directories[dir] = this.directoryBfs(dir);
      const [dirs, subtotal] = this.directoryBfs(dir);
      total += subtotal;
      res.directories[dir] = dirs;
      // if there are no more children
      if (this.isEmptyObject(res.directories[dir])) {
        res.size = this.getAllIssues(this.byFileData[directory].files);
      }
    });
    res.numIssues = total;
    return [res, total];
  };

  directoryGraphBfs = (directory: string) => {
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('files')
    ) {
      return 0;
    }
    let total = this.getAllIssues(this.byFileData[directory].files).length;
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      total += this.directoryGraphBfs(dir);
    });
    return total;
  };

  directoryTreemapBfs = (directory: string): [?Object, number] => {
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('directories')
    ) {
      return [null, 0];
    }
    let res = {
      name: directory,
      children: [],
      parent: 'src',
    };
    let total = this.getAllIssues(this.byFileData[directory].files).length;
    let hasValidChildren = false;
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      const [child, childTotal] = this.directoryTreemapBfs(dir);
      // if there are no more children
      total += childTotal;
      if (child) {
        child.parent = directory;
        res.children.push(child);
        hasValidChildren = true;
      }
    });
    if (!hasValidChildren) {
      res.size = this.getAllIssues(this.byFileData[directory].files).length;
      delete res.children;
    }
    res.size = total;
    return [res, total];
  };

  // Data for the bar chart displayed on the byFile page
  @computed
  get byFileGraphData(): Array<Object> {
    if (!this.byFileData) return [];
    console.log(this.byFileData);
    // we basically traverse each root folder and check how many issues
    // are contained in each one
    return Object.keys(this.byFileData[this.treeRoot].directories).map(dir => {
      return {
        name: dir,
        numIssues: this.directoryGraphBfs(dir),
      };
    });
  }

  // Data for the treemap displayed on the byFile page
  @computed
  get byFileTreemapData(): Array<Object> {
    if (!this.byFileData) return [];
    return this.directoryTreemapBfs(this.treeRoot)[0];
  }

  @computed
  get processedIssuesByFile(): ?Object {
    if (!this.byFileData) return null;
    return this.directoryBfs('src')[0];
  }

  @computed
  get activeSeverities(): Array<string> {
    return Object.keys(this.app.filters).filter(
      severity => this.app.filters[severity],
    );
  }

  // get issues for all categories
  @computed
  get allIssues(): Object {
    if (!this.byCategoryData) return {};
    let res = {};
    for (let category of categories) {
      res[category] = this.getCategoryIssues(category);
    }
    return res;
  }

  // Get the active category errors and filter them
  @computed
  get activeCategoryIssues(): Array<Object> {
    return this.allIssues[this.activeCategory];
  }

  // Number of issues for each category
  @computed
  get numCategoryIssues(): Object {
    let res = {};
    for (let category of categories) {
      const issues = this.allIssues[category];
      if (issues instanceof Array) res[category] = issues.length;
      else {
        res[category] = Object.keys(issues)
          .map(category => issues[category].detail.length)
          .reduce((a, b) => a + b, 0);
      }
    }
    return res;
  }

  @action
  resetTreemap = (): void => {
    this.treeRoot = 'src';
  };

  @action
  zoomOut = (): void => {
    // we basically strip the last slash off of the treeRoot, unless there
    // isn't a slash in which case we leave it
    const lastIndex = this.treeRoot.lastIndexOf('/');
    if (lastIndex >= 0) {
      this.treeRoot = this.treeRoot.substring(0, lastIndex);
    }
  };

  @action
  changeByFileGraphType = (type: GraphType): void => {
    this.byFileGraphType = type;
  };

  @action
  changeTreeRoot = (root: string) => {
    if (this.canExpandTree(root)) {
      this.treeRoot = root;
    }
  };

  @action
  refreshProject = (): void => {
    const path = window.location.hash.substring(1);
    if (path === '/checklist/by-file') {
      this.getIssuesByFile();
    } else if (path === '/checklist/by-category') {
      this.getIssuesByCategory();
    }
  };

  @action
  changeCategory = (category: string): void => {
    this.activeCategory = category;
  };

  @action
  clearError = (): void => {
    this.error = undefined;
  };

  @action
  showCategoryError = (description: string): void => {
    notification.open({
      message: 'Server Error',
      description,
    });
  };

  @action
  getIssuesByCategoryIfNotCached = (): void => {
    if (!this.byCategoryData) {
      this.getIssuesByCategory();
    }
  };

  @action
  getIssuesByFileIfNotCached = (): void => {
    if (!this.byFileData) {
      this.getIssuesByFile();
    }
  };

  @action
  getIssuesByCategory = async (): Promise<*> => {
    if (!this.app.projectName || this.app.projectName === '') {
      throw new Error('Project name not defined');
    }
    this.categoryLoading = true;
    try {
      const res = await getRequest(`/show`, { project: this.app.projectName });
      // If the project could not be found return to the project selection view
      // and basically just reset everything
      if (res['err']) {
        this.error = 'Your project could not be found.';
        this.app.setProjectName(undefined);
        this.showCategoryError(res['err']);
        this.app.unconfirmProject();
        return;
      }
      this.byCategoryData = res;
      this.app.setSeverityList(res.severitylist);
      this.categoryLoading = false;
      // Cache the API response since it takes a long time and you don't want to
      // do it more times than you have to
      sessionStorage.setItem(
        `${applicationPrefix}_overview`,
        JSON.stringify({
          data: res,
          activeCategory: this.activeCategory,
        }),
      );
    } catch (err) {
      console.log(err);
      this.error = 'internal server error';
      // This should be an internal server error as opposed to simply not being able to
      // find the project in sonarqube
      this.showCategoryError(
        `There was an error attempting to load your project's analysis. Please contact the developers for support.`,
      );
      this.app.setProjectName(undefined);
      this.app.unconfirmProject();
      return;
    }
  };

  @action
  getIssuesByFile = async (): Promise<*> => {
    this.fileLoading = true;
    try {
      const data = await getRequest('/directory', {
        project: this.app.projectName,
      });
      this.byFileData = data;
      this.fileLoading = false;
      // Cache the API response since it takes a long time and you don't want to
      // do it more times than you have to
      sessionStorage.setItem(
        `${applicationPrefix}_overview_by_file`,
        JSON.stringify(data),
      );
    } catch (err) {
      console.log(err);
      this.fileError = {
        title: 'Server Error',
        message: 'Your commit data could not be loaded from the server.',
      };
      this.fileLoading = false;
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const categoryCached = sessionStorage.getItem(
      `${applicationPrefix}_overview`,
    );
    const fileCached = sessionStorage.getItem(
      `${applicationPrefix}_overview_by_file`,
    );
    if (categoryCached) {
      const { data, activeCategory } = JSON.parse(categoryCached);
      this.byCategoryData = data;
      this.activeCategory = activeCategory;
      this.categoryLoading = false;
      app.confirmProject();
    }
    if (fileCached) {
      const data = JSON.parse(fileCached);
      this.byFileData = data;
      this.fileLoading = false;
    }
    if (categoryCached || fileCached) {
      message.warning(
        'Using cached project data. Presh refresh to check for the latest analysis.',
      );
    }
  }
}

export default ChecklistStore;
