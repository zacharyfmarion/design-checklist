// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Popover, Collapse, Radio, Icon, Tag } from 'antd';
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

// local components
import ByFileTreemap from './components/ByFileTreemap';
import ByFileBarChart from './components/ByFileBarChart';
import ByFilePieChart from './components/ByFilePieChart';
import DirectoryIssuesModal from './components/DirectoryIssuesModal';

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

  renderHelp = () => {
    return (
      <HelpPopoverContent>
        Click on a region of the graph to expand it. If the directory has no
        child directories a modal will be opened containing the errors
        corresponding to the files in the directory that was selected.
      </HelpPopoverContent>
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

  renderChart = () => {
    const { store } = this.props;
    if (!store.byFileData) return null;
    switch (store.byFileGraphType) {
      case 'treemap':
        return (
          <ByFileTreemap
            data={store.byFileTreemapData}
            canExpand={store.canExpandTree}
            onExpand={store.changeTreeRoot}
          />
        );
      case 'barchart':
        return (
          <ByFileBarChart
            data={store.byFileGraphData}
            canExpand={store.canExpandTree}
            onExpand={store.changeTreeRoot}
          />
        );
      case 'piechart':
        return (
          <ByFilePieChart
            data={store.byFileGraphData}
            canExpand={store.canExpandTree}
            onExpand={store.changeTreeRoot}
          />
        );
      default:
        return null;
    }
  };

  handleGraphTypeChange = (e: Event) => {
    const { store } = this.props;
    store.changeByFileGraphType(e.target.value);
  };

  render() {
    const { store, ui, app } = this.props;
    return store.fileLoading ? (
      this.renderLoading()
    ) : (
      <Flex auto column>
        {store.issuesModalOpen && (
          <DirectoryIssuesModal
            file={store.issuesModalFile}
            issues={store.modalIssues}
            onClose={store.closeIssuesModal}
          />
        )}
        {store.fileError ? (
          <Panel>
            <ErrorMessage
              title={store.fileError.title}
              message={store.fileError.message}
            />
          </Panel>
        ) : (
          <GraphPanel fluid={ui.isMobile} column>
            {this.renderChart()}
            <Controls
              align="center"
              column={ui.isMobile}
              justify="space-between"
              primaryColor={app.primaryColor}
            >
              <StyledRadioGroup
                onChange={this.handleGraphTypeChange}
                defaultValue={store.byFileGraphType}
                primaryColor={app.primaryColor}
                isMobile={ui.isMobile}
              >
                <StyledRadioButton value="treemap">Treemap</StyledRadioButton>
                <StyledRadioButton value="barchart">
                  Bar Chart
                </StyledRadioButton>
                <StyledRadioButton value="piechart">
                  Pie Chart
                </StyledRadioButton>
              </StyledRadioGroup>
              <div>
                <HelpPopover
                  title="Help"
                  content={this.renderHelp()}
                  trigger="click"
                  placement="top"
                >
                  <ControlButton flat>Help?</ControlButton>
                </HelpPopover>
                <ControlButton flat onClick={store.zoomOut}>
                  Zoom Out
                </ControlButton>
                <ControlButton flat onClick={store.resetTreemap}>
                  Reset
                </ControlButton>
              </div>
            </Controls>
          </GraphPanel>
        )}
        {!store.fileError && (
          <StyledPanel fluid={ui.isMobile}>
            {this.renderDirectories()}
          </StyledPanel>
        )}
      </Flex>
    );
  }
}

const graphPanelHeight = 500;

const GraphPanel = styled(Panel)`
  height: ${graphPanelHeight}px;
  min-height: ${graphPanelHeight}px;
  max-height: ${graphPanelHeight}px;
  ${({ fluid }) =>
    fluid
      ? `
    margin-bottom: 10px;
    border: 1px solid lightslategray;
  `
      : `margin-bottom: 0px`};
`;

const HeaderTag = styled(Tag)`
  margin-left: 7px;
`;

const StyledRadioGroup = styled(RadioGroup)`
  ${({ primaryColor, isMobile }) => `
    ${isMobile && `margin-bottom: 10px;`}
    .ant-radio-button-wrapper:hover, .ant-radio-button-wrapper-focused {
      color: ${primaryColor};
    }
    .ant-radio-button-wrapper-checked {
      border-color: ${primaryColor};
      color: ${primaryColor};
      box-shadow: -1px 0 0 0 ${primaryColor};
    }
    .ant-radio-button-wrapper-checked:first-child {
      border-color: ${primaryColor};
    }
  `};
`;

const HelpPopoverContent = styled.div`
  max-width: 250px;
`;

const HelpPopover = styled(Popover)``;

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
