// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import UiStore from 'stores/UiStore';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string,
  onTabClick?: Function,
  ui: UiStore
};

const Layout = ({ children, subheader, ui, onTabClick, className }: Props) =>
  <Background column>
    <Header subheader={subheader} onTabClick={onTabClick} />
    <Panel auto justify="center" mobile={ui.isMobile} className={className}>
      {children}
    </Panel>
    <Footer />
  </Background>;

const Background = styled(Flex)`
  // background: #f0f2f5;
  min-height: 100vh;
`;

const Panel = styled(Flex)`
  margin: 75px 0 0;
  background: #fff;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  
  &:before {
    background: #25b47d;
    content: '';
    display: block;
    height: 550px;
    left: 0;
    position: absolute;
    right: 0;
    z-index: -1;
    -webkit-backface-visibility: hidden; // for Chrome Windows
    top: -315px;
    transform: skewY(-5.5deg);
    transform-origin: 100% 0;
  }

`;

export { Layout };
export default inject('ui')(observer(Layout));
