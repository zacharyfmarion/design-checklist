import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import { Flex } from 'reflexbox';
import RulesList from './components/RulesList';
import RulesStore from './RulesStore';
import PercentageCard from './components/PercentageCard';

type Props = {
  ui: UiStore
};

class Rules extends React.Component<Props> {
  store: RulesStore;

  constructor(props: Props) {
    super(props);
    this.store = new RulesStore();
  }

  componentDidMount() {
    // this.store.getRules();
  }

  render() {
    return (
      <PaddedLayout>
        <Flex>
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
      </PaddedLayout>
    );
  }
}

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
