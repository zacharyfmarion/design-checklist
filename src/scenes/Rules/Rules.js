import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Spin, Progress } from 'antd';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import { Flex } from 'reflexbox';
import { Transition } from 'react-transition-group';
import Input from 'components/Input';
import Button from 'components/Button';
import { scroller } from 'react-scroll';

// local components
import RulesList from './components/RulesList';
import RulesStore from './RulesStore';

type Props = {
  ui: UiStore
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
    this.store = new RulesStore();
  }

  renderLoading = () => {
    return (
      <LoadingWrapper justify="center" align="center">
        <GreenSpin size="large" />
      </LoadingWrapper>
    );
  };

  handleScroll = (key: string) => {
    scroller.scrollTo(key, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -130
    });
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
        <PercentageRow column={!ui.isDesktop}>
          {this.store.data &&
            Object.keys(this.store.data.error).map((key, i) => {
              const handleScroll = () => this.handleScroll(key);
              return (
                <PercentContainer
                  auto
                  column
                  mobile={ui.isMobile}
                  justify="center"
                  align="center"
                  onClick={handleScroll}
                >
                  <StyledProgress
                    type={ui.isMobile ? 'line' : 'circle'}
                    percent={Math.round(this.store.data.percentage[key], 1)}
                  />
                  <CategoryTitle>
                    {key}
                  </CategoryTitle>
                </PercentContainer>
              );
            })}
        </PercentageRow>
        {this.store.data && <StyledRulesList rules={this.store.data.error} />}
      </div>
    );
  };

  render() {
    if (!this.store.projectConfirmed) {
      return (
        <PaddedLayout>
          <Flex align="center" justify="center">
            <SearchInput
              onChange={this.store.setProjectName}
              value={this.store.projectName}
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
      <PaddedLayout>
        {this.store.loading && this.renderLoading()}
        <Transition in={!this.store.loading} timeout={duration}>
          {state => this.renderErrors(state)}
        </Transition>
        {!this.store.loading &&
          <FloatingButton primary onClick={this.store.clearProject}>
            Analyze New Project
          </FloatingButton>}
      </PaddedLayout>
    );
  }
}

const StyledProgress = styled(Progress)`
  .ant-progress-circle-path {
    stroke: ${({ percent }) =>
      percent > 90 ? '#25b47d' : percent > 75 ? '#fdd75f' : '#e63e3e'}
  }
`;

const CategoryTitle = styled.h2`margin-top: 5px;`;

const PercentageRow = styled(Flex)`
  margin-bottom: 25px;
  ${({ column }) =>
    column &&
    `
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    padding: 10px;
  `}
`;

const FloatingButton = styled(Button)`
  position: fixed;
  right: 30px;
  bottom: 70px;
  z-index: 10;
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
  ${({ mobile }) =>
    !mobile &&
    `
  cursor: pointer;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  margin: 0 10px;
  padding: 15px 0;
  
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

export default inject('ui')(observer(Rules));
