// @flow
import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'constants/styles';
import { Flex } from 'reflexbox';

type Props = {
  /** Children to be displayed in the panel */
  children: React.Node,
  /** Whether or not to have a background color and large margin */
  fluid?: boolean,
};

/**
 * Component for rendering a panel on a page. This is used in most scenes
 * as the background for whatever content appears on the page
 */
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
