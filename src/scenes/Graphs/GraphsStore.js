import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';

class GraphsStore {
  app: AppStore;
  modes: Array<Object> = [
    {
      title: 'Commit number',
      value: 'commits'
    },
    {
      title: 'Percentage of lines',
      value: 'percentage'
    }
  ];
  @observable activeMode: string = this.modes[0].value;
  @observable commits: Object;
  @observable loading: boolean = true;

  @computed
  get commitNumberData() {
    if (!this.commits) return [];
    const authors = this.commits.authors;
    return Object.keys(authors).map(author => {
      return {
        name: author,
        commits: authors[author].numofcommits
      };
    });
  }

  @computed
  get commitPercentageData() {
    if (!this.commits) return [];
    const authors = this.commits.authors;
    return Object.keys(authors).map(author => {
      return {
        name: author,
        percentage: authors[author].percentageofcommits
      };
    });
  }

  @computed
  get data() {
    return this.activeMode === 'commits'
      ? this.commitNumberData
      : this.commitPercentageData;
  }

  @action
  changeMode = mode => {
    this.activeMode = mode;
  };

  @action
  getCommits = async (): Promise<*> => {
    try {
      const data = await getRequest('/commit', {
        project: this.app.projectName,
        group: 'CompSci308_2018Spring'
      });
      this.commits = data;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };

  constructor(app: AppStore) {
    this.app = app;
  }
}

export default GraphsStore;
