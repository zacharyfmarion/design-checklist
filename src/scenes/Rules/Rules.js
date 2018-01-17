import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { Card, Spin } from 'antd';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import { Flex, Box } from 'reflexbox';
import RulesList from './components/RulesList';
import RulesStore from './RulesStore';

type Props = {
  ui: UiStore,
};

const Percent = ({ percent }) =>
  <div>
    <BigNumber>
      {percent}
    </BigNumber>
    <SuperScript>%</SuperScript>
  </div>;

const RatingBox = ({ className, percent, title }) =>
  <Box
    w={[1, 1 / 3, 1 / 3]}
    m={1}
    align="center"
    justify="center"
    className={className}
  >
    <RatingCard title={title} percent={percent}>
      <Percent percent={percent} />
    </RatingCard>
  </Box>;

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
            ? Object.keys(this.store.data).map((key, i) =>
                <StyledRatingBox
                  title={`${key} (${this.store.data[key].rules.length} errors)`}
                  key={i}
                  percent={this.store.data[key].percent}
                />
              )
            : <Spin size="large" />}
        </Flex>
        {this.store.data && <StyledRulesList rules={this.store.data} />}
      </PaddedLayout>
    );
  }
}

const SuperScript = styled.span`
  vertical-align: top;
  line-height: 2em;
  font-size: 6em;
  color: #fff;
`;

const BigNumber = styled.span`
  font-size: 10em;
  color: #fff;
`;

const StyledRatingBox = styled(RatingBox)`
  border-radius: 5px;
  text-align: center;
`;

const RatingCard = styled(Card)`
  background: ${({ percent }) => (percent < 100 ? 'red' : 'green')};
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
