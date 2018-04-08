// @flow
import * as React from 'react';
import { Button as AntButton } from 'antd';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';
import GoogleAnalytics from 'helpers/analytics';
import { shadow } from 'constants/styles';

type Props = {
  onClick: Function,
  action?: string,
  label?: string,
  value?: string,
  children: React.Node,
  app: AppStore,
};

const Button = ({
  onClick,
  action,
  label,
  app,
  value,
  children,
  ...other
}: Props) => {
  const handleClick = e => {
    if (action) {
      GoogleAnalytics.event({
        category: 'Interaction',
        action,
        label,
        value,
      });
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledButton
      onClick={handleClick}
      primaryColor={app.primaryColor}
      {...other}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(AntButton)`
  height: 38px;
  padding: 0 20px;
  box-shadow: ${shadow};
  text-transform: uppercase;
  font-size: 14px;
  ${({ primary, primaryColor }) =>
    `
    ${primary &&
      `
      background-color: ${primaryColor}; 
      color: #fff;
    `}
    &:hover {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:active {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:focus {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
  `};
`;

export default inject('app')(observer(Button));
