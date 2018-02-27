import * as React from 'react';
import { Switch as AntSwitch } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Switch = ({ app, ...props }) => {
  return (
    <SwitchContainer primary={app.primaryColor}>
      <AntSwitch {...props} />
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  .ant-switch-checked {
    background-color: ${({ primary }) => primary} !important;
  }
`;

export default inject('app')(observer(Switch));
