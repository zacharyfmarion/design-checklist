// @flow
import * as React from 'react';
import { Popover as AntPopover } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';

type Props = {
  /** Global store inject to handle theme */
  app: AppStore,
};

/**
 * Themed wrapper to render an antd Popover component. Currently I can't figure
 * out a way to actually theme it
 */
const Popover = ({ app, ...props }: Props) => {
  return <StyledAntPopover theme={app.theme} {...props} />;
};

const StyledAntPopover = styled(AntPopover)`
  ${({ theme }) => `
    .ant-popover-inner {
      background: ${theme.background};
      color: ${theme.color};
    } 
  `};
`;

export default inject('app')(observer(Popover));
