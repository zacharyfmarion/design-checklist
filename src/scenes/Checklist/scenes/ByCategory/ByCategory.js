// @flow

/**
 * <Checklist /> contains the code for the first application scene. The user is
 * first presented with the <WelcomePage /> component and once they enter a
 * projectName they go the actual checklist which displays offending issues in
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
  /** Ui store for responsivity */
  ui: UiStore,
  /** App store for global application state */
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
 * Component that displays the issues of a repository organized into a set
 * of defined categories (such as 'Code Smells'). This component is a good
 * example of the ideal level of component abtraction that should occur in
 * a scene. If it gets too long, components should be split out and passed
 * the data that they need.
 */
@observer
class ByCategory extends React.Component<Props> {
  componentWillMount() {
    const { store } = this.props;
    store.getIssuesByCategoryIfNotCached();
  }

  /** Render a loading indicator */
  renderLoading = () => {
    return (
      <LoadingWrapper auto justify="center" align="center">
        <Spin />
      </LoadingWrapper>
    );
  };

  /**
   * Changes the current category of issues to be rendered. Really just
   * a wrapper for store.changeCategory(), with the additional functionality
   * of saving a google anayltics event. This is a good example of how to
   * handle event creation.
   * @param {String} key The key of the category in the issues object that gets
   * returned by the API
   */
  changeCategory = key => {
    const { store } = this.props;
    GoogleAnalytics.event({
      category: 'Interaction',
      action: 'clicked cateogory',
      label: key,
    });
    store.changeCategory(key);
  };

  /**
   * Function that actually handles the rendering of the content once
   * the page has loaded.
   */
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
