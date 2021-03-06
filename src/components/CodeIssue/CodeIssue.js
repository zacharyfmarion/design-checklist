// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { stripSrc } from 'helpers/files';
import UiStore from 'stores/UiStore';
import { Collapse, Panel } from 'components/Collapse';

const TabPane = Tabs.TabPane;

type Issue = {
  duplications?: Array<Array<Object>>,
  code?: Array<Object>,
  error?: Array<Object>,
  message: string,
  severity: string,
  path: string,
};

type Props = {
  /** Whether or not to include a drop shadow */
  shadowed: boolean,
  /** Ui store for responsivity */
  ui: UiStore,
  /** Error object */
  error: Issue,
  className?: string,
};

const Expand = ({ className }) => (
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
  </Flex>
);

/**
 * Component that handles the rendering of a sonarqube issue. It displays a
 * collapsable panel with the code described in the error prop. This prop can
 * contain either an error attribute or a duplications attribute, and depending
 * on which it contains a different code view is rendered. If the duplication
 * property is present a side-by-side view of the code is rendered, turning into
 * a list of tabs if there are too many duplicated blocks or the width of the
 * screen is too small. Currently there is a log of messy logic in this file which
 * ideally would be abstracted away into separate mobx stores / components.
 */
@observer
class CodeIssue extends React.Component<Props> {
  // get number of keys of object with most keys from array
  getLongestCodeLength(duplication: Array<Object>) {
    const vals = duplication.map(file => file.code.length);
    return Math.max.apply(Math, vals);
  }

  getLastTabIndex = (line: string) => {
    let i = 0;
    for (; i < line.length; i++) {
      if (line[i] !== '\t' && line[i] !== ' ') break;
    }
    return i;
  };

  // return least number of spaces before code begins in a line
  getDupLeastWhitespace = (code: Array<string>) => {
    const vals = code.map(this.getLastTabIndex);
    return Math.min.apply(Math, vals);
  };

  getLeastWhitespace = (code: Array<Object>) => {
    const vals = code.map(issue => {
      const lastIndices = issue.code.map(this.getLastTabIndex);
      return Math.min.apply(Math, lastIndices);
    });
    return Math.min.apply(Math, vals);
  };

  // get the max line number from an array
  getMaxLineNumbers(duplications) {
    if (!duplications || duplications.length < 1) return [];
    return duplications[0].map((file, i) => {
      return Math.max.apply(
        Math,
        duplications.map(duplication => duplication[i].endLine),
      );
    });
  }

  /**
   * Change the duplications from [[], []] to pairs of lines
   */
  processDuplications = (duplications: Array<Array<Object>>) => {
    return duplications.map(this.processDuplication);
  };

  processDuplication = duplication => {
    let lines = [];
    for (let i = 0; i < duplication.length; i++) {
      for (let j = 0; j < this.getLongestCodeLength(duplication); j++) {
        const startLine = duplication[i].startLine;
        const code =
          j < duplication[i].code.length ? duplication[i].code[j] : '';
        if (!lines[j]) lines.push([]);
        lines[j].push({
          lineNumber: startLine + j,
          code,
        });
      }
    }
    return lines;
  };

  stripFilename = (path: string) => {
    if (path instanceof Array) path = path[0];
    return path.substring(path.indexOf(':', path.indexOf(':') + 1) + 1);
  };

  stripFilenameMobile = (path: string) => {
    if (path instanceof Array) path = path[0];
    return path.substring(path.lastIndexOf('/') + 1);
  };

  // maxLines is an array containing the maximum line number
  // for each file
  renderDuplication = (dup, maxLines, dupNumber) => {
    const { ui, app, error: { duplications } } = this.props;
    if (!duplications) return null;
    const leastWhitespaces = duplications[dupNumber].map(item =>
      this.getDupLeastWhitespace(item.code),
    );
    return (
      <CodeWrapper column auto theme={app.theme}>
        {dup.map((lines, i) => (
          <Flex auto>
            {lines.map((line, j) => (
              <LineWrapper numFiles={ui.isDesktop ? dup[0].length : 1}>
                <LineNumber
                  align="center"
                  justify="center"
                  width={
                    maxLines.length >= j && maxLines[j]
                      ? maxLines[j].toString.length * 5 + 30
                      : 40
                  }
                  theme={app.theme}
                  themeName={app.themeName}
                >
                  {line.lineNumber}
                </LineNumber>
                <Line
                  auto
                  key={`${i},${j}`}
                  theme={app.theme}
                  dangerouslySetInnerHTML={{
                    __html: line.code.substring(leastWhitespaces[j]),
                  }}
                />
              </LineWrapper>
            ))}
          </Flex>
        ))}
      </CodeWrapper>
    );
  };

  renderMobileDuplication = (fileIndex: number, maxLine: number) => {
    const { ui, app, error: { duplications } } = this.props;
    if (!duplications) return null;
    const leastWhitespace = this.getLeastWhitespace(
      duplications.map(duplication => {
        return { code: duplication[fileIndex].code };
      }),
    );
    return (
      <Flex column auto>
        {duplications.map((duplication, i) => {
          const code = duplication[fileIndex].code;
          return (
            <CodeWrapper column auto theme={app.theme}>
              {code.map((line, j) => (
                <LineWrapper numFiles={ui.isDesktop ? duplication.length : 1}>
                  <LineNumber
                    align="center"
                    justify="center"
                    width={maxLine.toString.length * 5 + 30}
                    theme={app.theme}
                    themeName={app.themeName}
                  >
                    {duplication[fileIndex].startLine + j}
                  </LineNumber>
                  <Line
                    auto
                    key={`${i},${j}`}
                    theme={app.theme}
                    dangerouslySetInnerHTML={{
                      __html: line.substring(leastWhitespace),
                    }}
                  />
                </LineWrapper>
              ))}
              {i < duplications.length - 1 && (
                <DuplicationSeparator
                  themeName={app.themeName}
                  theme={app.theme}
                >
                  <PaddedExpand width={maxLine.toString.length * 5 + 30} />
                  <SeparatorMessage>Collapsed lines...</SeparatorMessage>
                </DuplicationSeparator>
              )}
            </CodeWrapper>
          );
        })}
      </Flex>
    );
  };

  renderMobileDuplications = (maxLines: Array<number>) => {
    const { error: { duplications } } = this.props;
    if (!duplications) return null;
    return (
      <DuplicationTabs
        defaultActiveKey="0"
        onNextClick={() => console.log('next')}
        onPrevClick={() => console.log('prev')}
      >
        {duplications[0].map((dup, i) => (
          <DuplicationTabPane
            tab={this.stripFilenameMobile(dup.loc)}
            key={`${i}`}
          >
            {this.renderMobileDuplication(i, maxLines[i])}
          </DuplicationTabPane>
        ))}
      </DuplicationTabs>
    );
  };

  renderDuplications = () => {
    const { ui, app, error: { duplications } } = this.props;
    if (!duplications) return null;
    const processedDups = this.processDuplications(duplications);
    const maxLines = this.getMaxLineNumbers(duplications);
    if (!ui.isDesktop || duplications[0].length > 2) {
      return this.renderMobileDuplications(maxLines);
    }
    return (
      <Flex column>
        {processedDups.map((duplication, i) => {
          return (
            <Flex column>
              <Duplication>
                {this.renderDuplication(duplication, maxLines, i)}
              </Duplication>
              {i < processedDups.length - 1 && (
                <DuplicationSeparator
                  themeName={app.themeName}
                  theme={app.theme}
                >
                  <PaddedExpand width={maxLines[0].toString.length * 5 + 30} />
                  <SeparatorMessage>Collapsed lines...</SeparatorMessage>
                </DuplicationSeparator>
              )}
            </Flex>
          );
        })}
      </Flex>
    );
  };

  renderCode = () => {
    const { app, error: { code } } = this.props;
    if (!code || code.length === 0) return null;
    const maxLine = code[code.length - 1].textRange.endLine;
    return code.map((issue, i) => {
      return (
        <CodeWrapper column key={i} theme={app.theme}>
          {issue.code.map((line, j) => (
            <Flex key={`${i}-${j}`}>
              <LineNumber
                align="center"
                justify="center"
                width={maxLine.toString().length * 5 + 30}
                themeName={app.themeName}
                theme={app.theme}
              >
                {issue.textRange.startLine + j}
              </LineNumber>
              <Line
                key={issue.textRange.startLine + j}
                theme={app.theme}
                dangerouslySetInnerHTML={{
                  __html: line.substring(this.getLeastWhitespace(code)),
                }}
              />
            </Flex>
          ))}
          {i + 1 < code.length &&
            code[i + 1].textRange.startLine !==
              code[i].textRange.startLine + 1 && (
              <DuplicationSeparator themeName={app.themeName} theme={app.theme}>
                <PaddedExpand width={maxLine.toString().length * 5 + 30} />
                <SeparatorMessage>Collapsed lines...</SeparatorMessage>
              </DuplicationSeparator>
            )}
        </CodeWrapper>
      );
    });
  };

  render() {
    const {
      error: { path, severity, message, code, duplications },
      shadowed,
      className,
      ui,
    } = this.props;
    const moreThanTwoDups =
      duplications && duplications.length > 0 && duplications[0].length > 2;
    const fileName = stripSrc(this.stripFilename(path));
    return (
      <Collapse
        defaultActiveKey={'0'}
        className={className}
        shadowed={!ui.Desktop && shadowed}
      >
        <StyledPanel
          key="0"
          header={
            <RuleHeader column>
              <Pathname>
                {duplications ? (
                  <Flex column={!ui.isDesktop || moreThanTwoDups}>
                    {duplications[0].map(file => (
                      <PathTitle
                        numFiles={
                          ui.isDesktop && !moreThanTwoDups
                            ? duplications[0].length
                            : 1
                        }
                      >
                        {fileName}
                      </PathTitle>
                    ))}
                  </Flex>
                ) : (
                  `${fileName} - ${severity.toUpperCase()}`
                )}
              </Pathname>
              <ErrorMessage>
                {duplications
                  ? `${
                      duplications[0].length
                    } duplicated blocks of code must be removed.`
                  : message}
              </ErrorMessage>
            </RuleHeader>
          }
        >
          {code && this.renderCode()}
          {duplications && this.renderDuplications()}
        </StyledPanel>
      </Collapse>
    );
  }
}

const StyledPanel = styled(Panel)`
  .ant-collapse-content {
    padding: 0;
  }
  .ant-collapse-content-box {
    padding: 0;
  }
`;

const DuplicationTabPane = styled(TabPane)``;

const DuplicationTabs = styled(Tabs)`
  .ant-tabs-nav-scroll {
    overflow: scroll;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
  }
  .ant-tabs-tab {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

const PathTitle = styled(Flex)`
  padding-right: 10px;
  width: ${({ numFiles }) => `${100.0 / numFiles}%`};
`;

const CodeWrapper = styled(Flex)`
  ${({ theme }) => `
    background: ${theme.background};
  `};
`;

const SeparatorMessage = styled.span`
  font-family: monospace;
  line-height: 20px;
  margin-left: 5px;
  vertical-align: middle;
`;

const PaddedExpand = styled(Expand)`
  width: ${({ width }) => `${width}px`};
`;

const LineWrapper = styled(Flex)`
  min-width: ${({ numFiles }) => `${100.0 / numFiles}%`};
`;

const DuplicationSeparator = styled(Flex)`
  ${({ themeName, theme }) => `
    height: 20px;
    background: ${themeName === 'light' ? '#f1f8ff' : '#2b2e31'};
    color: ${theme.colorSecondary};
  `};
`;

const Duplication = styled(Flex)``;

const ErrorMessage = styled.span`
  color: #f4766e;
`;

const RuleHeader = styled(Flex)``;

const LineNumber = styled(Flex)`
  font-family: monospace;
  background: ${({ themeName, theme }) =>
    themeName === 'light' ? `#f7f7f7` : theme.backgroundSecondary};
  min-width: ${({ width }) => `${width}px`};
  text-align: center;
  margin-right: 3px;
`;

const Line = styled.pre`
  display: inline;
  font-family: monospace;
  font-size: 12px;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-all;
  tab-size: 15px;
  color: ${({ theme }) => theme.color};
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

export default inject('ui', 'app')(CodeIssue);
