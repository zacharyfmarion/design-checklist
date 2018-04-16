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
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import GoogleAnalytics from 'helpers/analytics';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import { Flex } from 'reflexbox';
import { shadow } from 'constants/styles';
import { categories } from 'constants/general';
import ErrorList from 'components/ErrorList';
import Spin from 'components/Spin';

// local components
import PercentageCard from './components/PercentageCard';

// local store
import ChecklistStore from '../../ChecklistStore';

type Props = {
  ui: UiStore,
  app: AppStore,
  store: ChecklistStore,
};

@observer
class ByCategory extends React.Component<Props> {
  componentWillMount() {
    const { store } = this.props;
    store.getIssuesByCategoryIfNotCached();
  }

  renderLoading = () => {
    return (
      <LoadingWrapper auto justify="center" align="center">
        <Spin />
      </LoadingWrapper>
    );
  };

  changeCategory = key => {
    const { store } = this.props;
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'clicked cateogory',
      label: key,
    });
    store.changeCategory(key);
  };

  renderErrors = () => {
    const { ui, store } = this.props;
    return (
      <Container auto column>
        <PercentageRow column={!ui.isDesktop} isDesktop={ui.isDesktop}>
          {store.byCategoryData &&
            categories.map((key, i) => {
              const handleCategoryChange = () => this.changeCategory(key);
              const percent = Math.round(store.byCategoryData.percentage[key]);
              return (
                <PercentageCard
                  percent={percent}
                  category={key}
                  numIssues={store.numCategoryIssues[key]}
                  active={store.activeCategory === key}
                  onClick={handleCategoryChange}
                  key={i}
                />
              );
            })}
        </PercentageRow>
        {store.byCategoryData && (
          <StyledErrorList
            category={store.activeCategory}
            active={store.activeCategory}
            errors={store.activeCategoryIssues}
          />
        )}
      </Container>
    );
  };

  render() {
    const { store } = this.props;
    return store.categoryLoading ? this.renderLoading() : this.renderErrors();
  }
}

const Container = styled(Flex)`
  margin: 10px 20px;
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

const StyledErrorList = styled(ErrorList)`
  margin: 8px;
`;

export default inject('ui', 'app')(withRouter(observer(ByCategory)));
