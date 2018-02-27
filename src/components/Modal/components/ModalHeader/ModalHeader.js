// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import Button from 'components/Button';
import Text from 'components/Text';
import AppStore from 'stores/AppStore';
import styled from 'styled-components';

type Props = {
  title: string,
  onClose: Function,
  app: AppStore
};

const ModalHeader = ({ title, onClose, app }: Props) =>
  <Header primary={app.primaryColor}>
    <Flex auto>
      <Text size="large">
        {title}
      </Text>
    </Flex>
    <CloseButton icon="close" onClick={onClose} />
  </Header>;

const CloseButton = styled(Button)`
  background: none;
  border: none;
  box-shadow: none;
  color: #fff;
  &:hover{
    background: none;
    border: none;
    box-shadow: none;
  }
  &:active{
    background: none;
    border: none;
    box-shadow: none;
  }
  &:focus{
    background: none;
    border: none;
    box-shadow: none;
  }
`;

const Header = styled(Flex)`
  background: ${({ primary }) => primary};
  align-items: center;
  padding: 8px 15px;
  color: #fff;
`;

export default inject('app')(observer(ModalHeader));
