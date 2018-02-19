import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import AppStore from 'stores/AppStore';
import { message } from 'antd';

class DuplicationStore {
  app: AppStore;

  @observable loading: boolean = true;
  @observable data: boolean = true;

  @computed
  get duplications() {
    return this.data.error.Duplications.detail;
  }

  @action
  refresh = () => {
    this.loading = true;
    this.getDuplications();
  };

  @action
  getDuplications = async (): Promise<*> => {
    try {
      const data = await getRequest('/duplications', {
        project: this.app.projectName
      });
      this.data = data;
      sessionStorage.setItem(
        `${sessionStoragePrefix}_duplications`,
        JSON.stringify(data)
      );
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(
      `${sessionStoragePrefix}_duplications`
    );
    if (cached) {
      const data = JSON.parse(cached);
      this.data = data;
      this.loading = false;
      message.warning(
        'Using cached project data. Presh refresh to check for the latest analysis.'
      );
    }
  }
}

export default DuplicationStore;
