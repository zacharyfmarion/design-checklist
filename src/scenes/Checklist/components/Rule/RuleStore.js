import { action, observable } from 'mobx';
import { gitlabGetRequest } from 'helpers/api';

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
  getCode = async (): Promise<*> => {
    // TODO: get rid of this and use auth correctly
    const url = `/projects/${this
      .projectId}/repository/files/${encodeURIComponent(this.fileName)}`;
    try {
      const res = await gitlabGetRequest(url, { ref: 'master' });
      this.data = atob(res.content);
    } catch (err) {
      console.log(err);
    }
  };

  constructor(options: Options) {
    this.projectId = options.projectId;
    this.fileName = options.fileName;
  }
}

export default RuleStore;
