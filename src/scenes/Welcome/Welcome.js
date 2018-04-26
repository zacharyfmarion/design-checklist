// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import GoogleAnalytics from 'helpers/analytics';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Input from 'components/Input';

// store
import WelcomeStore from './WelcomeStore';

// Modals
import TutorialModal from './components/TutorialModal';
import InfoModal from './components/InfoModal';

type Props = {
  /** Ui store for responsivity */
  ui: UiStore,
  /** App store for global application state */
  app: AppStore,
  /** The history object passed in by React Router */
  history: Object,
};

/**
 * The first scene that is shown when the user goes to the app's URL. It
 * displays an input that asks for the project name, and once this input
 * is entered the application redirects to the `<Checklist />` page
 */
@observer
class Welcome extends React.Component<Props> {
  store: WelcomeStore;

  constructor(props) {
    super(props);
    const { app, history } = this.props;
    this.store = new WelcomeStore({ app, history });
  }

  /**
   * Wrapper for the stores confirmProject method that also sends
   * analytics data to Google Analytics
   */
  confirmProject = () => {
    const { app } = this.props;
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'entered project name',
      label: app.projectName,
    });
    this.store.confirmProject();
  };

  render() {
    const { app, ui } = this.props;
    return (
      <PaddedLayout
        showSidebar={false}
        actions={
          <div>
            <Button
              primary
              icon="question-circle-o"
              onClick={this.store.showTutorial}
            >
              {!ui.isMobile && `Help`}
            </Button>
            <InfoButton
              primary
              icon="info-circle-o"
              onClick={this.store.showInfoModal}
            >
              {!ui.isMobile && `Info`}
            </InfoButton>
          </div>
        }
      >
        <Flex column align="center" justify="center">
          <SearchInput
            onChange={app.setProjectName}
            value={app.projectName}
            placeholder="Enter Project Name..."
            onEnter={this.confirmProject}
            icon="search"
            size="large"
          />
          {this.store.tutorialVisible && (
            <TutorialModal
              onClose={this.store.hideTutorial}
              fromError={false}
            />
          )}
          {this.store.infoModalVisible && (
            <InfoModal onClose={this.store.hideInfoModal} />
          )}
        </Flex>
      </PaddedLayout>
    );
  }
}

const InfoButton = styled(Button)`
  margin-left: 8px;
`;

const SearchInput = styled(Input)`
  width: 350px;
  .input-instance {
    width: 350px;
  }
`;

const PaddedLayout = styled(Layout)`
  padding: 20px;
  justify-content: start;
  flex-direction: column;
`;

export default inject('ui', 'app')(withRouter(Welcome));
