import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class RulesStore {
  @observable data: Object;
  @observable loading = true;

  @action
  getRules = async (): Promise<*> => {
    try {
      const data = await getRequest('/sonar_test', {});
      this.data = data;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };
}

export default RulesStore;
