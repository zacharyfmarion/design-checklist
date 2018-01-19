import * as React from 'react';
import AceEditor from 'react-ace';
import { Collapse } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

import 'brace/mode/java';
import 'brace/theme/github';

const Panel = Collapse.Panel;

const code = `public class HelloWorld {

  public static void main(String[] args) {
      // Prints "Hello, World" to the terminal window.
      System.out.println("Hello, World");
  }

}`;

const RuleHeader = ({ path, message, className }) =>
  <Flex column className={className}>
    <Pathname>
      {path}
    </Pathname>
    <span>
      {message}
    </span>
  </Flex>;

const Rule = ({ path, message, key, className }) => {
  return (
    <StyledCollapse defaultActiveKey={[0]} className={className}>
      <Panel header={<RuleHeader path={path} message={message} />} key={0}>
        <StyledEditor
          mode="java"
          theme="github"
          width="100%"
          height="100px"
          readOnly
          name={`rule_${JSON.stringify(key)}`}
          value={code}
          editorProps={{ $blockScrolling: true }}
        />
      </Panel>
    </StyledCollapse>
  );
};

const StyledCollapse = styled(Collapse)`
  &:hover {
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07) !important;
  }
  .ant-collapse-content-box, .ant-collapse-content {
    padding: 0;
  }
`;

const StyledEditor = styled(AceEditor)`
`;

const Pathname = styled.span`font-family: monospace;`;

export default Rule;
