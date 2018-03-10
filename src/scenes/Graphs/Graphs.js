import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
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
  Legend
} from 'recharts';
import GraphsStore from './GraphsStore';

const Option = Select.Option;

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
      this.store.commits &&
      <ResponsiveContainer>
        <StyledBarChart width={600} height={300} data={this.store.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey={this.store.activeMode} fill={app.primaryColor} />
        </StyledBarChart>
      </ResponsiveContainer>
    );
  };

  render() {
    return (
      <Layout>
        <Panel column auto>
          {this.store.loading
            ? <LoadingContainer auto justify="center">
                <Spin />
              </LoadingContainer>
            : this.renderGraph()}
        </Panel>
      </Layout>
    );
  }
}

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 15px;
  margin-left: 30px;
`;

const StyledBarChart = styled(BarChart)`
`;

export default inject('app')(Graphs);
