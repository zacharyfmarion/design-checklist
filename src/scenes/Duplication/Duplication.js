import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import Button from 'components/Button';
import CodeError from 'components/CodeError';
import Spin from 'components/Spin';
import DuplicationStore from './DuplicationStore';

type Props = {};

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
      !this.store.loading &&
      <Flex>
        <Button primary onClick={this.store.refresh} icon="reload">
          {ui.isDesktop && `Refresh`}
        </Button>
      </Flex>
    );
  };

  renderDuplications = () => {
    return this.store.duplications.length > 0
      ? this.store.duplications.map(error => <StyledError error={error} />)
      : <Flex auto align="center" justify="center">
          <Title>No duplications</Title>
        </Flex>;
  };

  render() {
    return (
      <Layout actions={this.renderHeaderActions()}>
        <Panel align="center" column>
          {this.store.loading
            ? <LoadingContainer flex>
                <Spin />
              </LoadingContainer>
            : this.renderDuplications()}
        </Panel>
      </Layout>
    );
  }
}

const Title = styled.h1`
  color: gray;
  text-transform: uppercase;
`;

const StyledError = styled(CodeError)`
  align-self: stretch;
  margin: 10px 0;
`;

const LoadingContainer = styled(Flex)`
  margin-top: 30px;
`;

export default inject('app', 'ui')(Duplication);
