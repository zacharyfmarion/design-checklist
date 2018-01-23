import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const Button = styled(AntButton)`
  height: 38px;
  padding: 0 20px;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08); 
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
