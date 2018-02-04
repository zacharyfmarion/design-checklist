/**
 * App store. Code here deals with global application state (use with disgression!)
 */
import { observable, action } from 'mobx';
import { sessionStoragePrefix } from 'constants/app';

class AppStore {
  @observable projectName: string;
  @observable sidebarCollapsed: boolean = false;
  // For mobile, where sidebar is either displayed or not displayed
  @observable sidebarVisible: boolean = false;

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
    sessionStorage.setItem(`${sessionStoragePrefix}_projectName`, name);
  };

  constructor() {
    const projectName = sessionStorage.getItem(
      `${sessionStoragePrefix}_projectName`
    );
    if (projectName) {
      this.projectName = projectName;
    }
  }
}

export default AppStore;
