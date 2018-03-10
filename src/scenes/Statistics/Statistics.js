import * as React from 'react';
import { Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';
import Layout from 'components/Layout';
import ErrorMessage from 'components/ErrorMessage';
import Spin from 'components/Spin';
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
    title: 'Method Name',
    dataIndex: 'methodname',
    key: 'methodname'
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

  renderStatistics() {
    const { app } = this.props;
    const { error } = this.store;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return (
      <Flex column auto>
        <SectionHeader primary={app.primaryColor} topHeader>
          General Statistics
        </SectionHeader>
        <StyledTable
          dataSource={this.store.statistics}
          bordered
          columns={columns}
          pagination={false}
        />
        <SectionHeader primary={app.primaryColor}>
          Longest Methods
        </SectionHeader>
        <StyledTable
          dataSource={this.store.longestMethods}
          columns={longestMethodsColumns}
          bordered
          pagination={false}
          monospace
        />
      </Flex>
    );
  }

  render() {
    return (
      <Layout>
        <Panel>
          {this.store.loading
            ? <LoadingContainer auto justify="center">
                <Spin />
              </LoadingContainer>
            : this.renderStatistics()}
        </Panel>
      </Layout>
    );
  }
}

const SectionHeader = styled.h3`
  color: ${({ primary }) => primary};
  margin: ${({ topHeader }) => (topHeader ? 0 : 20)}px 0 10px 0;
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

const StyledTable = styled(Table)`
  ${({ monospace }) =>
    monospace &&
    `
    .ant-table-row td {
      font-family: monospace;
    }
  `}
`;

export default inject('app')(Statistics);
