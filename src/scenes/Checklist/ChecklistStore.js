// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import { categories } from 'constants/general';
import { message, notification } from 'antd';
import AppStore from 'stores/AppStore';

class ChecklistStore {
  app: AppStore;

  @observable data: ?Object;
  @observable error: ?string;
  @observable loading: boolean = false;
  @observable activeCategory: string = categories[0];

  @computed
  get activeSeverities() {
    return Object.keys(this.app.filters).filter(
      severity => this.app.filters[severity],
    );
  }

  errorSort = (a, b) => {
    return (
      this.app.severityList.indexOf(a.severity) -
      this.app.severityList.indexOf(b.severity)
    );
  };

  errorFilter = error => this.activeSeverities.includes(error.severity);

  // Get all category issues (filtered and sorted)
  getCategoryIssues = category => {
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
  get allIssues() {
    if (!this.data) return null;
    let res = {};
    for (let category of categories) {
      res[category] = this.getCategoryIssues(category);
    }
    return res;
  }

  // Get the active category errors and filter them
  @computed
  get activeCategoryIssues() {
    return this.allIssues[this.activeCategory];
  }

  @computed
  get numCategoryIssues() {
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
  confirmProject = () => {
    this.app.confirmProject();
    this.loading = true;
    this.getRules();
  };

  @action
  refreshProject = () => {
    this.loading = true;
    this.getRules();
  };

  @action
  changeCategory = (category: string) => {
    this.activeCategory = category;
  };

  @action
  clearError = () => {
    this.error = undefined;
  };

  @action
  getRules = async (): Promise<*> => {
    if (!this.app.projectName || this.app.projectName === '') {
      throw new Error('Project name not defined');
    }
    try {
      const res = await getRequest(`/show`, { project: this.app.projectName });
      if (res['err']) {
        this.error = 'Your project could not be found.';
        this.showTutorial();
        this.app.setProjectName(undefined);
        this.app.unconfirmProject();
        return;
      }
      this.data = res;
      this.app.setSeverityList(res.severitylist);
      this.loading = false;
      sessionStorage.setItem(
        `${sessionStoragePrefix}_overview`,
        JSON.stringify({
          data: res,
          activeCategory: this.activeCategory,
        }),
      );
    } catch (err) {
      console.log(err);
      this.error = 'Your project could not be found.';
      notification.open({
        message: 'Server Error',
        description: `There was an error attempting to load your project's analysis. Please contact the developers for support.`,
      });
      this.app.setProjectName(undefined);
      this.app.unconfirmProject();
      return;
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(`${sessionStoragePrefix}_overview`);
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
