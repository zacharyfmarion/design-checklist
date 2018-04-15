// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
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
  ui: UiStore,
  app: AppStore,
};

@observer
class Duplication extends React.Component<Props> {
  store: DuplicationStore;

  constructor(props: Props) {
    super(props);
    this.store = new DuplicationStore(props.app);
  }

  componentDidMount() {
    this.store.getDuplications();
  }

  renderHeaderActions = () => {
    const { ui } = this.props;
    return (
      !this.store.loading && (
        <Flex>
          <Button
            primary
            onClick={this.store.refresh}
            icon="reload"
            action="clicked refresh"
            label="Duplication"
          >
            {ui.isDesktop && `Refresh`}
          </Button>
        </Flex>
      )
    );
  };

  renderDuplications = () => {
    const { error } = this.store;
    if (error) {
      return <ErrorMessage title={error.title} message={error.message} />;
    }
    return this.store.duplications.length > 0 ? (
      this.store.duplications.map(error => (
        <StyledError error={error} shadowed />
      ))
    ) : (
      <Flex auto align="center" justify="center">
        <Title>No duplications</Title>
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

const Duplications = styled(Flex)`
  padding: 30px;
`;

const Title = styled.h1`
  color: gray;
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
