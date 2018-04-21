// @flow
import * as React from 'react';
import { Button as AntButton } from 'antd';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';
import GoogleAnalytics from 'helpers/analytics';
import { shadow } from 'constants/styles';

type Props = {
  /**
   * Click handler for the button. If action, label, or value are
   * supplied as props clicking the button will also send an event
   * to Google Analytics
   */
  onClick: Function,
  /**
   * Action name for a Google Analytics event. If present an analytics
   * event will be sent on click
   */
  action?: string,
  /**
   * Label for a Google Analytics event. If present an analytics event
   * will be sent on click
   */
  label?: string,
  /**
   * Value for a Google Analytics event. If present an analytics event
   * will be sent on click
   */
  value?: string,
  /** Whether or not a drop shadow should be added to the button */
  flat?: boolean,
  /** Child - should just be a text field */
  children: React.Node,
  /** App store for access to the app.primaryColor global property */
  app: AppStore,
};

/**
 * A simple button component build on top of the antd component
 * with some styling additions
 */
const Button = ({
  onClick,
  action,
  label,
  app,
  flat,
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
      flat={flat}
      {...other}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(AntButton)`
  height: 38px;
  padding: 0 20px;
  text-transform: uppercase;
  font-size: 14px;
  ${({ primary, flat, primaryColor }) =>
    `
    ${primary &&
      `
      background-color: ${primaryColor}; 
      color: #fff;
    `}
    ${!flat && `box-shadow: ${shadow}`};
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
