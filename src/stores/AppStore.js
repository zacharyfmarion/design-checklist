/**
 * App store. Code here deals with global application state (use with disgression!)
 */
import { observable, action } from 'mobx';
import { sessionStoragePrefix } from 'constants/app';

class AppStore {
  @observable projectName: string;
  @observable projectConfirmed = false;
  @observable sidebarCollapsed: boolean = false;
  // For mobile, where sidebar is either displayed or not displayed
  @observable sidebarVisible: boolean = false;

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
  toggleSidebarVisibility = () => {
    this.sidebarVisible = !this.sidebarVisible;
  };

  @action
  setProjectName = (name: ?string) => {
    this.projectName = name;
    sessionStorage.setItem(
      `${sessionStoragePrefix}_projectName`,
      name ? name : ''
    );
  };

  constructor() {
    const projectName = sessionStorage.getItem(
      `${sessionStoragePrefix}_projectName`
    );
    if (projectName) {
      this.projectName = projectName;
      this.projectConfirmed = true;
    }
  }
}

export default AppStore;
