import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import { Flex } from 'reflexbox';
import { Transition } from 'react-transition-group';
import Input from 'components/Input';
import Button from 'components/Button';

// local components
import RulesList from './components/RulesList';
import RulesStore from './RulesStore';
import PercentageCard from './components/PercentageCard';

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

  renderErrors = state => {
    const { ui } = this.props;
    return (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <Flex wrap={ui.isMobile}>
          {this.store.data
            ? Object.keys(this.store.data.error).map((key, i) =>
                <StyledPercentageCard
                  title={`${key} (${this.store.data.error[key].length} errors)`}
                  key={i}
                  percent={this.store.data.percentage[key]}
                />
              )
            : <Spin size="large" />}
        </Flex>
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

const StyledPercentageCard = styled(PercentageCard)`
  border-radius: 5px;
  text-align: center;
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
