import * as React from 'react';
import { Table } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
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
            <StyledTable
              dataSource={this.store.statistics}
              columns={columns}
              showHeader={false}
              pagination={false}
            />}
        </Panel>
      </Layout>
    );
  }
}

const StyledTable = styled(Table)`
  flex: 1 1 auto;
`;

export default inject('app')(Statistics);
