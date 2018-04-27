// @flow
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
  /** App store for global application state */
  app: AppStore,
};

const columns = [
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const longestMethodsColumns = [
  {
    title: 'File Name',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Method Name',
    dataIndex: 'methodname',
    key: 'methodname',
  },
  {
    title: 'Length',
    dataIndex: 'methodlen',
    key: 'methodlen',
  },
];

/**
 * Toplevel scene the displays stats about the project, such as
 * how many packages they have and how many lines of code
 */
@observer
class Statistics extends React.Component<Props> {
  store: StatisticsStore;

  constructor(props: Props) {
    super(props);
    this.store = new StatisticsStore(props.app);
  }

  /**
   * Call the API to get the project stats. Note that this endpoint is
   * so small that it is currently not cached
   */
  componentDidMount() {
    this.store.getStatistics();
  }

  /**
   * What is rendered if the API call has been completed successfully
   */
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
          theme={app.theme}
          bordered
          columns={columns}
          pagination={false}
        />
        <SectionHeader primary={app.primaryColor}>
          Longest Methods
        </SectionHeader>
        <StyledTable
          theme={app.theme}
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
          {this.store.loading ? (
            <LoadingContainer auto justify="center">
              <Spin />
            </LoadingContainer>
          ) : (
            this.renderStatistics()
          )}
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
  ${({ monospace, theme }) => `
    .ant-table-row td {
      ${monospace && `font-family: monospace;`}
    }
    .ant-table-thead > tr > th {
      background: ${theme.backgroundSecondary};
      color: ${theme.color} !important;
    }
    .ant-table {
      color: ${theme.color} !important;
    }
    .ant-table-placeholder {
      background: ${theme.background};
      color: ${theme.color} !important;
    }
    .ant-table-tbody > tr:hover > td {
      background: ${theme.backgroundSecondary};
    }
  `};
`;

export default inject('app')(Statistics);
