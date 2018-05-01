// @flow
import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import { applicationPrefix } from 'constants/app';
import AppStore from 'stores/AppStore';
import { message } from 'antd';

type Data = {
  error: {
    Duplications: {
      'category description': string,
      detail: Array<Object>,
    },
  },
  severitylist: Array<string>,
};

class DuplicationStore {
  app: AppStore;

  @observable loading: boolean = true;
  @observable data: Data;
  @observable error: Object;

  @computed
  get duplications(): Array<Object> {
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
        `${applicationPrefix}_duplications`,
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
    const cached = sessionStorage.getItem(`${applicationPrefix}_duplications`);
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
