// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Collapse, Radio, Icon, Tag } from 'antd';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import Panel from 'components/Panel';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import CodeIssue from 'components/CodeIssue';
import Spin from 'components/Spin';
import AppStore from 'stores/AppStore';
import UiStore from 'stores/UiStore';
import ChecklistStore from '../../ChecklistStore';
import ByFileTreemap from './components/ByFileTreemap';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CollapsePanel = Collapse.Panel;

type Props = {
  app: AppStore,
  ui: UiStore,
  store: ChecklistStore,
};

@observer
class ByFile extends React.Component<Props> {
  componentDidMount() {
    const { store } = this.props;
    store.getIssuesByFileIfNotCached();
  }

  renderLoading = () => {
    return (
      <LoadingContainer auto justify="center">
        <Spin />
      </LoadingContainer>
    );
  };

  renderCollapse = (data: Object) => {
    const { store } = this.props;
    if (store.isEmptyObject(data.directories)) {
      const allIssues = store.getAllIssues(data.files);
      return allIssues.length > 0 ? (
        <Flex auto column>
          {allIssues.map(issue => {
            return <StyledCodeIssue error={issue} type="error" />;
          })}
        </Flex>
      ) : (
        <Flex>
          <CheckIcon type="check-circle-o" />No issues!
        </Flex>
      );
    }
    return (
      <StyledCollapse>
        {Object.keys(data.directories).map((dir, i) => {
          const numIssues = data.directories[dir].numIssues;
          return (
            <CollapsePanel
              header={
                <span>
                  {dir}
                  <HeaderTag color={numIssues > 0 ? 'red' : 'green'}>
                    {numIssues} {numIssues === 1 ? 'error' : 'errors'}
                  </HeaderTag>{' '}
                </span>
              }
              key={i}
            >
              {this.renderCollapse(data.directories[dir])}
            </CollapsePanel>
          );
        })}
      </StyledCollapse>
    );
  };

  renderDirectories = () => {
    const { store } = this.props;
    if (!store.processedIssuesByFile) return null;
    return <Flex auto>{this.renderCollapse(store.processedIssuesByFile)}</Flex>;
  };

  renderHeaderActions = () => {
    const { ui, store } = this.props;
    return (
      !store.fileLoading && (
        <Flex>
          <Button
            primary
            onClick={store.getIssuesByFile}
            icon="reload"
            action="clicked refresh"
            label="Overview"
          >
            {ui.isDesktop && `Refresh`}
          </Button>
        </Flex>
      )
    );
  };

  renderBarChart = () => {
    const { store, app } = this.props;
    if (!store.byFileData) return null;
    return (
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={store.byFileGraphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            name="Number of Issues"
            dataKey="numIssues"
            fill={app.primaryColor}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  handleGraphTypeChange = (e: Event) => {
    const { store } = this.props;
    store.changeByFileGraphType(e.target.value);
  };

  render() {
    const { store, app } = this.props;
    console.log(store.processedIssuesByFile);
    return store.fileLoading ? (
      this.renderLoading()
    ) : (
      <Flex auto column>
        {store.fileError ? (
          <Panel>
            <ErrorMessage
              title={store.fileError.title}
              message={store.fileError.message}
            />
          </Panel>
        ) : (
          <GraphPanel column>
            {store.byFileGraphType === 'treemap' ? (
              <ByFileTreemap
                data={store.byFileTreemapData.children}
                canExpand={store.canExpandTree}
                onExpand={store.changeTreeRoot}
              />
            ) : (
              this.renderBarChart()
            )}
            <Controls align="center" primaryColor={app.primaryColor}>
              <RadioGroup
                onChange={this.handleGraphTypeChange}
                defaultValue={store.byFileGraphType}
              >
                <StyledRadioButton value="treemap">Treemap</StyledRadioButton>
                <StyledRadioButton value="barchart">
                  Bar Chart
                </StyledRadioButton>
              </RadioGroup>
              {/* <VerticalBar /> */}
              <Flex auto />
              {store.byFileGraphType === 'treemap' && (
                <div>
                  <ControlButton flat onClick={store.zoomOut}>
                    Zoom Out
                  </ControlButton>
                  <ControlButton flat onClick={store.resetTreemap}>
                    Reset
                  </ControlButton>
                </div>
              )}
            </Controls>
          </GraphPanel>
        )}
        {!store.fileError && (
          <StyledPanel>{this.renderDirectories()}</StyledPanel>
        )}
      </Flex>
    );
  }
}

const graphPanelHeight = 350;

const GraphPanel = styled(Panel)`
  height: ${graphPanelHeight}px;
  min-height: ${graphPanelHeight}px;
  max-height: ${graphPanelHeight}px;
  margin-bottom: 0;
`;

const HeaderTag = styled(Tag)`
  margin-left: 7px;
`;

const VerticalBar = styled.div`
  height: 38px;
  margin: 0 5px;
  border-right: 1px solid lightgray;
`;

const StyledRadioButton = styled(RadioButton)`
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  text-transform: uppercase;
  font-size: 14px;
`;

const ControlButton = styled(Button)`
  margin-right: 5px;
`;

const Controls = styled(Flex)`
  border-radius: 3px;
  margin-top: 10px;
  padding: 8px 0;
  // background: ${({ primaryColor }) => primaryColor};
`;

const StyledPanel = styled(Panel)`
  display: block;
`;

const CheckIcon = styled(Icon)`
  color: green;
  font-size: 15px;
  margin-right: 5px;
`;

const StyledCodeIssue = styled(CodeIssue)`
  margin-bottom: 15px;
`;

const StyledCollapse = styled(Collapse)`
  width: 100%;
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

export default inject('ui', 'app')(ByFile);
