import { action, observable } from 'mobx';

class WelcomePageStore {
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
}

export default WelcomePageStore;
