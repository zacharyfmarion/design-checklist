import { observable, action } from 'mobx';
import { postRequest } from 'helpers/api';
import { sessionStoragePrefix } from 'constants/app';

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
  clearProject = () => {
    this.projectName = '';
    this.projectConfirmed = false;
    this.loading = true;
    sessionStorage.setItem(`${sessionStoragePrefix}_overview`, '');
  };

  @action
  getRules = async (): Promise<*> => {
    try {
      const res = await postRequest(`/overview`, {
        project: this.projectName
      });
      this.data = res.data;
      sessionStorage.setItem(
        `${sessionStoragePrefix}_overview`,
        JSON.stringify({ data: res.data, projectName: this.projectName })
      );
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  };

  constructor() {
    const cached = sessionStorage.getItem(`${sessionStoragePrefix}_overview`);
    if (cached) {
      const { data, projectName } = JSON.parse(cached);
      this.data = data;
      this.projectName = projectName;
      this.loading = false;
      this.projectConfirmed = true;
    }
  }
}

export default RulesStore;
