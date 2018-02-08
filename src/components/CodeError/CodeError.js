import * as React from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {};

const Expand = ({ className }) =>
  <Flex align="center" justify="center" className={className}>
    <svg
      aria-hidden="true"
      height="16"
      version="1.1"
      viewBox="0 0 14 16"
      width="14"
    >
      <path
        fill-rule="evenodd"
        d="M11.5 7.5L14 10c0 .55-.45 1-1 1H9v-1h3.5l-2-2h-7l-2 2H5v1H1c-.55 0-1-.45-1-1l2.5-2.5L0 5c0-.55.45-1 1-1h4v1H1.5l2 2h7l2-2H9V4h4c.55 0 1 .45 1 1l-2.5 2.5zM6 6h2V3h2L7 0 4 3h2v3zm2 3H6v3H4l3 3 3-3H8V9z"
      />
    </svg>
  </Flex>;

@observer
class CodeError extends React.Component<Props> {
  // get number of keys of object with most keys from array
  getLargestObjectLength(array: Array<Object>) {
    return array.reduce((a, b) =>
      Math.max(
        a.code[Object.keys(a.code)[0]].length,
        b.code[Object.keys(b.code)[0]].length
      )
    );
  }

  // get the max line number from an array
  getMaxLineNumbers(duplication) {
    return duplication.map(file => {
      const startLine = Object.keys(file.code)[0];
      return parseInt(startLine) + file.code[startLine].length - 1;
    });
  }

  processDuplication = duplication => {
    let lines = [];
    for (let i = 0; i < duplication.length; i++) {
      for (let j = 0; j < this.getLargestObjectLength(duplication); j++) {
        const startLine = Object.keys(duplication[i].code)[0];
        const code =
          j < duplication[i].code[startLine].length
            ? duplication[i].code[startLine][j]
            : '';
        if (!lines[j]) lines.push([]);
        lines[j].push({
          lineNumber: parseInt(startLine) + j,
          code
        });
      }
    }
    return lines;
  };

  stripFilename = (path: string) => {
    if (path instanceof Array) path = path[0];
    return path.substring(path.indexOf(':', path.indexOf(':') + 1) + 1);
  };

  /**
   * Change the duplications from [[], []] to pairs of lines
   */
  processDuplications = (duplications: Array) => {
    return duplications.map(this.processDuplication);
  };

  // maxLines is an array containing the maximum line number
  // for each file
  renderDuplication = (duplication, maxLines) => {
    console.log(maxLines);
    return (
      <Flex column auto>
        {duplication.map((lines, i) =>
          <Flex auto>
            {lines.map((line, j) =>
              <LineWrapper numFiles={duplication[0].length}>
                <LineNumber
                  align="center"
                  justify="center"
                  width={maxLines[j].toString.length * 5 + 30}
                >
                  {line.lineNumber}
                </LineNumber>
                <Line
                  auto
                  key={[i, j]}
                  dangerouslySetInnerHTML={{ __html: line.code }}
                />
              </LineWrapper>
            )}
          </Flex>
        )}
      </Flex>
    );
  };

  renderDuplications = () => {
    const { error: { duplications } } = this.props;
    const processedDups = this.processDuplications(duplications);
    return (
      <Flex column>
        {processedDups.map((duplication, i) =>
          <Flex column>
            <Duplication>
              {this.renderDuplication(
                duplication,
                this.getMaxLineNumbers(duplications[i])
              )}
            </Duplication>
            {i < processedDups.length - 1 &&
              <DuplicationSeparator>
                <PaddedExpand />
                <SeparatorMessage>Collapsed lines...</SeparatorMessage>
              </DuplicationSeparator>}
          </Flex>
        )}
      </Flex>
    );
  };

  render() {
    const {
      error: { path, message, code, duplications },
      className
    } = this.props;
    let maxLine;
    try {
      maxLine = parseInt(Object.keys(code)[Object.keys(code).length - 1]);
    } catch (err) {
      maxLine = 100;
    }
    return (
      <RuleContainer column className={className}>
        <RuleHeader column>
          <Pathname>
            {duplications
              ? <Flex>
                  {duplications[0].map(file =>
                    <PathTitle numFiles={duplications[0].length}>
                      {this.stripFilename(file.loc)}
                    </PathTitle>
                  )}
                </Flex>
              : this.stripFilename(path)}
          </Pathname>
          <ErrorMessage>
            {message}
          </ErrorMessage>
        </RuleHeader>
        {code &&
          Object.keys(code).map((lineNumber, i) =>
            <Flex>
              <LineNumber
                align="center"
                justify="center"
                width={maxLine.toString().length * 5 + 30}
              >
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

const PathTitle = styled(Flex)`
  padding-right: 10px;
  width: ${({ numFiles }) => `${100.0 / numFiles}%`};
`;

const SeparatorMessage = styled.span`
  font-family: monospace;
  line-height: 30px;
  margin-left: 5px;
  vertical-align: middle;
`;

const PaddedExpand = styled(Expand)`
  padding: 0 5px;
`;

const LineWrapper = styled(Flex)`
  width: ${({ numFiles }) => `${100.0 / numFiles}%`};
`;

const DuplicationSeparator = styled(Flex)`
  height: 30px;
  background: #f1f8ff;
`;

const Duplication = styled(Flex)`
`;

const ErrorMessage = styled.span`color: #f4766e;`;

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
  width: ${({ width }) => `${width}px`};
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
  .sym { 
    color: #ad7817;
  }
  .cd {
    color: gray;
  }
`;

const Pathname = styled.span`
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
`;

export default CodeError;
