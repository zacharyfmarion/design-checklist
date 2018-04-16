import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Button from 'components/Button';
import ChecklistStore from './ChecklistStore';
import FilterMenu from './components/FilterMenu';

// Importing scenes
import ByCategory from './scenes/ByCategory';
import ByFile from './scenes/ByFile';

@observer
class Checklist extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.store = new ChecklistStore(props.app);
  }

  renderHeaderActions = () => {
    const { history } = this.props;
    const goBack = () => history.push('/checklist');
    return (
      !this.store.loading && (
        <Flex>
          <HeaderButton primary onClick={goBack} icon="rollback" />
          <StyledFilterMenu />
          <Button
            primary
            onClick={this.store.refreshProject}
            icon="reload"
            action="clicked refresh"
            label="Checklist"
          />
        </Flex>
      )
    );
  };

  render() {
    const { match } = this.props;
    return (
      <Layout actions={this.renderHeaderActions()}>
        {match.isExact && (
          <div>
            <Link to="/checklist/by-category">By Category</Link>
            <Link to="/checklist/by-file">By File</Link>
          </div>
        )}
        <Route
          path="/checklist/by-category"
          component={() => <ByCategory store={this.store} />}
        />
        <Route
          path="/checklist/by-file"
          component={() => <ByFile store={this.store} />}
        />
      </Layout>
    );
  }
}

const HeaderButton = styled(Button)`
  margin-right: 8px;
`;

const StyledFilterMenu = styled(FilterMenu)`
  margin-right: 8px;
`;

export default inject('app', 'ui')(withRouter(Checklist));
