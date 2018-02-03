import * as React from 'react';
import { Collapse, Tag, Icon } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import Rule from '../Rule';
import { shadow } from 'constants/styles';
const Panel = Collapse.Panel;

class RulesList extends React.Component<{}> {
  renderSubcategories = (subcategory: string, i: number) => {
    const { rules, active } = this.props;
    const errors = rules[active][subcategory].detail;
    return (
      <Panel
        header={
          <div>
            <span>
              {rules[active][subcategory]['category description']}
            </span>
            <HeaderTag color={errors.length > 0 ? 'red' : 'green'}>
              {errors.length} {errors.length === 1 ? 'error' : 'errors'}
            </HeaderTag>
          </div>
        }
        key={`${active}_${i}`}
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
    const { rules, active } = this.props;
    const errors = rules[active];
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
        key={`${active}_0`}
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
    const { active, rules } = this.props;
    const keys = Object.keys(rules[active]).map((_, i) => `${active}_${i}`);
    return (
      <ListContainer column>
        {rules[active] instanceof Array
          ? <StyledCollapse defaultActiveKey="0">
              {this.renderCategory()}
            </StyledCollapse>
          : <StyledCollapse defaultActiveKey={keys}>
              {Object.keys(rules[active]).map(this.renderSubcategories)}
            </StyledCollapse>}
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
`;

const StyledRule = styled(Rule)`
  margin-bottom: 5px;
`;

export default RulesList;
