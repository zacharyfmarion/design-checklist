import * as React from 'react';
import { Collapse as AntCollapse } from 'antd';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

const Panel = AntCollapse.Panel;

const Collapse = inject('app')(
  observer(({ app, children, ...props }) => {
    return (
      <CollapseWrapper auto themeName={app.themeName} theme={app.theme}>
        <StyledAntCollapse
          themeName={app.themeName}
          theme={app.theme}
          {...props}
        >
          {children}
        </StyledAntCollapse>
      </CollapseWrapper>
    );
  }),
);

const CollapseWrapper = styled(Flex)`
  ${({ themeName, theme }) => `
    .ant-collapse {
      background-color: ${theme.background} !important;
      border-color: ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    }
    .ant-collapse > .ant-collapse-item {
      border-color: ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    }
  `};
`;

const StyledAntCollapse = styled(AntCollapse)`
  flex: 1 1 auto;
  ${({ theme, themeName }) => `
    .ant-collapse-header {
      background: ${
        themeName === 'light' ? '#f7f7f7' : theme.backgroundSecondary
      };
      color: ${theme.color} !important;
    }
    .ant-collapse-content {
      background: ${theme.background};
      color: ${theme.color};
      border-color: ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    }
    .ant-collapse-item > .ant-collapse-header .arrow {
      color: ${theme.color} !important;
    }
  `};
`;

export { Collapse, Panel };
