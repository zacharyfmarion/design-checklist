import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Progress, Rate } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import GoogleAnalytics from 'helpers/analytics';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import { Flex } from 'reflexbox';
import { colors, shadow } from 'constants/styles';
import { Transition } from 'react-transition-group';
import { categories } from 'constants/general';
import Input from 'components/Input';
import Button from 'components/Button';
import ErrorList from 'components/ErrorList';
import Spin from 'components/Spin';

// local components
import ChecklistStore from './ChecklistStore';
import TutorialModal from './components/TutorialModal';
import FilterMenu from './components/FilterMenu';
import { shadeColor } from '../../helpers/colors';

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
class Checklist extends React.Component<Props> {
  store: ChecklistStore;

  constructor(props: Props) {
    super(props);
    this.store = new ChecklistStore(this.props.app);
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
        <StyledFilterMenu />
        <Button
          primary
          onClick={this.store.refreshProject}
          icon="reload"
          action="clicked refresh"
          label="Checklist"
        >
          {ui.isDesktop && `Refresh`}
        </Button>
      </Flex>
    );
  };

  changeCategory = key => {
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'clicked cateogory',
      label: key
    });
    this.store.changeCategory(key);
  };

  renderErrors = state => {
    const { ui, app } = this.props;
    return (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <PercentageRow column={!ui.isDesktop} isDesktop={ui.isDesktop}>
          {this.store.data &&
            categories.map((key, i) => {
              const handleCategoryChange = () => this.changeCategory(key);
              return (
                <PercentContainer
                  auto
                  column
                  active={this.store.activeCategory === key}
                  isDesktop={ui.isDesktop}
                  justify="center"
                  align={ui.isDesktop ? 'center' : 'flex-start'}
                  onClick={handleCategoryChange}
                  activeColor={shadeColor(app.primaryColor, 0.5)}
                >
                  {!ui.isDesktop &&
                    <CategoryTitle active={this.store.activeCategory === key}>
                      {key}
                    </CategoryTitle>}
                  <ProgressWrapper column justify="center" align="center">
                    <StyledProgress
                      type={ui.isDesktop ? 'circle' : 'line'}
                      percent={Math.round(this.store.data.percentage[key], 1)}
                    />
                    {/* <StyledRate
                      disabled
                      defaultValue={2}
                      color={app.primaryColor}
                    /> */}
                  </ProgressWrapper>
                  {ui.isDesktop &&
                    <CategoryTitle active={this.store.activeCategory === key}>
                      {key}
                    </CategoryTitle>}
                </PercentContainer>
              );
            })}
        </PercentageRow>
        {this.store.data &&
          <StyledErrorList
            category={this.store.activeCategory}
            active={this.store.activeCategory}
            errors={this.store.data.error}
          />}
      </div>
    );
  };

  confirmProject = () => {
    const { app } = this.props;
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'entered project name',
      label: app.projectName
    });
    this.store.confirmProject();
  };

  render() {
    const { app } = this.props;
    console.log(this.store.activeCategory);
    if (!app.projectConfirmed) {
      return (
        <PaddedLayout
          showSidebar={app.projectConfirmed}
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
              onEnter={this.confirmProject}
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
        showSidebar={app.projectConfirmed && !this.store.loading}
      >
        {this.store.loading && this.renderLoading()}
        <Transition in={!this.store.loading} timeout={duration}>
          {state => this.renderErrors(state)}
        </Transition>
      </PaddedLayout>
    );
  }
}

const StyledRate = styled(Rate)`
  position: absolute;
  .ant-rate-star {
    margin: 0;
  }
  .ant-rate-star-full .anticon-star {
    color: ${({ color }) => color};
  }
`;

const ProgressWrapper = styled(Flex)`position: relative;`;

const StyledFilterMenu = styled(FilterMenu)`
  margin-right: 8px;
`;

const StyledProgress = styled(Progress)`
  .ant-progress-text {
    display: none;
  }
  .ant-progress-circle-path {
    stroke: ${({ percent }) =>
      percent < 100
        ? percent > 75 ? colors.average : colors.bad
        : colors.good}
  }
  .ant-progress-bg {
    background: ${({ percent }) =>
      percent < 100
        ? percent > 75 ? colors.average : colors.bad
        : colors.good};
  }
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
  ${({ isDesktop, active, activeColor }) =>
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
    background: ${activeColor};
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

export default inject('ui', 'app')(withRouter(observer(Checklist)));
