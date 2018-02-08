import * as React from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import RuleStore from './RuleStore';

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

  renderDuplications = () => {
    const { rule: { duplications } } = this.props;
    return null;
  };

  render() {
    const {
      rule: { path, message, code, duplications },
      className
    } = this.props;
    return (
      <RuleContainer column className={className}>
        <RuleHeader column>
          <Pathname>
            {path}
          </Pathname>
          <Error>
            {message}
          </Error>
        </RuleHeader>
        {code &&
          Object.keys(code).map((lineNumber, i) =>
            <Flex>
              <LineNumber align="center" justify="center">
                {lineNumber}
              </LineNumber>
              <Line
                auto
                key={i}
                dangerouslySetInnerHTML={{ __html: code[lineNumber][0] }}
              />
            </Flex>
          )}
        {duplications && this.renderDuplications()}
      </RuleContainer>
    );
  }
}

const Error = styled.span`color: #f4766e;`;

const RuleHeader = styled(Flex)`
  padding: 5px;
  border-bottom: 1px solid #bfbfbf;
  background: #f4f4f6;
`;

const RuleContainer = styled(Flex)`
  border: 1px solid #bfbfbf;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const LineNumber = styled(Flex)`
  font-family: monospace;
  background: #f7f7f7;
  padding: 0 7px;
  text-align: center;
  margin-right: 3px;
`;

const Line = styled(Flex)`
  font-family: monospace;
  font-size: 12px;
  display: inline;
  word-wrap: break-word;
  word-break: break-all;
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
  .sym { }
`;

const Pathname = styled.span`
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
`;

export default Rule;
