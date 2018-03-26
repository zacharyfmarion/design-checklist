import { action, computed, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import AppStore from 'stores/AppStore';

class GraphsStore {
  app: AppStore;
  @observable commits: Object;
  @observable loading: boolean = true;
  @observable error: string;

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
  get data() {
    return this.commitNumberData;
  }

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
      this.loading = false;
      this.error = {
        title: 'Server Error',
        message: 'Your commit data could not be loaded from the server.'
      };
    }
  };

  constructor(app: AppStore) {
    this.app = app;
  }
}

export default GraphsStore;
