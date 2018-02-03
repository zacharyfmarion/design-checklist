import { Button as AntButton } from 'antd';
import styled from 'styled-components';
import { shadow } from 'constants/styles';

const Button = styled(AntButton)`
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
