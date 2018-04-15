// @flow

/**
 * <Checklist /> contains the code for the first application scene. The user is
 * first presented with the <WelcomePage /> component and once they enter a
 * projectName they go the actual checklist which displays offending errors in
 * their code in an attractive and readable format. Note that in the future the
 * <WelcomePage /> component should proabably just become it's own scene and this
 * would make more sense.
 */

import * as React from 'react';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import GoogleAnalytics from 'helpers/analytics';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import { Flex } from 'reflexbox';
import { shadow } from 'constants/styles';
import { categories } from 'constants/general';
import Button from 'components/Button';
import ErrorList from 'components/ErrorList';
import Spin from 'components/Spin';

// local components
import ChecklistStore from './ChecklistStore';
import FilterMenu from './components/FilterMenu';
import PercentageCard from './components/PercentageCard';

type Props = {
  ui: UiStore,
  app: AppStore,
};

@observer
class Checklist extends React.Component<Props> {
  store: ChecklistStore;

  constructor(props: Props) {
    super(props);
    this.store = new ChecklistStore(this.props.app);
  }

  componentWillMount() {
    this.store.getRulesIfNotCached();
  }

  renderLoading = () => {
    return (
      <LoadingWrapper justify="center" align="center">
        <Spin />
      </LoadingWrapper>
    );
  };

  renderHeaderActions = () => {
    const { ui } = this.props;
    return (
      !this.store.loading && (
        <Flex>
          <StyledFilterMenu />
          <Button
            primary
            onClick={this.store.refreshProject}
            icon="reload"
            action="clicked refresh"
            label="Checklist"
          >
            {ui.isDesktop && `Refresh`}
          </Button>
        </Flex>
      )
    );
  };

  changeCategory = key => {
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'clicked cateogory',
      label: key,
    });
    this.store.changeCategory(key);
  };

  renderErrors = () => {
    const { ui } = this.props;
    return (
      <div>
        <PercentageRow column={!ui.isDesktop} isDesktop={ui.isDesktop}>
          {this.store.data &&
            categories.map((key, i) => {
              const handleCategoryChange = () => this.changeCategory(key);
              const percent = Math.round(this.store.data.percentage[key]);
              return (
                <PercentageCard
                  percent={percent}
                  category={key}
                  numIssues={this.store.numCategoryIssues[key]}
                  active={this.store.activeCategory === key}
                  onClick={handleCategoryChange}
                  key={i}
                />
              );
            })}
        </PercentageRow>
        {this.store.data && (
          <StyledErrorList
            category={this.store.activeCategory}
            active={this.store.activeCategory}
            errors={this.store.activeCategoryIssues}
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <PaddedLayout actions={this.renderHeaderActions()}>
        {this.store.loading ? this.renderLoading() : this.renderErrors()}
      </PaddedLayout>
    );
  }
}

const StyledFilterMenu = styled(FilterMenu)`
  margin-right: 8px;
`;

const PercentageRow = styled(Flex)`
  margin-bottom: 25px;
  ${({ isDesktop }) =>
    !isDesktop &&
    `
    background: #fff;
    border-radius: 5px;
    box-shadow: ${shadow};
    margin: 0 10px 20px 10px;
    padding: 8px 0;
  `};
`;

const LoadingWrapper = styled(Flex)`
  height: 150px;
`;

const PaddedLayout = styled(Layout)`
  padding: 20px;
  justify-content: start;
  flex-direction: column;
`;

const StyledErrorList = styled(ErrorList)`
  margin: 8px;
`;

export default inject('ui', 'app')(withRouter(observer(Checklist)));
