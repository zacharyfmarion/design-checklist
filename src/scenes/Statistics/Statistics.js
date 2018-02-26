import * as React from 'react';
import { Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { colors } from 'constants/styles';
import AppStore from 'stores/AppStore';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import StatisticsStore from './StatisticsStore';

type Props = {
  app: AppStore
};

const columns = [
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric'
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value'
  }
];

const longestMethodsColumns = [
  {
    title: 'File Name',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: 'Length',
    dataIndex: 'methodlen',
    key: 'methodlen'
  }
];

@observer
class Statistics extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.store = new StatisticsStore(props.app);
  }

  componentDidMount() {
    this.store.getStatistics();
  }

  render() {
    return (
      <Layout>
        <Panel>
          {!this.store.loading &&
            <Flex column auto>
              <SectionHeader topHeader>General Statistics</SectionHeader>
              <StyledTable
                dataSource={this.store.statistics}
                bordered
                columns={columns}
                pagination={false}
              />
              <SectionHeader>Longest Methods</SectionHeader>
              <StyledTable
                dataSource={this.store.longestMethods}
                columns={longestMethodsColumns}
                bordered
                pagination={false}
              />
            </Flex>}
        </Panel>
      </Layout>
    );
  }
}

const SectionHeader = styled.h3`
  color: ${colors.primary};
  margin: ${({ topHeader }) => (topHeader ? 0 : 20)}px 0 10px 0;
`;

const StyledTable = styled(Table)`
`;

export default inject('app')(Statistics);
