// @flow
import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'constants/styles';
import { Flex } from 'reflexbox';

type Props = {
  children: React.Node,
};

const Panel = ({ children, ...other }: Props) => (
  <Container auto {...other}>
    {children}
  </Container>
);

const Container = styled(Flex)`
  margin: 15px 30px 30px 30px;
  padding: 20px;
  background: #fff;
  border-radius: 2px;
  box-shadow: ${shadow};
`;

export default Panel;
