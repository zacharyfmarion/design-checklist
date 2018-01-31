import * as React from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import Rule from '../Rule';
const Panel = Collapse.Panel;

const RulesList = ({ rules, className }) => {
  const keys = Object.keys(rules).map((_, i) => `${i}`);
  return (
    <StyledCollapse defaultActiveKey={keys} className={className}>
      {Object.keys(rules).map((category, i) => {
        console.log(category);
        return (
          <StyledPanel header={category} key={`${i}`}>
            <Element name={category}>
              {rules[category] instanceof Array
                ? rules[category].map((rule, j) =>
                    <StyledRule rule={rule} type="error" key={[i, j]} />
                  )
                : Object.keys(rules[category]).map((subcategory, j) =>
                    <div>
                      <SubHeader>
                        {rules[category][subcategory]['category description']}
                      </SubHeader>
                      {rules[category][subcategory].detail.map((rule, j) =>
                        <StyledRule rule={rule} type="error" key={[i, j]} />
                      )}
                    </div>
                  )}
            </Element>
          </StyledPanel>
        );
      })}
    </StyledCollapse>
  );
};

const SubHeader = styled.h2`
  padding: 5px;
  margin: 10px 0;
  border-left: 5px solid #26b47b;
  background: #baf4bc;
`;

const StyledPanel = styled(Panel)`
  .ant-collapse-content {
    padding-left: 0 !important;
  }
  .ant-collapse-content-box {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;

const StyledCollapse = styled(Collapse)`
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07) !important;
`;

const StyledRule = styled(Rule)`
  margin-bottom: 5px;
`;

export default RulesList;
