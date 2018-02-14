import * as React from 'react';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';
import GoogleAnalytics from 'react-ga';
import { shadow } from 'constants/styles';

type Props = {
  onClick: Function,
  action?: string,
  label?: string,
  value?: string,
  children: React.Node
};

const Button = ({
  onClick,
  action,
  label,
  value,
  children,
  ...other
}: Props) => {
  const handleClick = () => {
    if (action) {
      GoogleAnalytics.event({
        category: 'Interaction',
        action,
        label,
        value
      });
    }
    onClick();
  };
  return (
    <StyledButton onClick={handleClick} {...other}>
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
  ${({ primary }) =>
    primary &&
    `
    background-color: #26b47b; 
    color: #fff;
    &:hover {
      border-color: #26b47b;
      color: #26b47b;
    }
  `}
`;

export default Button;
