// @flow
import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { shadow } from 'constants/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import scenes from 'scenes';
import styled from 'styled-components';
import Button from 'components/Button';

type Props = {
  collapsed: boolean,
  toggleCollapsed: Function,
  toggleCollapsed: Function,
  title: string,
  ui: UiStore,
  app: AppStore,
  location: Object,
};

type State = {
  collapsed: boolean,
};

@observer
class SideMenu extends React.Component<Props, State> {
  state = {
    collapsed: false,
  };

  getBasePath = () => {
    const pathname = this.props.location.pathname;
    let slashCount = 0,
      ret = pathname;
    [...pathname].forEach((c, i) => {
      if (c === '/') {
        if (slashCount >= 1) {
          ret = pathname.substring(0, i);
        }
        slashCount++;
      }
    });
    return ret;
  };

  handleItemClick = () => {
    const { ui, app } = this.props;
    if (!ui.isDesktop) {
      app.toggleSidebarVisibility();
    }
  };

  render() {
    const { collapsed, app, title, ui, toggleCollapsed } = this.props;
    return (
      <SidebarContainer column collapsed={collapsed} isDesktop={ui.isDesktop}>
        <SidebarHeader
          align="center"
          justify={collapsed ? 'center' : 'flex-start'}
          collapsed={collapsed}
        >
          <HeaderIcon type="code-o" collapsed={collapsed} />
          {!collapsed && <ProjectTitle>{title}</ProjectTitle>}
        </SidebarHeader>
        <Flex auto>
          <StyledMenu
            defaultSelectedKeys={[this.props.location.pathname]}
            defaultOpenKeys={['/checklist']}
            mode="inline"
            isDesktop={ui.isDesktop}
            inlineCollapsed={ui.isDesktop ? collapsed : false}
            primary={app.primaryColor}
          >
            {scenes.map((scene, i) => {
              if (scene.scenes.length > 0) {
                return (
                  <StyledSubmenu
                    key={scene.path}
                    title={
                      <span>
                        <SubmenuHeaderLink
                          to={scene.path}
                          onClick={this.handleItemClick}
                          primaryColor={app.primaryColor}
                        >
                          <Icon type={scene.icon} />
                          <span>{scene.name}</span>
                        </SubmenuHeaderLink>
                      </span>
                    }
                  >
                    {scene.scenes.map((subscene, j) => (
                      <SubmenuItem key={subscene.path} collapsed={collapsed}>
                        <SubmenuItemLink
                          to={subscene.path}
                          onClick={this.handleItemClick}
                          collapsed={collapsed}
                        >
                          <Icon type={subscene.icon} />
                          <span>{subscene.name}</span>
                        </SubmenuItemLink>
                      </SubmenuItem>
                    ))}
                  </StyledSubmenu>
                );
              }
              return (
                <Menu.Item key={scene.path}>
                  <Link to={scene.path} onClick={this.handleItemClick}>
                    <Icon type={scene.icon} />
                    <span>{scene.name}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </StyledMenu>
        </Flex>
        {ui.isDesktop && (
          <CollapseButton
            onClick={toggleCollapsed}
            icon={collapsed ? 'menu-unfold' : 'menu-fold'}
            primaryColor={app.primaryColor}
          >
            {!collapsed ? `Collapse Menu` : ``}
          </CollapseButton>
        )}
      </SidebarContainer>
    );
  }
}

const StyledSubmenu = styled(Menu.SubMenu)``;

const SubmenuItem = styled(Menu.Item)`
  background: #fff;
  ${({ collapsed }) => collapsed && `width: 200px`};
`;

const SubmenuItemLink = styled(Link)`
  ${({ collapsed }) => collapsed && `margin-left: 70px`};
`;

const SubmenuHeaderLink = styled(Link)`
  color: ${({ primaryColor }) => primaryColor};
`;

const ProjectTitle = styled.h2`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const HeaderIcon = styled(Icon)`
  font-size: 18px;
  ${({ collapsed }) =>
    !collapsed &&
    `
    margin-right: 10px;
  `};
`;

const SidebarHeader = styled(Flex)`
  height: 75px;
  z-index: 2;
  background: white;
  box-shadow: ${shadow};
  ${({ collapsed }) =>
    !collapsed &&
    `
    padding: 0 15px;
  `};
`;

const CollapseButton = styled(Button)`
  ${({ primaryColor }) => `
  height: 50px;
  border-radius: 0;
  box-shadow: none;
  border-top: 1px solid #bfbfbf;
  &:hover {
    border-color: ${primaryColor};
    color: ${primaryColor};
  }
  &:active {
    border-color: ${primaryColor};
    color: ${primaryColor};
  }
  &:focus {
    border-color: ${primaryColor};
    color: ${primaryColor};
  }
  &:visited {
    border-color: ${primaryColor};
    color: ${primaryColor};
  }
  `};
`;

const StyledMenu = styled(Menu)`
  ${({ primary, isDesktop }) => `
    .ant-menu-item:hover, .ant-menu-item > a:hover, .ant-menu-item-selected, .ant-menu-item-selected > a {
      color: ${primary};
    }
    .ant-menu-item:after {
      border-right: 3px solid ${primary} !important;
    }
    .ant-menu-submenu-title {
      ${!isDesktop && `font-size: 18px`};
    }
    .ant-menu-item {
        ${
          !isDesktop
            ? `
          font-size: 18px;
          height: 52px;
          line-height: 52px;
      `
            : ''
        }
    } 
    .ant-menu-submenu-selected.ant-menu-submenu-title {
      border-right: 3px solid ${primary} !important;
    }
  `};
`;

const SidebarContainer = styled(Flex)`
  width: ${({ collapsed, isDesktop }) =>
    isDesktop ? (collapsed ? '64px' : '256px') : '300px;'};
  overflow: hidden;
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export default inject('ui', 'app')(withRouter(SideMenu));
