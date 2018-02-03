/**
 * App store. Code here deals with global application state (use with disgression!)
 */
import { observable, action } from 'mobx';

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
  };
}

export default AppStore;
