import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
import { Flex } from 'reflexbox';
import { shadow } from 'constants/styles';
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

  render() {
    const { app } = this.props;
    return (
      <Layout>
        <Container column auto>
          <StyledSelect
            defaultValue={this.store.activeMode}
            onChange={this.handleModeChange}
            style={{ width: 220 }}
          >
            {this.store.modes.map(mode =>
              <Option value={mode.value}>
                {mode.title}
              </Option>
            )}
          </StyledSelect>
          {this.store.commits &&
            <ResponsiveContainer>
              <StyledBarChart width={600} height={300} data={this.store.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey={this.store.activeMode} fill={app.primaryColor} />
              </StyledBarChart>
            </ResponsiveContainer>}
        </Container>
      </Layout>
    );
  }
}

const StyledSelect = styled(Select)`
  margin-bottom: 15px;
  margin-left: 30px;
`;

const StyledBarChart = styled(BarChart)`
`;

const Container = styled(Flex)`
  margin: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 2px;
  box-shadow: ${shadow}; 
`;

export default inject('app')(Graphs);
