// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import Feedback from 'components/Feedback';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string,
  onTabClick?: Function,
  actions?: React.Node,
  showSidebar?: boolean,
  ui: UiStore,
  app: AppStore,
};

@observer
class Layout extends React.Component<Props> {
  render() {
    const {
      ui,
      app,
      children,
      subheader,
      onTabClick,
      actions,
      showSidebar = true,
      className,
    } = this.props;
    return (
      <Background>
        {showSidebar &&
          (ui.isDesktop || app.sidebarVisible) && (
            <SideMenu
              collapsed={app.sidebarCollapsed}
              toggleCollapsed={app.toggleSidebar}
              title={app.projectName || 'not_found'}
            />
          )}
        {!ui.isDesktop &&
          app.sidebarVisible && (
            <Overlay onClick={app.toggleSidebarVisibility} />
          )}
        <Content
          auto
          column
          collapsed={app.sidebarCollapsed}
          showSidebar={showSidebar}
          isDesktop={ui.isDesktop}
          theme={app.theme}
        >
          <Header
            subheader={subheader}
            onTabClick={onTabClick}
            actions={actions}
            sidebarCollapsed={app.sidebarCollapsed}
            sidebarVisible={showSidebar}
            toggleSidebar={app.toggleSidebarVisibility}
          />
          <Panel
            auto
            justify="center"
            mobile={ui.isMobile}
            primary={app.primaryColor}
            className={className}
            theme={app.theme}
          >
            {children}
          </Panel>
          <Footer />
        </Content>
        <Feedback />
      </Background>
    );
  }
}

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 200, 0.6);
`;

const Content = styled(Flex)`
  ${({ collapsed, showSidebar, isDesktop, theme }) => `
    padding-left: ${
      showSidebar && isDesktop ? (collapsed ? '64px' : '256px') : '0'
    };
    background: ${theme.background};
    color: ${theme.color};
  `};
`;

const Background = styled(Flex)`
  // background: #f0f2f5;
  min-height: 100vh;
`;

const Panel = styled(Flex)`
  margin: 75px 0 0;
  background: ${({ theme }) => theme.background};
  border-radius: 5px;
  position: relative;
  z-index: 1;

  &:before {
    background: ${({ primary }) => primary};
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
export default inject('ui', 'app')(Layout);
