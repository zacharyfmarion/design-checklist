import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';

class StatisticsStore {
  app: AppStore;

  @observable loading: boolean = true;
  @observable data: boolean = true;

  @computed
  get statistics() {
    return Object.keys(this.data.measures).map((key, i) => ({
      key: i,
      metric: key,
      value: this.data.measures[key]
    }));
  }

  @action
  getStatistics = async (): Promise<*> => {
    try {
      const data = await getRequest('/statistics', {
        project: this.app.projectName
      });
      this.data = data;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };

  constructor(app: AppStore) {
    this.app = app;
  }
}

export default StatisticsStore;
