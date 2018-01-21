import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class RulesStore {
  @observable data: Object;
  @observable loading = true;
  @observable projectName = '';
  @observable projectConfirmed = false;

  @action
  setProjectName = (name: string) => {
    this.projectName = name;
  };

  @action
  confirmProject = () => {
    this.projectConfirmed = true;
    this.getRules();
  };

  @action
  getRules = async (): Promise<*> => {
    try {
      const data = await getRequest(`/${this.projectName}`, {});
      this.data = data;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };
}

export default RulesStore;
