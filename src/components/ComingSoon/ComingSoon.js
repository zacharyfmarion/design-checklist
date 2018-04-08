// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

const ComingSoon = () => (
  <Flex align="center" justify="center" auto>
    <Title>Coming Soon!</Title>
  </Flex>
);

const Title = styled.h1`
  color: gray;
  text-transform: uppercase;
`;

export default ComingSoon;
