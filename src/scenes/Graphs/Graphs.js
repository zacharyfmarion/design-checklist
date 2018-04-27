// @flow
import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Tooltip } from 'antd';
import { Flex } from 'reflexbox';
import Spin from 'components/Spin';
import Panel from 'components/Panel';
import Text from 'components/Text';
import Switch from 'components/Switch';
import Button from 'components/Button';
import { RadioGroup, RadioButton } from 'components/Radio';
import ErrorMessage from 'components/ErrorMessage';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  ReferenceLine,
  Tooltip as ChartTooltip,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { shadeColor } from 'helpers/colors';
import AppStore from 'stores/AppStore';
import UiStore from 'stores/UiStore';
import GraphsStore from './GraphsStore';

type Props = {
  /** App store for global application state */
  app: AppStore,
  /** Ui store for responsivity */
  ui: UiStore,
};

/**
 * Toplevel scene to render a series of graphs related to the user's code.
 * Note that in the future this page might be broken up into separate
 * pages that each focus on a certain aspect of the code.
 */
@observer
class Graphs extends React.Component<Props> {
  store: GraphsStore;

  constructor(props: Props) {
    super(props);
    this.store = new GraphsStore(props.app);
  }

  /** Get the data from the server if it is not cached */
  componentDidMount() {
    this.store.getDataIfNotCached();
  }

  /**
   * Remove the "date" key from the API response object so just
   * the authors are left
   */
  getAuthors = (entry: Object) => {
    const copy = { ...entry };
    delete copy.date;
    return Object.keys(copy);
  };

  /**
   * Render a chart of normalized statistics about the user's code
   */
  renderNormalizedChart = () => {
    const { app } = this.props;
    const formatter = (value, name, props) => value.toString() + '%';
    return (
      <StyledBarChart
        width={600}
        height={400}
        data={this.store.normalizedData}
        theme={app.theme}
        themeName={app.themeName}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip formatter={formatter} />
        <Legend />
        <Bar
          name="Average lines changed per commit"
          dataKey="average"
          stackId="a"
          fill={app.primaryColor}
        />
        <Bar
          name="Number of commits"
          dataKey="commits"
          stackId="a"
          fill={shadeColor(app.primaryColor, 0.25)}
        />
      </StyledBarChart>
    );
  };

  /**
   * Render a stacked area chart where the x axis is the date where each
   * commit was made.
   */
  renderStatsByDateChart = () => {
    const { app } = this.props;
    const authors = this.getAuthors(this.store.processedDataByLines[0]);
    const weekends = this.store.processedDataByLines
      .map(entry => entry.date)
      .filter(date => {
        const day = new Date(date).getDay();
        return day === 6 || day === 1;
      });
    return (
      <StyledAreaChart
        width={600}
        height={400}
        theme={app.theme}
        themeName={app.themeName}
        data={this.store.processedDataByLines}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        {this.store.showWeekends &&
          weekends.map(date => {
            return <ReferenceLine x={date} stroke="red" />;
          })}
        <ChartTooltip />
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

  /**
   * Render all of the graphs for the page. This is broken out into a separate
   * method so that the render method does not get too cluttered
   */
  renderGraphs = () => {
    const { app, ui } = this.props;
    const { error } = this.store;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return (
      this.store.dataByCommits && (
        <Flex column align="center">
          <ChartBounds column justify="center" align="center" height={700}>
            <ChartTitle color={app.primaryColor} theme={app.theme}>
              Group Statistics by Date
            </ChartTitle>
            <ToolsContainer
              column={ui.isMobile}
              align="center"
              justify={ui.isMobile ? 'center' : 'space-between'}
            >
              <RadioGroup
                onChange={this.store.changeActiveStatistic}
                value={this.store.activeStatistic}
                primaryColor={app.primaryColor}
              >
                {this.store.statistics.map(stat => (
                  <RadioButton key={stat} value={stat}>
                    {stat}
                  </RadioButton>
                ))}
              </RadioGroup>
              <Flex>
                <SwitchLabel>Show Weekends</SwitchLabel>
                <Switch
                  checked={this.store.showWeekends}
                  onChange={this.store.toggleWeekends}
                />
              </Flex>
            </ToolsContainer>
            <ResponsiveContainer>
              {this.renderStatsByDateChart()}
            </ResponsiveContainer>
          </ChartBounds>
          <HorizontalLine />
          <ChartBounds column justify="center" align="center">
            <ChartTitle color={app.primaryColor} theme={app.theme}>
              Normalized Statistics
            </ChartTitle>
            <ResponsiveContainer>
              {this.renderNormalizedChart()}
            </ResponsiveContainer>
          </ChartBounds>
        </Flex>
      )
    );
  };

  /** Render the header buttons for the page */
  renderHeaderActions = () => {
    return (
      <Tooltip placement="bottom" title="Refresh">
        <Button
          primary
          onClick={this.store.getData}
          icon="reload"
          action="clicked refresh"
          label="Graphs"
        />
      </Tooltip>
    );
  };

  render() {
    return (
      <Layout actions={this.renderHeaderActions()}>
        <Panel column auto>
          {this.store.loading ? (
            <LoadingContainer auto justify="center">
              <Spin />
            </LoadingContainer>
          ) : (
            this.renderGraphs()
          )}
        </Panel>
      </Layout>
    );
  }
}

const SwitchLabel = styled(Text)`
  margin-right: 5px;
`;

const ToolsContainer = styled(Flex)`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledBarChart = styled(BarChart)`
  background: ${({ theme, themeName }) =>
    themeName === 'light' ? `#ececec` : theme.backgroundSecondary};
`;

const StyledAreaChart = styled(AreaChart)`
  background: ${({ theme, themeName }) =>
    themeName === 'light' ? `#ececec` : theme.backgroundSecondary};
`;

const ChartTitle = styled.h2`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.color};
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

export default inject('app', 'ui')(Graphs);
