import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Input from 'components/Input';

// store
import WelcomePageStore from './WelcomePageStore';

// Modals
import TutorialModal from './components/TutorialModal';
import InfoModal from './components/InfoModal';

type Props = {
  error: ?Object,
  onConfirm: Function
};

@observer
class WelcomePage extends React.Component<Props> {
  store: WelcomePageStore;

  constructor(props) {
    super(props);
    this.store = new WelcomePageStore();
  }

  render() {
    const { error, onConfirm, app, ui } = this.props;
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
            onEnter={onConfirm}
            icon="search"
            size="large"
          />
          {this.store.tutorialVisible &&
            <TutorialModal
              onClose={this.store.hideTutorial}
              fromError={!!error}
            />}
          {this.store.infoModalVisible &&
            <InfoModal onClose={this.store.hideInfoModal} />}
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

export default inject('ui', 'app')(WelcomePage);
