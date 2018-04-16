// @flow
import { action, observable } from 'mobx';
import { getRequest } from 'helpers/api';
import { notification } from 'antd';
import AppStore from 'stores/AppStore';

type Options = {
  app: AppStore,
  history: Object,
};

class WelcomeStore {
  app: AppStore;
  history: Object;
  @observable tutorialVisible: boolean = false;
  @observable infoModalVisible: boolean = false;

  @action
  showTutorial = () => {
    this.tutorialVisible = true;
  };

  @action
  hideTutorial = () => {
    this.tutorialVisible = false;
  };

  @action
  showInfoModal = () => {
    this.infoModalVisible = true;
  };

  @action
  hideInfoModal = () => {
    this.infoModalVisible = false;
  };

  // Check whether a project exists. For right now because we do not
  // have a dedicated API endpoint we simply call the statistics endpoint and
  // catch a server error
  @action
  confirmProject = async (): Promise<*> => {
    try {
      await getRequest('/statistics', { project: this.app.projectName });
      this.app.confirmProject();
      this.history.push('/overview');
    } catch (err) {
      console.log(err);
      this.app.unconfirmProject();
      notification.open({
        message: 'Server Error',
        description: 'Your project could not be found',
      });
    }
  };

  constructor({ app, history }: Options) {
    this.app = app;
    this.history = history;
  }
}

export default WelcomeStore;
