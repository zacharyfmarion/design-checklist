// @flow
import * as React from 'react';
import { Spin as AntSpin } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { shadeColor } from 'helpers/colors';
import AppStore from 'stores/AppStore';

type Props = {
  /** Global store inject to handle theme */
  app: AppStore,
  className: string,
};

/**
 * A loading indicator used throughout the application, usually when waining for
 * an API call to complete.
 */
const Spin = ({ app, className }: Props) => (
  <StyledAntSpin
    className={className}
    size="large"
    primary={app.primaryColor}
  />
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
