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

class ChecklistStore {
  app: AppStore;

  @observable byCategoryData: ByCategoryData;
  @observable fileError: ?string;
  @observable categoryError: ?string;
  @observable categoryLoading: boolean = false;
  @observable fileLoading: boolean = false;
  @observable activeCategory: string = categories[0];

  // Perform a bfs to format the data in a nested way that actually matches
  // the directory structure of the project itself
  directoryBfs = (directory: string) => {
    if (
      !this.byFileData.hasOwnProperty(directory) ||
      !this.byFileData[directory].hasOwnProperty('directories')
    ) {
      return {};
    }
    let res = {
      directories: {},
      files: this.byFileData[directory].files,
    };
    // iterate over each directory in file
    Object.keys(this.byFileData[directory].directories).forEach(dir => {
      res.directories[dir] = this.directoryBfs(dir);
    });
    return res;
  };

  @computed
  get processedIssuesByFile(): ?Object {
    if (!this.byFileData) return null;
    return this.directoryBfs('.');
  }

  @computed
  get activeSeverities(): Array<string> {
    return Object.keys(this.app.filters).filter(
      severity => this.app.filters[severity],
    );
  }

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
  refreshProject = (): void => {
    this.categoryLoading = true;
    this.fileLoading = true;
    this.getRules();
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
