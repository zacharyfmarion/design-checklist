import * as React from 'react';
import AceEditor from 'react-ace';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import RuleStore from './RuleStore';

import 'brace/mode/java';
import 'brace/theme/github';

const Panel = Collapse.Panel;

const RuleHeader = ({ path, message, className }) =>
  <Flex column className={className}>
    <Pathname>
      {path}
    </Pathname>
    <span>
      {message}
    </span>
  </Flex>;

type Props = {};

@observer
class Rule extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.store = new RuleStore({
      projectId: '8902',
      fileName: 'REFLECT.txt'
    });
  }

  handleCollapseChange = () => {
    if (!this.store.loaded) {
      // this.store.getCode();
    }
  };

  render() {
    const { rule: { path, message, code }, key, className } = this.props;
    const codeText = code.join('\n');
    return (
      <StyledCollapse
        defaultActiveKey={[0]}
        className={className}
        onChange={this.handleCollapseChange}
      >
        <Panel header={<RuleHeader path={path} message={message} />} key={0}>
          <StyledEditor
            mode="java"
            theme="github"
            width="100%"
            height={`${code.length * 16}px`}
            wrapEnabled
            readOnly
            name={`rule_${JSON.stringify(key)}`}
            value={codeText}
            editorProps={{ $blockScrolling: true }}
            setOptions={{ firstLineNumber: 1 }}
          />
        </Panel>
      </StyledCollapse>
    );
  }
}

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
