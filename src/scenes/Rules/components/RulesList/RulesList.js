import * as React from 'react';
import { Collapse, Alert, Icon } from 'antd';
import styled from 'styled-components';

const Panel = Collapse.Panel;

const RulesList = ({ rules, className }) => {
  return (
    <Collapse defaultActiveKey={[0]} className={className}>
      {Object.keys(rules).map((key, i) => {
        const categoryRules = rules[key].rules;
        return (
          <Panel
            header={`${key} (${categoryRules.length} errors)`}
            key={i}
            disabled={categoryRules.length === 0}
          >
            {categoryRules.map((rule, j) => {
              return <Rule message={rule} type="error" key={[i, j]} />;
            })}
          </Panel>
        );
      })}
    </Collapse>
  );
};

const Rule = styled(Alert)`
  margin-bottom: 5px;
`;

export default RulesList;
