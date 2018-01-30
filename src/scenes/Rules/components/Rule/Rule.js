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
    const { rule: { path, message, code, textRange }, className } = this.props;
    return (
      <StyledCollapse
        defaultActiveKey={['0']}
        className={className}
        onChange={this.handleCollapseChange}
      >
        <Panel header={<RuleHeader path={path} message={message} />} key="0">
          {code &&
            code.map((line, i) =>
              <Flex>
                <LineNumber align="center" justify="center">
                  {textRange.startLine + i}
                </LineNumber>
                <Line auto key={i} dangerouslySetInnerHTML={{ __html: line }} />
              </Flex>
            )}
        </Panel>
      </StyledCollapse>
    );
  }
}

const LineNumber = styled(Flex)`
  font-family: monospace;
  background: #baf4bc;
  padding: 0 3px;
  width: 35px;
  text-align: center;
  margin-right: 3px;
`;

const Line = styled(Flex)`
  font-family: monospace;
  font-size: 12px;
  display: inline;
  overflow-x: scroll;
  color: #000;
  .s {
    color: #d14;
  }
  .k {
    color: #0086b3;
  }
  .c {
    color: #099;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-content-box, .ant-collapse-content {
    padding: 0;
  }
`;

const Pathname = styled.span`font-family: monospace;`;

export default Rule;
