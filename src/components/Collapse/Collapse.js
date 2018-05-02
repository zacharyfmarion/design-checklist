import * as React from 'react';
import { Collapse as AntCollapse } from 'antd';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  app: AppStore,
  className: string,
  /** Whether or not to add a box shadow to the Collapse */
  shadowed: boolean,
  children: React.Node,
};

/**
 * A themed wrappper for the antd Collapse component
 */
const Collapse = inject('app')(
  observer(({ app, className, shadowed, children, ...props }: Props) => {
    return (
      <StyledAntCollapse
        themeName={app.themeName}
        theme={app.theme}
        className={className}
        shadowed={shadowed}
        {...props}
      >
        {children}
      </StyledAntCollapse>
    );
  }),
);

const StyledAntCollapse = styled(AntCollapse)`
  flex: 1 1 auto;
  ${({ shadowed, theme, themeName }) => `
    background-color: ${theme.background} !important;
    border-color: ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    box-shadow: ${shadowed ? theme.shadow : 'none'};
    .ant-collapse-header {
      background: ${
        themeName === 'light' ? '#f7f7f7' : theme.backgroundSecondary
      };
      color: ${theme.color} !important;
    }
    .ant-collapse-content {
      background: ${theme.background};
      color: ${theme.color};
      border-top: 1px solid ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    }
    .ant-collapse-item {
      border-color: ${themeName === 'light' ? '#d9d9d9' : '#505050'};
    }
    .ant-collapse-item > .ant-collapse-header .arrow {
      color: ${theme.color} !important;
    }
    .ant-collapse-item:last-child > .ant-collapse-header {
      border-radius: 2px 2px 0 0 !important;
    }
  `};
`;

export default Collapse;
