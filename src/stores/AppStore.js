// @flow
/**
 * App store. Code here deals with global application state (use with disgression!)
 */
import { observable, action } from 'mobx';
import { colors } from 'constants/styles';
import { severities } from 'constants/general';
import { sessionStoragePrefix } from 'constants/app';

class AppStore {
  @observable projectName: string;
  @observable projectConfirmed = false;
  @observable sidebarCollapsed: boolean = false;
  @observable primaryColor: string = colors.primary;
  // we have a hardcoded backup severity list, but this should be updated
  // as soon as we call the main API endpoint and get the on the backend uses
  @observable severityList: Array<string> = severities;
  @observable filters: Object;
  // For mobile, where sidebar is either displayed or not displayed
  @observable sidebarVisible: boolean = false;

  @action
  formatDefaultFilters(filterList: Array<string>) {
    this.filters = this.severityList.reduce((result, item, index, array) => {
      result[item] = true; //a, b, c
      return result;
    }, {});
  }

  @action
  setSeverityList(list) {
    this.severityList = list;
    this.formatDefaultFilters();
  }

  @action
  confirmProject = () => {
    this.projectConfirmed = true;
  };

  @action
  unconfirmProject = () => {
    this.projectConfirmed = false;
  };

  @action
  clearProject = () => {
    this.setProjectName(undefined);
    this.projectConfirmed = false;
    sessionStorage.setItem(`${sessionStoragePrefix}_overview`, '');
    sessionStorage.setItem(`${sessionStoragePrefix}_duplications`, '');
  };

  @action
  toggleSidebar = () => {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  };

  @action
  changeTheme = (color: string) => {
    this.primaryColor = color;
    this.updateCache();
  };

  @action
  updateCache = () => {
    localStorage.setItem(
      `${sessionStoragePrefix}_settings`,
      JSON.stringify({
        primary: this.primaryColor,
      }),
    );
  };

  @action
  changeFilter = (severity, checked) => {
    this.filters[severity] = checked;
    this.updateCache();
  };

  @action
  toggleSidebarVisibility = () => {
    this.sidebarVisible = !this.sidebarVisible;
  };

  @action
  setProjectName = (name: ?string) => {
    this.projectName = name;
    sessionStorage.setItem(
      `${sessionStoragePrefix}_projectName`,
      name ? name : '',
    );
  };

  constructor() {
    // intialize the default filters
    this.formatDefaultFilters();
    const projectName = sessionStorage.getItem(
      `${sessionStoragePrefix}_projectName`,
    );
    const app = localStorage.getItem(`${sessionStoragePrefix}_settings`);
    if (app) {
      const { primary } = JSON.parse(app);
      this.primaryColor = primary;
    }
    if (projectName) {
      this.projectName = projectName;
      this.projectConfirmed = true;
    }
  }
}

export default AppStore;
