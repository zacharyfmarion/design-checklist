// @flow
import * as React from 'react';
import { Tag, Icon } from 'antd';
import styled from 'styled-components';
import GoogleAnalytics from 'helpers/analytics';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import CodeIssue from 'components/CodeIssue';
import { Collapse, Panel } from 'components/Collapse';

type Props = {
  /**
   * A list of errors that can either by an `Object` or an `Array`. If it is an
   * object then the keys are the category, and if it an Array then there are
   * no categories. Either way the format of each individual error is the same
   */
  errors: Object | Array<Object>,
  /**
   * Category that is currently active. Note that this is tightly coupled with
   * the `<ByCategory />` view and needs to be refactored
   */
  category: string,
};

type State = {
  activeColumns: Array<string>,
};

/**
 * A component for rendering a list of errors, most notably used in `<ByCategory />`.
 * Note that currently the data format is tightly coupled with the API response
 * format, which is not really ideal for a supposedly reusable component
 */
@observer
class ErrorList extends React.Component<Props, State> {
  state = {
    activeColumns: [],
  };

  renderSubcategories = (subcategory: string, i: number) => {
    const { errors, category } = this.props;
    const subErrors = errors[subcategory].detail;
    if (category === 'Flexibility' && subcategory === 'No duplicated code') {
      return null;
    }
    return (
      <Panel
        header={
          <span>
            {errors[subcategory]['category description']}
            <HeaderTag color={subErrors.length > 0 ? 'red' : 'green'}>
              {subErrors.length} {subErrors.length === 1 ? 'issue' : 'issues'}
            </HeaderTag>
          </span>
        }
        key={`${category}_${i}`}
      >
        {subErrors.length > 0 ? (
          subErrors.map((error, j) => (
            <StyledError error={error} type="error" key={j} />
          ))
        ) : (
          <Flex>
            <CheckIcon type="check-circle-o" />All done!
          </Flex>
        )}
      </Panel>
    );
  };

  renderCategory = () => {
    const { errors, category } = this.props;
    const categoryErrors = errors;
    return (
      <Panel
        header={
          <div>
            <span>All Issues</span>
            <HeaderTag color={categoryErrors.length > 0 ? 'red' : 'green'}>
              {categoryErrors.length}{' '}
              {categoryErrors.length === 1 ? 'issue' : 'issues'}
            </HeaderTag>
          </div>
        }
        key={`${category}_0`}
      >
        {categoryErrors.length > 0 ? (
          categoryErrors.map((error, i) => (
            <StyledError error={error} type="error" key={i} />
          ))
        ) : (
          <Flex>
            <CheckIcon type="check-circle-o" />All done!
          </Flex>
        )}
      </Panel>
    );
  };

  handleCollapseChange = (activeColumns: Array<string>) => {
    const { category, errors } = this.props;
    const noSubcategories = errors instanceof Array;
    const columnsClicked = activeColumns.filter(
      col => !this.state.activeColumns.includes(col),
    );
    if (columnsClicked.length > 0) {
      const col = columnsClicked[0];
      const subcategoryIndex = parseInt(col.slice(-1), 10);
      const subcategory = Object.keys(errors)[subcategoryIndex];
      const label = noSubcategories ? category : `${category} - ${subcategory}`;
      GoogleAnalytics.event({
        category: 'Interaction',
        action: 'Subcategory expanded',
        label,
      });
    }
    this.setState({ activeColumns });
  };

  render() {
    const { errors, app } = this.props;
    const noSubcategories = errors instanceof Array;
    return (
      <Flex column>
        <StyledCollapse
          defaultActiveKey={[]}
          onChange={this.handleCollapseChange}
          shadow={app.theme.shadow}
        >
          {noSubcategories
            ? this.renderCategory()
            : Object.keys(errors).map(this.renderSubcategories)}
        </StyledCollapse>
      </Flex>
    );
  }
}

const CheckIcon = styled(Icon)`
  color: green;
  font-size: 15px;
  margin-right: 5px;
`;

const HeaderTag = styled(Tag)`
  margin-left: 7px;
`;

const StyledCollapse = styled(Collapse)`
  box-shadow: ${({ shadow }) => shadow} !important;
  margin: 0 10px;
`;

const StyledError = styled(CodeIssue)`
  margin-bottom: 5px;
`;

export default inject('app')(ErrorList);
