import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { withRouter } from 'react-router';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Button from 'components/Button';
import ChecklistStore from './ChecklistStore';
import FilterMenu from './components/FilterMenu';
import { shadow } from 'constants/styles';
import { shadeColor } from 'helpers/colors';
import AppStore from 'stores/AppStore';

// Importing scenes
import ByCategory from './scenes/ByCategory';
import ByFile from './scenes/ByFile';

type Props = {};

type ModeSelectProps = {
  onClick: Function,
  title: string,
  icon: string,
  app: AppStore,
};

const ModeSelect = inject('app')(
  observer(({ app, path, title, icon }: ModeSelectProps) => {
    return (
      <ModeLink to={path}>
        <Flex auto column justify="center" align="center">
          <ModeIcon type={icon} color={shadeColor(app.primaryColor, 0.5)} />
          <ModeTitle>{title}</ModeTitle>
        </Flex>
      </ModeLink>
    );
  }),
);

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
          <Flex auto>
            <ModeSelect
              path="/checklist/by-category"
              title="Issues by Category"
              icon="appstore-o"
            />
            <ModeSelect
              path="/checklist/by-file"
              title="Issues by File"
              icon="file-text"
            />
          </Flex>
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

const ModeTitle = styled.h1`
  text-transform: uppercase;
  margin-top: 25px;
`;

const ModeIcon = styled(Icon)`
  font-size: 100px;
  color: ${({ color }) => color};
`;

const ModeLink = styled(Link)`
  display: flex;
  flex: 1 1 auto;
  height: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 20px;
  box-shadow: ${shadow};
`;

const HeaderButton = styled(Button)`
  margin-right: 8px;
`;

const StyledFilterMenu = styled(FilterMenu)`
  margin-right: 8px;
`;

export default inject('app', 'ui')(withRouter(Checklist));
