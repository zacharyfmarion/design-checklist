import * as React from 'react';
import { Collapse as AntCollapse } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Panel = AntCollapse.Panel;

const Collapse = inject('app')(
  observer(({ app, children, ...props }) => {
    return (
      <StyledAntCollapse theme={app.theme} {...props}>
        {children}
      </StyledAntCollapse>
    );
  }),
);

const StyledAntCollapse = styled(AntCollapse)`
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
    }
    .ant-collapse-item > .ant-collapse-header .arrow {
      color: ${theme.color} !important;
    }
  `};
`;

export { Collapse, Panel };
