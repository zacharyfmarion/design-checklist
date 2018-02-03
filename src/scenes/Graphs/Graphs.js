import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { shadow } from 'constants/styles';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

class Graphs extends React.Component<{}> {
  render() {
    return (
      <Layout>
        <Container auto>
          <ResponsiveContainer>
            <StyledLineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              <Line type="monotone" dataKey="amt" stroke="#000" />
            </StyledLineChart>
          </ResponsiveContainer>
        </Container>
      </Layout>
    );
  }
}

const StyledLineChart = styled(LineChart)`
  .recharts-line > path {
    stroke-width: 2;
  }
`;

const Container = styled(Flex)`
  margin: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 2px;
  box-shadow: ${shadow}; 
`;

export default Graphs;
