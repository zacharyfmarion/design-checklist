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
import FileIssuesModal from './components/FileIssuesModal';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CollapsePanel = Collapse.Panel;

type Props = {
  /** App store for global application state */
  ui: UiStore,
  /** Ui store for responsivity */
  app: AppStore,
  /**
   * Checklist store which handles most of the actions and state of
   * the component. It is passed down from `<Checklist />` (where
   * it is instantiated) so that both `<ByCategory />` and `<ByFile />`
   * have access to the same store.
   */
  store: ChecklistStore,
};

/**
 * Component that displays the issues of a repository organized by the file
 * structure of the repository itself. The top of the page displays a series
 * of graphs visualizing the number of issues for a given package. The bottom
 * displays a nested list of Collapse Panels containing the issues in the
 * files contained in the denoted folder
 */
@observer
class ByFile extends React.Component<Props> {
  componentDidMount() {
    const { store } = this.props;
    store.getIssuesByFileIfNotCached();
  }

  /**
   * Render a loading indicator
   * @return {React.Node} The rendered loading indicator
   */
  renderLoading = () => {
    return (
      <LoadingContainer auto justify="center">
        <Spin />
      </LoadingContainer>
    );
  };

  /**
   * Renders a message intended to help the user understand how the
   * graphs work on the page. This is displayed in a popover when the
   * user clicks the Help button in <Controls /> segement of render()
   * @return {React.Node} The rendered help content
   */
  renderHelp = () => {
    return (
      <HelpPopoverContent>
        Click on a region of the graph to expand it. If the directory has no
        child directories a modal will be opened containing the issues
        corresponding to the files in the directory that was selected.
      </HelpPopoverContent>
    );
  };

  /**
   * Recursive function to render a series of nested <Collapse />
   * components until we reach a folder that doesn't contain any
   * directories. NOTE: This needs to be updated as there are files
   * with issues in directories that also have subdirectories. Right
   * now they are not displayed in this portion (although they are
   * shown in the graphs part)
   * @param {Object} data The directory data currently being traversed.
   * This data is originally derived from store.processedIssuesByFile
   * @return {React.Node} The rendered collapse panels
   */
  renderCollapse = (data: Object) => {
    const { store } = this.props;
    if (store.isEmptyObject(data.directories)) {
      const allIssues = store.flattenIssues(data.files);
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
                    {numIssues} {numIssues === 1 ? 'issue' : 'issues'}
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

  /**
   * Render all the collapse panels for the bottom portion of the page.
   * Calls this.renderCollapse which recursively traverses all of the
   * directories of the project and renders the issues in these folders
   * @returns {?React.Node} The Collapse panels, or null if the data has
   * not been loaded yet
   */
  renderDirectories = () => {
    const { store } = this.props;
    if (!store.processedIssuesByFile) return null;
    return <Flex auto>{this.renderCollapse(store.processedIssuesByFile)}</Flex>;
  };

  /**
   * Render all of the header actions for the <Layout /> component
   * on the page
   * @returns {React.Node} A container of <Buttons />
   */
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

  /**
   * Render the chart that appears in the top of the page. Based on the
   * value of store.byFileGraphType it renders either a treemap, a bar
   * chart or a pie chart
   * @returns {React.Node} A recharts graph
   */
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

  /**
   * Handle when a radio button is changed
   * @param {Event} e The radio button event
   */
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
          <FileIssuesModal
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
