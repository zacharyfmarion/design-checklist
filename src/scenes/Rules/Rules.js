import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Progress } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import { Flex } from 'reflexbox';
import { colors, shadow } from 'constants/styles';
import { Transition } from 'react-transition-group';
import Input from 'components/Input';
import Button from 'components/Button';
import ErrorList from 'components/ErrorList';
import Spin from 'components/Spin';

// local components
import RulesStore from './RulesStore';
import TutorialModal from './components/TutorialModal';

type Props = {
  ui: UiStore,
  app: AppStore
};

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

@observer
class Rules extends React.Component<Props> {
  store: RulesStore;

  constructor(props: Props) {
    super(props);
    this.store = new RulesStore(this.props.app);
  }

  handleTabClick = (tab: string) => {};

  renderLoading = () => {
    return (
      <LoadingWrapper justify="center" align="center">
        <Spin />
      </LoadingWrapper>
    );
  };

  renderHeaderActions = () => {
    const { ui } = this.props;
    return (
      !this.store.loading &&
      <Flex>
        <RefreshButton
          primary
          onClick={this.store.refreshProject}
          icon="reload"
        >
          {ui.isDesktop && `Refresh`}
        </RefreshButton>
        <Button primary onClick={this.store.clearProject} icon="rollback">
          {ui.isDesktop && `Back`}
        </Button>
      </Flex>
    );
  };

  renderErrors = state => {
    const { ui } = this.props;
    return (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <PercentageRow column={!ui.isDesktop} isDesktop={ui.isDesktop}>
          {this.store.data &&
            this.store.categories.map((key, i) => {
              const handleCategoryChange = () => this.store.changeCategory(key);
              return (
                <PercentContainer
                  auto
                  column
                  active={this.store.activeCategory === key}
                  isDesktop={ui.isDesktop}
                  justify="center"
                  align={ui.isDesktop ? 'center' : 'flex-start'}
                  onClick={handleCategoryChange}
                >
                  {!ui.isDesktop &&
                    <CategoryTitle active={this.store.activeCategory === key}>
                      {key}
                    </CategoryTitle>}
                  <StyledProgress
                    type={ui.isMobile ? 'line' : 'circle'}
                    percent={Math.round(this.store.data.percentage[key], 1)}
                  />
                  {ui.isDesktop &&
                    <CategoryTitle active={this.store.activeCategory === key}>
                      {key}
                    </CategoryTitle>}
                </PercentContainer>
              );
            })}
        </PercentageRow>
        {this.store.data &&
          this.store.categories.map((category, i) =>
            <StyledErrorList
              category={category}
              active={this.store.activeCategory}
              errors={this.store.data.error}
            />
          )}
      </div>
    );
  };

  render() {
    const { app } = this.props;
    console.log(this.store.activeCategory);
    if (!this.store.projectConfirmed) {
      return (
        <PaddedLayout
          showSidebar={this.store.projectConfirmed}
          actions={
            <Button
              primary
              icon="question-circle-o"
              onClick={this.store.showTutorial}
            >
              Help
            </Button>
          }
        >
          <Flex column align="center" justify="center">
            <SearchInput
              onChange={app.setProjectName}
              value={app.projectName}
              placeholder="Enter Project Name..."
              onEnter={this.store.confirmProject}
              icon="search"
              size="large"
            />
            {this.store.tutorialVisible &&
              <TutorialModal
                onClose={this.store.hideTutorial}
                fromError={!!this.store.error}
              />}
          </Flex>
        </PaddedLayout>
      );
    }
    return (
      <PaddedLayout
        actions={this.renderHeaderActions()}
        showSidebar={this.store.projectConfirmed && !this.store.loading}
      >
        {this.store.loading && this.renderLoading()}
        <Transition in={!this.store.loading} timeout={duration}>
          {state => this.renderErrors(state)}
        </Transition>
      </PaddedLayout>
    );
  }
}

const StyledProgress = styled(Progress)`
  .ant-progress-circle-path {
    stroke: ${({ percent }) =>
      percent < 100 ? (percent > 75 ? '#fdd75f' : '#e63e3e') : colors.primary}
  }
  .ant-progress-bg {
    background: ${({ percent }) =>
      percent < 100 ? (percent > 75 ? '#fdd75f' : '#e63e3e') : colors.primary};
  }
`;

const RefreshButton = styled(Button)`
  margin-right: 8px;
`;

const CategoryTitle = styled.h2`margin-top: 5px;`;

const PercentageRow = styled(Flex)`
  margin-bottom: 25px;
  ${({ isDesktop }) =>
    !isDesktop &&
    `
    background: #fff;
    border-radius: 5px;
    box-shadow: ${shadow};
    margin: 0 10px 20px 10px;
    padding: 8px 0;
  `}
`;

const SearchInput = styled(Input)`
  width: 350px;
  .input-instance {
    width: 350px;
  }
`;

const LoadingWrapper = styled(Flex)`
  height: 150px;
`;

const PercentContainer = styled(Flex)`
  cursor: pointer;
  ${({ isDesktop, active }) =>
    isDesktop
      ? `
  background: #fff;
  border-radius: 5px;
  box-shadow: ${shadow};
  margin: 0 10px;
  padding: 15px 0;
  ${active &&
    `
    box-shadow: 0 15px 15px rgba(50,50,93,0.2), 0 5px 15px rgba(0,0,0,.4);
    border: 1px solid black;
    background: ${colors.primary};
  `} 
  `
      : `
    padding: 0 10px 5px 10px;
    ${active &&
      `
      background: #e8e8e8;
    `}
  `}
`;

const PaddedLayout = styled(Layout)`
  padding: 20px;
  justify-content: start;
  flex-direction: column;
`;

const StyledErrorList = styled(ErrorList)`
  margin: 8px;
`;

export default inject('ui', 'app')(withRouter(observer(Rules)));
