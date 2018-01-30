import * as React from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import Rule from '../Rule';
const Panel = Collapse.Panel;

const RulesList = ({ rules, className }) => {
  return (
    <StyledCollapse defaultActiveKey={['0', '1', '2']} className={className}>
      {Object.keys(rules).map((key, i) => {
        const categoryRules = rules[key];
        return (
          <Panel
            header={`${key} (${categoryRules.length} errors)`}
            key={`${i}`}
            disabled={categoryRules.length === 0}
          >
            {categoryRules.map((rule, j) => {
              return <StyledRule rule={rule} type="error" key={[i, j]} />;
            })}
          </Panel>
        );
      })}
    </StyledCollapse>
  );
};

const StyledCollapse = styled(Collapse)`
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07) !important;
`;

const StyledRule = styled(Rule)`
  margin-bottom: 5px;
`;

export default RulesList;
