import { action, observable } from 'mobx';

type Options = {
  projectId: string,
  fileName: string
};

class RuleStore {
  projectId: string;
  fileName: string;

  @observable loaded: boolean = false;
  @observable data: string = '';

  @action
  getCode = () => {
    // TODO: get rid of this and use auth correctly
    const token = '?????';
    const url = `https://coursework.cs.duke.edu/api/v4/projects/${this
      .projectId}/repository/files/${encodeURIComponent(
      this.fileName
    )}/raw?ref=master`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Private-Token': token
      }
    })
      .then(res => res.text())
      .then(res => {
        console.log(res);
        this.data = res;
        this.loaded = true;
      })
      .catch(err => console.log(err));
  };

  constructor(options: Options) {
    this.projectId = options.projectId;
    this.fileName = options.fileName;
  }
}

export default RuleStore;
