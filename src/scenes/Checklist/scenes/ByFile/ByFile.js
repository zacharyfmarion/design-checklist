// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Collapse, Icon } from 'antd';
import { ResponsiveContainer, Treemap } from 'recharts';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import Button from 'components/Button';
import CodeIssue from 'components/CodeIssue';
import Spin from 'components/Spin';
import AppStore from 'stores/AppStore';
import UiStore from 'stores/UiStore';
import ChecklistStore from '../../ChecklistStore';

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

  renderTreemap = () => {
    const { app } = this.props;
    return (
      <ResponsiveContainer>
        <Treemap
          width={400}
          height={200}
          data={[]}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill={app.primaryColor}
        />
      </ResponsiveContainer>
    );
  };

  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  isEmptyObject = (obj: Object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  getAllIssues = (files: Object) => {
    let res = [];
    Object.keys(files).forEach(file => {
      res = [...res, ...files[file]];
    });
    return res;
  };

  renderCollapse = (data: Object) => {
    if (this.isEmptyObject(data.directories)) {
      const allIssues = this.getAllIssues(data.files);
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
          return (
            <CollapsePanel header={dir} key={i}>
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

  render() {
    const { store } = this.props;
    return (
      <Flex auto column>
        <StyledPanel>
          {store.fileLoading ? this.renderLoading() : this.renderDirectories()}
        </StyledPanel>
      </Flex>
    );
  }
}

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
