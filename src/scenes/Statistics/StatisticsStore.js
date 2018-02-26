import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';

class StatisticsStore {
  app: AppStore;

  @observable loading: boolean = true;
  @observable data: boolean = true;
  @observable
  statOrder: Array<string> = [
    'ncloc',
    'classes',
    'functions',
    'comment_lines',
    'comment_lines_density',
    'directories'
  ];
  @observable
  nameMap: Object = {
    functions: 'Number of methods',
    directories: 'Number of Packages',
    comment_lines: 'Number of comment lines',
    comment_lines_density: 'Density of comment lines',
    classes: 'Number of classes',
    ncloc: 'Number of lines of code'
  };

  @computed
  get statistics() {
    return Object.keys(this.data.measures)
      .filter(key => !(key === 'lmethods'))
      .sort((a, b) => this.statOrder.indexOf(a) > this.statOrder.indexOf(b))
      .map((key, i) => ({
        key: i,
        metric: this.nameMap.hasOwnProperty(key) ? this.nameMap[key] : key,
        value: this.data.measures[key]
      }));
  }

  @computed
  get longestMethods() {
    return this.data.measures.lmethods.map(({ path, methodlen }) => ({
      path: this.stripFilename(path),
      methodlen
    }));
  }

  stripFilename = (path: string) => {
    return path.substring(path.indexOf(':', path.indexOf(':') + 1) + 1);
  };

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
