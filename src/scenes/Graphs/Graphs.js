// @flow
import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import Spin from 'components/Spin';
import Panel from 'components/Panel';
import ErrorMessage from 'components/ErrorMessage';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import GraphsStore from './GraphsStore';

@observer
class Graphs extends React.Component<{}> {
  constructor(props: Props) {
    super(props);
    this.store = new GraphsStore(props.app);
  }

  componentDidMount() {
    this.store.getCommits();
  }

  handleModeChange = mode => {
    this.store.changeMode(mode);
  };

  renderGraph = () => {
    const { app } = this.props;
    const { error } = this.store;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return (
      this.store.commits && (
        <ChartWrapper column>
          <Flex justify="center" align="center">
            <h2 color={app.primaryColor}>Number of Commits</h2>
          </Flex>
          <ResponsiveContainer>
            <BarChart width={600} height={300} data={this.store.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="commits" fill={app.primaryColor} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      )
    );
  };

  render() {
    return (
      <Layout>
        <Panel column auto>
          {this.store.loading ? (
            <LoadingContainer auto justify="center">
              <Spin />
            </LoadingContainer>
          ) : (
            this.renderGraph()
          )}
        </Panel>
      </Layout>
    );
  }
}

const ChartWrapper = styled(Flex)`
  height: calc(100vh - 220px);
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

export default inject('app')(Graphs);
