// @flow
import * as React from 'react';
import { Switch as AntSwitch } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';

type Props = {
  /** Global store inject to handle theme */
  app: AppStore,
};

/**
 * Themed wrapper to render an antd Switch component
 */
const Switch = ({ app, ...props }: Props) => {
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
