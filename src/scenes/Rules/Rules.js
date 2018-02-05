import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Spin, Progress } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import { Flex } from 'reflexbox';
import { colors, shadow } from 'constants/styles';
import { Transition } from 'react-transition-group';
import Input from 'components/Input';
import Button from 'components/Button';

// local components
import RulesList from './components/RulesList';
import RulesStore from './RulesStore';

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

  handleTabClick = (tab: string) => {
    console.log('A tab was clicked');
    if (tab === 'Checklist') {
      console.log('clicked');
    }
  };

  renderLoading = () => {
    return (
      <LoadingWrapper justify="center" align="center">
        <GreenSpin size="large" />
      </LoadingWrapper>
    );
  };

  renderHeaderActions = () => {
    return (
      !this.store.loading &&
      <Button primary onClick={this.store.clearProject} icon="rollback">
        Back
      </Button>
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
            Object.keys(this.store.data.percentage).map((key, i) => {
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
                    <CategoryTitle>
                      {key}
                    </CategoryTitle>}
                  <StyledProgress
                    type={ui.isMobile ? 'line' : 'circle'}
                    percent={Math.round(this.store.data.percentage[key], 1)}
                  />
                  {ui.isDesktop &&
                    <CategoryTitle>
                      {key}
                    </CategoryTitle>}
                </PercentContainer>
              );
            })}
        </PercentageRow>
        {this.store.data &&
          Object.keys(this.store.data.error).map((category, i) =>
            <StyledRulesList
              category={category}
              active={this.store.activeCategory}
              rules={this.store.data.error}
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
        <PaddedLayout showSidebar={this.store.projectConfirmed}>
          <Flex align="center" justify="center">
            <SearchInput
              onChange={app.setProjectName}
              value={app.projectName}
              placeholder="Enter Project Name..."
              onEnter={this.store.confirmProject}
              icon="search"
              size="large"
            />
          </Flex>
        </PaddedLayout>
      );
    }
    return (
      <PaddedLayout
        actions={this.renderHeaderActions()}
        showSidebar={this.store.projectConfirmed}
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
      percent > 90 ? colors.primary : percent > 75 ? '#fdd75f' : '#e63e3e'}
  }
  .ant-progress-bg {
    background: ${({ percent }) =>
      percent > 90 ? colors.primary : percent > 75 ? '#fdd75f' : '#e63e3e'};
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

const GreenSpin = styled(Spin)`
  .ant-spin-dot {
    width: 50px;
    height: 50px;
    i {
      background: #baf4bc;
      width: 23px;
      height: 23px;
    }
  }
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
    border: 2px solid #108ee9;
    transform: scale(1.06);
    transition: all .2s ease-in;
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

const StyledRulesList = styled(RulesList)`
  margin: 8px;
`;

export default inject('ui', 'app')(withRouter(observer(Rules)));
