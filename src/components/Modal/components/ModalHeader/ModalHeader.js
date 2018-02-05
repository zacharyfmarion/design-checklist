// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import Button from 'components/Button';
import Text from 'components/Text';
import { colors } from 'constants/styles';
import styled from 'styled-components';

type Props = {
  title: string,
  onClose: Function
};

const ModalHeader = ({ title, onClose }: Props) =>
  <Header p={1}>
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
  background: ${colors.primary};
  align-items: center;
  color: black;
`;

export { ModalHeader };
export default ModalHeader;
