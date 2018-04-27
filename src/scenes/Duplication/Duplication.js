// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';
import CodeIssue from 'components/CodeIssue';
import Spin from 'components/Spin';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import DuplicationStore from './DuplicationStore';

type Props = {
  /** Ui store for responsivity */
  ui: UiStore,
  /** App store for global application state */
  app: AppStore,
};

/**
 * Toplevel scene that shows the user all of the issues related to
 * duplications in their files. Note that this does not necessarily
 * mean that all the issues are about duplicated code. Note that ideally
 * the `<ErrorList />` component would be refactored and used here.
 */
@observer
class Duplication extends React.Component<Props> {
  store: DuplicationStore;

  constructor(props: Props) {
    super(props);
    this.store = new DuplicationStore(props.app);
  }

  /** Get the duplications from the API when the component mounts */
  componentDidMount() {
    this.store.getDuplications();
  }

  /**
   * Render all of the buttons in the header of the page
   * @returns {React.Node} The rendered buttons
   */
  renderHeaderActions = () => {
    return (
      !this.store.loading && (
        <Flex>
          <Tooltip placement="bottom" title="Refresh">
            <Button
              primary
              onClick={this.store.refresh}
              icon="reload"
              action="clicked refresh"
              label="Duplication"
            />
          </Tooltip>
        </Flex>
      )
    );
  };

  /**
   * Render issues into a list of CodeIssue components
   * @param {Array} issues The array of issues
   * @param {String} type Whether the issues are DRY issues are duplications
   */
  renderIssues = (issues: Array<Object>, type: 'issues' | 'duplications') => {
    const { app } = this.props;
    return issues.length > 0 ? (
      issues.map(issue => <StyledError error={issue} shadowed />)
    ) : (
      <Flex auto align="center" justify="center">
        <Title theme={app.theme}>
          {type === 'duplications' ? 'No duplications' : 'No Issues'}
        </Title>
      </Flex>
    );
  };

  /**
   * Render all of the duplications associated with the project.
   */
  renderDuplications = () => {
    const { error } = this.store;
    const { app } = this.props;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return (
      <Flex column>
        <SectionHeader primary={app.primaryColor}>DRY Issues</SectionHeader>
        {this.renderIssues(
          this.store.duplications.filter(error =>
            error.hasOwnProperty('error'),
          ),
        )}
        <SectionHeader primary={app.primaryColor}>Duplications</SectionHeader>
        {this.renderIssues(
          this.store.duplications.filter(error =>
            error.hasOwnProperty('duplications'),
          ),
        )}
      </Flex>
    );
  };

  render() {
    const { ui } = this.props;
    const Wrapper = ui.isDesktop ? Panel : Duplications;
    return (
      <Layout actions={this.renderHeaderActions()}>
        <Wrapper column>
          {this.store.loading ? (
            <LoadingContainer auto justify="center">
              <Spin />
            </LoadingContainer>
          ) : (
            this.renderDuplications()
          )}
        </Wrapper>
      </Layout>
    );
  }
}

const SectionHeader = styled.h3`
  color: ${({ primary }) => primary};
`;

const Duplications = styled(Flex)`
  padding: 30px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colorSecondary};
  text-transform: uppercase;
`;

const StyledError = styled(CodeIssue)`
  align-self: stretch;
  margin: 10px 0;
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

export default inject('app', 'ui')(Duplication);
