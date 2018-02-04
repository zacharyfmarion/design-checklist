import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { colors, shadow } from 'constants/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { scenes } from 'constants/app';
import styled from 'styled-components';
import Button from 'components/Button';

type Props = {
  collapsed: boolean,
  toggleCollapsed: Function,
  toggleCollapsed: Function,
  title: string,
  location: Object
};

@observer
class SideMenu extends React.Component<Props> {
  state = {
    collapsed: false
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
    const { collapsed, title, ui, toggleCollapsed } = this.props;
    return (
      <SidebarContainer column collapsed={collapsed} isDesktop={ui.isDesktop}>
        <SidebarHeader
          align="center"
          justify={collapsed ? 'center' : 'flex-start'}
          collapsed={collapsed}
        >
          <HeaderIcon type="code-o" collapsed={collapsed} />
          {!collapsed &&
            <ProjectTitle>
              {title}
            </ProjectTitle>}
        </SidebarHeader>
        <Flex auto>
          <StyledMenu
            defaultSelectedKeys={[this.getBasePath()]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            isDesktop={ui.isDesktop}
            inlineCollapsed={ui.isDesktop ? collapsed : false}
          >
            {scenes.map((scene, i) =>
              <Menu.Item key={scene.path}>
                <Link to={scene.path} onClick={this.handleItemClick}>
                  <Icon type={scene.icon} />
                  <span>
                    {scene.name}
                  </span>
                </Link>
              </Menu.Item>
            )}
          </StyledMenu>
        </Flex>
        {ui.isDesktop &&
          <CollapseButton
            onClick={toggleCollapsed}
            icon={collapsed ? 'menu-unfold' : 'menu-fold'}
          >
            {!collapsed ? `Collapse Menu` : ``}
          </CollapseButton>}
      </SidebarContainer>
    );
  }
}

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
  `}
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
  `}
`;

const CollapseButton = styled(Button)`
  height: 50px;
  border-radius: 0;
  box-shadow: none;
  border-top: 1px solid #bfbfbf;
  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
  &:active {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
  &:focus {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
  &:visited {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

const StyledMenu = styled(Menu)`
  .ant-menu-item:hover, .ant-menu-item > a:hover, .ant-menu-item-selected, .ant-menu-item-selected > a {
    color: ${colors.primary};
  }
  .ant-menu-item:after {
    border-right: 3px solid ${colors.primary} !important;
  }
  ${({ isDesktop }) =>
    !isDesktop &&
    `
    .ant-menu-item {
      font-size: 18px;
      height: 52px;
      line-height: 52px;
    } 
  `}
`;

const SidebarContainer = styled(Flex)`
  width: ${({ collapsed, isDesktop }) =>
    isDesktop ? (collapsed ? '64px' : '256px') : '300px;'};
  overflow: hidden;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export default inject('ui', 'app')(withRouter(SideMenu));
