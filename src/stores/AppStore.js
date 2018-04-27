// @flow

import { observable, computed, action } from 'mobx';
import { colors, themes } from 'constants/styles';
import { severities } from 'constants/general';
import { applicationPrefix } from 'constants/app';

type Theme = 'light' | 'dark';

/**
 * App store. Code here deals with global application state (use with disgression!). It
 * should be noted that some of the things that are currently in here should maybe be
 * someplace else (e.g. primaryColor should arguably be in UiStore) but since I decided
 * that all the global application state should go here I just threw in in the same
 * place as everything else
 */
class AppStore {
  @observable projectName: ?string;
  @observable projectConfirmed = false;
  @observable sidebarCollapsed: boolean = false;
  @observable primaryColor: string = colors.primary;
  @observable themeName: Theme = 'light';
  // we have a hardcoded backup severity list, but this should be updated
  // as soon as we call the main API endpoint and get the on the backend uses
  @observable severityList: Array<string> = severities;
  @observable filters: Object;
  // For mobile, where sidebar is either displayed or not displayed
  @observable sidebarVisible: boolean = false;

  @computed
  get theme(): Object {
    return themes[this.themeName];
  }

  @action
  formatDefaultFilters() {
    this.filters = this.severityList.reduce((result, item, index, array) => {
      result[item] = true; //a, b, c
      return result;
    }, {});
  }

  @action
  setSeverityList(list: Array<string>) {
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
    sessionStorage.setItem(`${applicationPrefix}_overview`, '');
    sessionStorage.setItem(`${applicationPrefix}_overview_by_file`, '');
    sessionStorage.setItem(`${applicationPrefix}_duplications`, '');
    sessionStorage.setItem(`${applicationPrefix}_commits`, '');
  };

  @action
  toggleSidebar = () => {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  };

  @action
  changePrimaryColor = (color: string) => {
    this.primaryColor = color;
    this.updateCache();
  };

  @action
  changeTheme = (theme: Theme) => {
    this.themeName = theme;
    this.updateCache();
  };

  @action
  updateCache = () => {
    localStorage.setItem(
      `${applicationPrefix}_settings`,
      JSON.stringify({
        theme: this.themeName,
        primary: this.primaryColor,
      }),
    );
  };

  @action
  changeFilter = (severity: string, checked: boolean) => {
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
      `${applicationPrefix}_projectName`,
      name ? name : '',
    );
  };

  constructor() {
    // intialize the default filters
    this.formatDefaultFilters();
    const projectName = sessionStorage.getItem(
      `${applicationPrefix}_projectName`,
    );
    const app = localStorage.getItem(`${applicationPrefix}_settings`);
    if (app) {
      const { primary, theme } = JSON.parse(app);
      this.primaryColor = primary;
      this.themeName = theme;
    }
    if (projectName) {
      this.projectName = projectName;
      this.projectConfirmed = true;
    }
  }
}

export default AppStore;
