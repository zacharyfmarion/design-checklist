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

type GraphType = 'treemap' | 'barchart' | 'piechart';

type FileError = {
  title: string,
  message: string,
};

/**
 * The store that holds all the data and methods for both the
 * `<ByFile />` and `<ByCategory />` components
 * @param {AppStore} app The AppStore singleton passed in through mobx-react
 */
class ChecklistStore {
  app: AppStore;

  @observable byCategoryData: ByCategoryData;
  @observable byFileData: Object;
  @observable fileError: ?FileError;
  @observable categoryError: ?string;
  @observable categoryLoading: boolean = false;
  @observable fileLoading: boolean = false;
  @observable activeCategory: string = categories[0];
  @observable treeRoot: string = 'src';
  @observable byFileGraphType: GraphType = 'treemap';
  @observable issuesModalOpen: boolean = false;
  @observable issuesModalDirectory: string;
  @observable issuesModalFile: string;

  /**
   * Check whether an object is empty ({})
   * reference: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
   * @param {Object} obj The object we are checking
   */
  isEmptyObject = (obj: Object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  /**
   * Check whether an array is empty ([])
   * @param {Array} array The array we are checking
   */
  isEmptyArray = (array: Array<*>) => {
    return array.length === 0 && array.constructor === Array;
  };

  /**
   * Comparator function used in sort() to sort issues by severity
   * @param {Object} a The first issue
   * @param {Object} b The second issue
   */
  errorSort = (a: Object, b: Object) => {
    return (
      this.app.severityList.indexOf(a.severity) -
      this.app.severityList.indexOf(b.severity)
    );
  };

  /**
   * function used in filter() to filter issues by the currently active
   * severities.
   * @param {Object} error The error object
   */
  errorFilter = (error: Object) =>
    this.activeSeverities.includes(error.severity);

  /**
   * Get all issues for a give category (filtered and sorted). This is used
   * in the <ByCategory /> page
   * @param {String} category The category we get the errors for
   */
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

  /**
   * Get all issues associated with files. Note that we also make sure to
   * apply the currently active filters. Basically transforms the Object
   * format into one long array
   * @param {Object} files The Object containing issues
   * @returns {Array} Array of flattened issues
   */
  flattenIssues = (files: Object) => {
    let res = [];
    Object.keys(files).forEach(file => {
      res = [...res, ...files[file]];
    });
    return res.filter(this.errorFilter);
  };

  /**
   * Determines whether the current directory can be expanded further
   * @param {String} dir The directory to check
   * @returns {Boolean} Whether or not the directory is valid as the new
   * treeRoot
   */
  canExpandTree = (dir: string): boolean => {
    return (
      this.byFileData[dir] &&
      (Object.keys(this.byFileData[dir].directories).length > 0 ||
        this.flattenIssues(this.byFileData[dir].files).length > 0)
    );
  };

  /**
   * Perform a bfs to format the data in a nested way that actually matches
   * the directory structure of the project itself. This traversal is to get
   * the format for the nested Collapse Panels in `<ByFile />`
   * @param {String} directory The directory that we are currently iterating
   * over in the traversal
   * @returns {Array} Array of length two where the first element is the
   * current directory structure and the second is the number of files in
   * that directory and all directories it contains
   */
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
      numIssues: 0,
    };
    let total = this.flattenIssues(this.byFileData[directory].files).length;
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      res.directories[dir] = this.directoryBfs(dir);
      const [dirs, subtotal] = this.directoryBfs(dir);
      total += subtotal;
      res.directories[dir] = dirs;
      // if there are no more children
      if (this.isEmptyObject(res.directories[dir])) {
        // $FlowIssue
        res.size = this.flattenIssues(this.byFileData[directory].files);
      }
    });
    res.numIssues = total;
    return [res, total];
  };

  /**
   * Get a count of all the issues in the directory passed in.
   * @param {String} directory The directory that we are currently iterating
   * over in the traversal
   * @returns {Number} Number of issues in the directory
   */
  directoryGraphBfs = (directory: string) => {
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('files')
    ) {
      return 0;
    }
    let total = this.flattenIssues(this.byFileData[directory].files).length;
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      total += this.directoryGraphBfs(dir);
    });
    return total;
  };

  /**
   * Traverse the data and construct a representation of the file structure
   * that can be used by the <Treemap /> component of Recharts. Currently this
   * method is a bit long and should maybe be refactored
   * @returns {Array} Array of length two where the first element is the
   * current directory structure and the second is the number of files in
   * that directory and all directories it contains
   */
  directoryTreemapBfs = (directory: string): [?Object, number] => {
    // Base case to check whether there are any more directories to traverse
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('directories')
    ) {
      return [null, 0];
    }
    let res = { name: directory, children: [], parent: 'src', size: 0 };
    let total = 0;
    let hasValidChildren = false;
    // iterate over each directory
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      const [child, childTotal] = this.directoryTreemapBfs(dir);
      // if there are no more children
      total += childTotal;
      if (child && child.size > 0) {
        child.parent = directory;
        res.children.push(child);
        hasValidChildren = true;
      }
    });
    // iterate over each file in the current directory and add if it has
    // more than 0 issues
    Object.keys(this.byFileData[directory].files).forEach(file => {
      const numIssues = this.byFileData[directory].files[file].length;
      if (numIssues > 0) {
        res.children.push({
          name: file,
          parent: directory,
          size: numIssues,
        });
        total += numIssues;
        hasValidChildren = true;
      }
    });
    // If there are no valid children of the current directory then we set the
    // size property to the number of issues in the current dir and then delete
    // the children property from the object
    if (!hasValidChildren) {
      res.size = this.flattenIssues(this.byFileData[directory].files).length;
      delete res.children;
    }
    res.size = total;
    return [res, total];
  };

  /**
   * Data for the `<ByFileBarChart />` and `<ByFilePieChart />`. Note that
   * the data for the `<ByFileTreemap />` is in a separate format which is
   * constructed with `directoryTreemapBfs()`.
   * @returns {Array} Array containing objects with a name and a
   * number of issues
   */
  @computed
  get byFileGraphData(): Array<Object> {
    if (!this.byFileData) return [];
    // we basically traverse each root folder and check how many issues
    // are contained in each one
    const obj = Object.keys(this.byFileData[this.treeRoot].directories)
      .map(dir => {
        return {
          name: dir,
          numIssues: this.directoryGraphBfs(dir),
        };
      })
      .filter(item => item.numIssues > 0);
    // We also push all the files in the root directory
    Object.keys(this.byFileData[this.treeRoot].files).forEach(file => {
      const numIssues = this.byFileData[this.treeRoot].files[file].length;
      if (numIssues > 0) {
        obj.push({
          name: file,
          numIssues,
        });
      }
    });
    return obj;
  }

  /**
   * Data for the treemap displayed on the byFile page
   */
  @computed
  get byFileTreemapData(): ?Object {
    if (!this.byFileData) return null;
    const treemapData = this.directoryTreemapBfs(this.treeRoot);
    return treemapData && treemapData[0] ? treemapData[0].children : null;
  }

  /**
   * Data that is displayed in the Collapse panels on the <ByFile /> page
   * which is essentially a representation of the file structure.
   */
  @computed
  get processedIssuesByFile(): ?Object {
    if (!this.byFileData) return null;
    return this.directoryBfs('src')[0];
  }

  /**
   * An array containing the severities that are currently active (not
   * filtered). Basically just a convenience and this format is easier ot
   * parse than the format stored in `AppStore.js`.
   */
  @computed
  get activeSeverities(): Array<string> {
    return Object.keys(this.app.filters).filter(
      severity => this.app.filters[severity],
    );
  }

  /**
   * Returns an object issues for all categories. Note that in the future
   * the categories should be dynamically set from the API response instead
   * of hardcoded on the frontend
   */
  @computed
  get allIssues(): Object {
    if (!this.byCategoryData) return {};
    let res = {};
    for (let category of categories) {
      res[category] = this.getCategoryIssues(category);
    }
    return res;
  }

  /**
   * Get the active category errors and filter them
   */
  @computed
  get activeCategoryIssues(): Array<Object> {
    return this.allIssues[this.activeCategory];
  }

  /**
   * Number of issues for each category
   */
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

  /**
   * Issues that are displayed in the issues modal
   */
  @computed
  get modalIssues(): Array<Object> {
    return this.byFileData[this.issuesModalDirectory].files[
      this.issuesModalFile
    ];
  }

  /**
   * Opens the issues modal
   */
  @action
  openIssuesModal = (): void => {
    this.issuesModalOpen = true;
  };

  /**
   * Closes the issues modal
   */
  @action
  closeIssuesModal = (): void => {
    this.issuesModalOpen = false;
  };

  /**
   * Sets the treeRoot property back to 'src', which is the root directory
   * for all of the projects
   */
  @action
  resetTreemap = (): void => {
    this.treeRoot = 'src';
  };

  /**
   * Moves `this.treeRoot` up a directory if it is possible
   */
  @action
  zoomOut = (): void => {
    // we basically strip the last slash off of the treeRoot, unless there
    // isn't a slash in which case we leave it
    const lastIndex = this.treeRoot.lastIndexOf('/');
    if (lastIndex >= 0) {
      this.treeRoot = this.treeRoot.substring(0, lastIndex);
    }
  };

  /**
   * Change the currently visible graph type on the `<ByFile />` page.
   * @param {GraphType} type The string type of the graph (e.g. 'treemap')
   */
  @action
  changeByFileGraphType = (type: GraphType): void => {
    this.byFileGraphType = type;
  };

  /**
   * Attempts to change the root of the tree to a particular directory. If this
   * directory is in fact a file, it istead opens the issues modal and does not
   * change `this.treeRoot`.
   * @param {String} root The directory or file that we are attempting to change
   * the treeRoot to
   */
  @action
  changeTreeRoot = (root: string) => {
    if (this.canExpandTree(root)) {
      this.treeRoot = root;
    } else {
      const slash = root.lastIndexOf('/');
      const directory = root.slice(0, slash);
      if (this.byFileData.hasOwnProperty(directory)) {
        this.issuesModalFile = root;
        this.issuesModalDirectory = directory;
        this.openIssuesModal();
      }
    }
  };

  /**
   * Refresh the correct API data based on the currently active route
   */
  @action
  refreshProject = (): void => {
    const path = window.location.hash.substring(1);
    if (path === '/checklist/by-file') {
      this.getIssuesByFile();
    } else if (path === '/checklist/by-category') {
      this.getIssuesByCategory();
    }
  };

  /**
   * Change the current active category on the `<ByCategory />` page.
   */
  @action
  changeCategory = (category: string): void => {
    this.activeCategory = category;
  };

  /**
   * Show a notification displaying an error
   * @param {String} description The message to be displayed
   */
  @action
  showCategoryError = (description: string): void => {
    notification.open({
      message: 'Server Error',
      description,
    });
  };

  /**
   * If the issues by cateogry data is not cached in sessionStorage
   * then we call the API endpoint. This method is used when the
   * `<ByCategory />` component is mounted.
   */
  @action
  getIssuesByCategoryIfNotCached = (): void => {
    if (!this.byCategoryData) {
      this.getIssuesByCategory();
    }
  };

  /**
   * If the issues by file data is not cached in sessionStorage
   * then we call the API endpoint. This method is used when the
   * `<ByFile />` component is mounted.
   */
  @action
  getIssuesByFileIfNotCached = (): void => {
    if (!this.byFileData) {
      this.getIssuesByFile();
    }
  };

  /**
   * Get the data to be used in the `<ByCategory />` component from the
   * backend.
   */
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

  /**
   * Get the data to be used in the `<ByFile />` component from the
   * backend.
   */
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
