// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { applicationPrefix } from 'constants/app';
import { categories } from 'constants/general';
import { message, notification } from 'antd';
import AppStore from 'stores/AppStore';

type Data = {
  error: Object,
  percentage: Object,
  severitylist: Array<string>,
};

class ChecklistStore {
  app: AppStore;

  @observable data: Data;
  @observable error: ?string;
  @observable loading: boolean = false;
  @observable activeCategory: string = categories[0];

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
    if (!this.data) return null;
    const issues = this.data.error[category];
    if (issues instanceof Array) {
      return this.data.error[category]
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
    if (!this.data) return {};
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
    this.loading = true;
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
  showError = (description: string): void => {
    notification.open({
      message: 'Server Error',
      description,
    });
  };

  @action
  getRulesIfNotCached = (): void => {
    if (!this.data) {
      this.getRules();
    }
  };

  @action
  getRules = async (): Promise<*> => {
    if (!this.app.projectName || this.app.projectName === '') {
      throw new Error('Project name not defined');
    }
    this.loading = true;
    try {
      const res = await getRequest(`/show`, { project: this.app.projectName });
      // If the project could not be found return to the project selection view
      // and basically just reset everything
      if (res['err']) {
        this.error = 'Your project could not be found.';
        this.app.setProjectName(undefined);
        this.showError(res['err']);
        this.app.unconfirmProject();
        return;
      }
      this.data = res;
      this.app.setSeverityList(res.severitylist);
      this.loading = false;
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
      this.showError(
        `There was an error attempting to load your project's analysis. Please contact the developers for support.`,
      );
      this.app.setProjectName(undefined);
      this.app.unconfirmProject();
      return;
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(`${applicationPrefix}_overview`);
    if (cached) {
      const { data, activeCategory } = JSON.parse(cached);
      this.data = data;
      this.activeCategory = activeCategory;
      this.loading = false;
      app.confirmProject();
      message.warning(
        'Using cached project data. Presh refresh to check for the latest analysis.',
      );
    }
  }
}

export default ChecklistStore;
