import * as React from 'react';
import { Collapse, Tag, Icon } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import Rule from '../Rule';
import { shadow } from 'constants/styles';
const Panel = Collapse.Panel;

type Props = {
  rules: Object,
  active: string,
  category: string
};

class RulesList extends React.Component<Props> {
  renderSubcategories = (subcategory: string, i: number) => {
    const { rules, category } = this.props;
    const errors = rules[category][subcategory].detail;
    if (category === 'Flexibility' && subcategory === 'No duplicated code') {
      return null;
    }
    return (
      <Panel
        header={
          <span>
            {rules[category][subcategory]['category description']}
            <HeaderTag color={errors.length > 0 ? 'red' : 'green'}>
              {errors.length} {errors.length === 1 ? 'error' : 'errors'}
            </HeaderTag>
          </span>
        }
        key={`${category}_${i}`}
      >
        {errors.length > 0
          ? errors.map((rule, j) =>
              <StyledRule rule={rule} type="error" key={j} />
            )
          : <Flex>
              <CheckIcon type="check-circle-o" />All done!
            </Flex>}
      </Panel>
    );
  };

  renderCategory = () => {
    const { rules, category } = this.props;
    const errors = rules[category];
    return (
      <Panel
        header={
          <div>
            <span>All Errors</span>
            <HeaderTag color={errors.length > 0 ? 'red' : 'green'}>
              {errors.length} {errors.length === 1 ? 'error' : 'errors'}
            </HeaderTag>
          </div>
        }
        key={`${category}_0`}
      >
        {errors.length > 0
          ? errors.map((rule, i) =>
              <StyledRule rule={rule} type="error" key={i} />
            )
          : <Flex>
              <CheckIcon type="check-circle-o" />All done!
            </Flex>}
      </Panel>
    );
  };

  render() {
    const { category, active, rules } = this.props;
    const noSubcategories = rules[category] instanceof Array;
    const keys = noSubcategories
      ? `${category}_0`
      : Object.keys(rules[category])
          .map((subcategory, i) => ({ subcategory, value: `${category}_${i}` }))
          .filter(
            (obj, i) => rules[category][obj.subcategory].detail.length > 0
          )
          .map((obj, i) => obj.value);
    return (
      <ListContainer column active={active} category={category}>
        <StyledCollapse defaultActiveKey={keys}>
          {noSubcategories
            ? this.renderCategory()
            : Object.keys(rules[category]).map(this.renderSubcategories)}
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

const ListContainer = styled(Flex)`
  ${({ active, category }) => active !== category && `display: none;`}
`;

const StyledRule = styled(Rule)`
  margin-bottom: 5px;
`;

export default RulesList;
