// @flow
import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Radio } from 'antd';
import { Flex } from 'reflexbox';
import Spin from 'components/Spin';
import Panel from 'components/Panel';
import ErrorMessage from 'components/ErrorMessage';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { shadeColor } from 'helpers/colors';
import GraphsStore from './GraphsStore';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@observer
class Graphs extends React.Component<{}> {
  constructor(props: Props) {
    super(props);
    this.store = new GraphsStore(props.app);
  }

  componentDidMount() {
    this.store.getData();
  }

  renderCommitChart = () => {
    const { app } = this.props;
    return (
      <StyledBarChart
        width={600}
        height={400}
        data={this.store.processedDataByCommits}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="commits" fill={app.primaryColor} />
      </StyledBarChart>
    );
  };

  // Remove the date key so just the authors are left
  getAuthors = entry => {
    const copy = { ...entry };
    delete copy.date;
    return Object.keys(copy);
  };

  renderStatsOverviewChart = () => {
    const { app } = this.props;
    return (
      <StyledBarChart
        width={600}
        height={400}
        data={this.store.processedDataByLinesOverview}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.store.activeStatistic} fill={app.primaryColor} />
      </StyledBarChart>
    );
  };

  renderStatsByDateChart = () => {
    const { app } = this.props;
    const authors = this.getAuthors(this.store.processedDataByLines[0]);
    return (
      <StyledAreaChart
        width={600}
        height={400}
        data={this.store.processedDataByLines}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {authors.map((author, i) => {
          const color = shadeColor(app.primaryColor, i / authors.length - 0.25);
          return (
            <Area
              key={i}
              type="monotone"
              dataKey={author}
              stackId="1"
              stroke={color}
              fill={color}
            />
          );
        })}
      </StyledAreaChart>
    );
  };

  renderGraph = () => {
    const { app } = this.props;
    const { error } = this.store;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return (
      this.store.dataByCommits && (
        <Flex column align="center">
          <ChartBounds column justify="center" align="center" height={700}>
            <ChartTitle color={app.primaryColor}>
              Group Statistics by Date
            </ChartTitle>
            <StyledRadioGroup
              onChange={this.store.changeActiveStatistic}
              value={this.store.activeStatistic}
            >
              {this.store.statistics.map(stat => (
                <RadioButton key={stat} value={stat}>
                  {stat}
                </RadioButton>
              ))}
            </StyledRadioGroup>
            <ResponsiveContainer>
              {this.renderStatsByDateChart()}
            </ResponsiveContainer>
          </ChartBounds>
          <HorizontalLine />
          <ChartBounds column justify="center" align="center">
            <ChartTitle color={app.primaryColor}>
              Aggregated Group Statistics
            </ChartTitle>
            <StyledRadioGroup
              onChange={this.store.changeActiveStatistic}
              value={this.store.activeStatistic}
            >
              {this.store.statistics.map(stat => (
                <RadioButton key={stat} value={stat}>
                  {stat}
                </RadioButton>
              ))}
            </StyledRadioGroup>
            <ResponsiveContainer>
              {this.renderStatsOverviewChart()}
            </ResponsiveContainer>
          </ChartBounds>
          <HorizontalLine />
          <ChartBounds column justify="center" align="center">
            <ChartTitle color={app.primaryColor}>Number of Commits</ChartTitle>
            <ResponsiveContainer>
              {this.renderCommitChart()}
            </ResponsiveContainer>
          </ChartBounds>
        </Flex>
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

const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 15px;
`;

const StyledBarChart = styled(BarChart)`
  background: #ececec;
`;

const StyledAreaChart = styled(AreaChart)`
  background: #ececec;
`;

const ChartTitle = styled.h2`
  margin-bottom: 15px;
`;

const ChartBounds = styled(Flex)`
  height: ${({ height }) => (height ? `${height}px` : `600px`)};
  width: 100%;
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  margin: 25px 0;
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

export default inject('app')(Graphs);
