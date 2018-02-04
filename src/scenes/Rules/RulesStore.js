import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import { notification } from 'antd';
import AppStore from 'stores/AppStore';

class RulesStore {
  app: AppStore;

  @observable data: Object;
  @observable loading = true;
  @observable projectConfirmed = false;
  @observable activeCategory: string;

  @action
  confirmProject = () => {
    this.projectConfirmed = true;
    this.getRules();
  };

  @action
  clearProject = () => {
    this.app.setProjectName(undefined);
    this.projectConfirmed = false;
    this.loading = true;
    sessionStorage.setItem(`${sessionStoragePrefix}_overview`, '');
  };

  @action
  changeCategory = (category: string) => {
    this.activeCategory = category;
  };

  @action
  getRules = async (): Promise<*> => {
    if (!this.app.projectName || this.app.projectName === '') {
      throw new Error('Project name not defined');
    }
    try {
      const res = await getRequest(`/show`, { project: this.app.projectName });
      if (res['err']) {
        notification.open({
          message: 'Project Error',
          description: 'Project not found',
          style: {}
        });
        this.app.setProjectName(undefined);
        this.projectConfirmed = false;
        return;
      }
      this.data = res;
      this.activeCategory = Object.keys(res.error)[0];
      sessionStorage.setItem(
        `${sessionStoragePrefix}_overview`,
        JSON.stringify({
          data: res,
          activeCategory: this.activeCategory
        })
      );
      this.loading = false;
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
      this.projectConfirmed = true;
    }
  }
}

export default RulesStore;
