// @flow
import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'constants/styles';
import { Flex } from 'reflexbox';

type Props = {
  children: React.Node,
  fluid: string,
};

const Panel = ({ children, fluid, ...other }: Props) => (
  <Container auto fluid={fluid} {...other}>
    {children}
  </Container>
);

const Container = styled(Flex)`
  ${({ fluid }) => `
    margin: ${fluid ? `15px` : `15px 30px 30px 30px`};
    ${!fluid &&
      `
      padding: 20px;
      background: #fff;
      box-shadow: ${shadow};
      border-radius: 2px;
    `};
  `};
`;

export default Panel;
