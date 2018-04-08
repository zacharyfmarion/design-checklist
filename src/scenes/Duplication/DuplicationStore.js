// @flow
import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';
import AppStore from 'stores/AppStore';
import { message } from 'antd';

class DuplicationStore {
  app: AppStore;

  @observable loading: boolean = true;
  @observable data: boolean = true;
  @observable error: Object;

  @computed
  get duplications() {
    const dups = this.data.error.Duplications.detail;
    const res = [];
    for (let entry of dups) {
      if (entry.code) {
        res.push(entry);
      } else {
        for (let duplication of entry.duplications) {
          res.push({
            ...entry,
            duplications: [duplication],
          });
        }
      }
    }
    console.log(res);
    return res;
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
        project: this.app.projectName,
      });
      this.data = data;
      sessionStorage.setItem(
        `${sessionStoragePrefix}_duplications`,
        JSON.stringify(data),
      );
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.error = {
        title: 'Server Error',
        message: 'Your code duplications could not be loaded from the server.',
      };
      this.loading = false;
    }
  };

  constructor(app: AppStore) {
    this.app = app;
    const cached = sessionStorage.getItem(
      `${sessionStoragePrefix}_duplications`,
    );
    if (cached) {
      const data = JSON.parse(cached);
      this.data = data;
      this.loading = false;
      message.warning(
        'Using cached project data. Presh refresh to check for the latest analysis.',
      );
    }
  }
}

export default DuplicationStore;
