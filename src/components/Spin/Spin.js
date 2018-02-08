import * as React from 'react';
import { Spin as AntSpin } from 'antd';
import styled from 'styled-components';

const Spin = () => <StyledAntSpin size="large" />;

const StyledAntSpin = styled(AntSpin)`
  .ant-spin-dot {
    width: 50px;
    height: 50px;
    i {
      background: #baf4bc;
      width: 23px;
      height: 23px;
    }
  }
`;

export default Spin;
