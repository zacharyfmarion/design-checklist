import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import { categories } from 'constants/general';
import { message } from 'antd';
import AppStore from 'stores/AppStore';

class ChecklistStore {
  app: AppStore;

  @observable data: ?Object;
  @observable tutorialVisible: boolean = false;
  @observable error: ?string;
  @observable loading: boolean = false;
  @observable activeCategory: string = categories[0];

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
  showTutorial = () => {
    this.tutorialVisible = true;
  };

  @action
  hideTutorial = () => {
    this.tutorialVisible = false;
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
      this.loading = false;
      sessionStorage.setItem(
        `${sessionStoragePrefix}_overview`,
        JSON.stringify({
          data: res,
          activeCategory: this.activeCategory
        })
      );
    } catch (err) {
      console.log(err);
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
        'Using cached project data. Presh refresh to check for the latest analysis.'
      );
    }
  }
}

export default ChecklistStore;
