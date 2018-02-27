import * as React from 'react';
import { Collapse, Tag, Icon } from 'antd';
import styled from 'styled-components';
import GoogleAnalytics from 'helpers/analytics';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import CodeError from 'components/CodeError';
import { severities } from 'constants/general';
import { shadow } from 'constants/styles';
const Panel = Collapse.Panel;

type Props = {
  errors: Object,
  category: string
};

@observer
class ErrorList extends React.Component<Props> {
  state = {
    activeColumns: []
  };

  sortErrors = (a, b) => {
    return severities.indexOf(a.severity) - severities.indexOf(b.severity);
  };

  filterErrors = error => {
    const { app } = this.props;
    const activeSeverities = Object.keys(app.filters).filter(
      severity => app.filters[severity]
    );
    return activeSeverities.includes(error.severity);
  };

  renderSubcategories = (subcategory: string, i: number) => {
    const { errors, category } = this.props;
    const subErrors = errors[category][subcategory].detail
      .sort(this.sortErrors)
      .filter(this.filterErrors);
    if (category === 'Flexibility' && subcategory === 'No duplicated code') {
      return null;
    }
    return (
      <Panel
        header={
          <span>
            {errors[category][subcategory]['category description']}
            <HeaderTag color={subErrors.length > 0 ? 'red' : 'green'}>
              {subErrors.length} {subErrors.length === 1 ? 'error' : 'errors'}
            </HeaderTag>
          </span>
        }
        key={`${category}_${i}`}
      >
        {subErrors.length > 0
          ? subErrors.map((error, j) =>
              <StyledError error={error} type="error" key={j} />
            )
          : <Flex>
              <CheckIcon type="check-circle-o" />All done!
            </Flex>}
      </Panel>
    );
  };

  renderCategory = () => {
    const { errors, category } = this.props;
    const categoryErrors = errors[category]
      .sort(this.sortErrors)
      .filter(this.filterErrors);
    return (
      <Panel
        header={
          <div>
            <span>All Issues</span>
            <HeaderTag color={categoryErrors.length > 0 ? 'red' : 'green'}>
              {categoryErrors.length}{' '}
              {categoryErrors.length === 1 ? 'error' : 'errors'}
            </HeaderTag>
          </div>
        }
        key={`${category}_0`}
      >
        {categoryErrors.length > 0
          ? categoryErrors.map((error, i) =>
              <StyledError error={error} type="error" key={i} />
            )
          : <Flex>
              <CheckIcon type="check-circle-o" />All done!
            </Flex>}
      </Panel>
    );
  };

  handleCollapseChange = (activeColumns: Array<string>) => {
    const { category, errors } = this.props;
    const noSubcategories = errors[category] instanceof Array;
    const columnsClicked = activeColumns.filter(
      col => !this.state.activeColumns.includes(col)
    );
    if (columnsClicked.length > 0) {
      const col = columnsClicked[0];
      const subcategoryIndex = parseInt(col.slice(-1), 10);
      const subcategory = Object.keys(errors[category])[subcategoryIndex];
      const label = noSubcategories ? category : `${category} - ${subcategory}`;
      GoogleAnalytics.event({
        category: 'Interaction',
        action: 'Subcategory expanded',
        label
      });
    }
    this.setState({ activeColumns });
  };

  render() {
    const { category, errors } = this.props;
    const noSubcategories = errors[category] instanceof Array;
    return (
      <ListContainer column category={category}>
        <StyledCollapse
          defaultActiveKey={[]}
          onChange={this.handleCollapseChange}
        >
          {noSubcategories
            ? this.renderCategory()
            : Object.keys(errors[category]).map(this.renderSubcategories)}
        </StyledCollapse>
      </ListContainer>
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
  box-shadow: ${shadow} !important;
  margin: 0 10px;
`;

const ListContainer = styled(Flex)``;

const StyledError = styled(CodeError)`
  margin-bottom: 5px;
`;

export default inject('app')(ErrorList);
