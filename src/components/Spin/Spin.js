// @flow
import * as React from 'react';
import { Spin as AntSpin } from 'antd';
import { inject, observer } from 'mobx-react';
import { shadeColor } from 'helpers/colors';
import styled from 'styled-components';

const Spin = ({ app }) => (
  <StyledAntSpin size="large" primary={app.primaryColor} />
);

const StyledAntSpin = styled(AntSpin)`
  .ant-spin-dot {
    width: 50px;
    height: 50px;
    i {
      background: ${({ primary }) => shadeColor(primary, 0.5)};
      width: 23px;
      height: 23px;
    }
  }
`;

export default inject('app')(observer(Spin));
