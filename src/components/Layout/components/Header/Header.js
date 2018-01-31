// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link, type RouterHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { Flex } from 'reflexbox';
import UiStore from 'stores/UiStore';
import styled from 'styled-components';
import { title, shortTitle, scenes } from 'constants/app';
import logo from 'assets/logo.png';

type Props = {
  history: RouterHistory,
  location: Object,
  subheader?: React.Node,
  onTabClick?: Function,
  ui: UiStore
};

type State = {
  menuOpen: boolean,
  topAligned: boolean
};

@observer
class Header extends React.Component<Props> {
  state: State;
  header: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false,
      topAligned: true // whether we are at the top of the page
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // $FlowIssue
    this.setState({
      topAligned: window.scrollY === 0
    });
  };

  closeMenu = (): void => {
    // $FlowIssue
    this.setState({
      menuOpen: false
    });
  };

  toggleMenu = (): void => {
    // $FlowIssue
    this.setState({
      menuOpen: !this.state.menuOpen
    });
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

  render() {
    const { subheader, ui } = this.props;
    const menu = (
      <StyledMenu
        selectedKeys={[this.getBasePath()]}
        mode="horizontal"
        theme="dark"
        mobile={ui.isMobile}
      >
        {scenes.map(scene => {
          const handleClick = () =>
            this.props.onTabClick && this.props.onTabClick(scene.name);
          return (
            <HeaderItem key={scene.path} mobile={ui.isMobile}>
              <HeaderLink to={scene.path} onClick={handleClick}>
                <Icon type={scene.icon} />
                {scene.name}
              </HeaderLink>
            </HeaderItem>
          );
        })}
      </StyledMenu>
    );
    return (
      <HeaderWrapper justify="space-between" topAligned={this.state.topAligned}>
        <Flex align="center">
          <StyledLink to="/" onClick={this.closeMenu}>
            <MFSLogo src={logo} />
            <Title>
              {ui.isMobile ? shortTitle : title}
            </Title>
          </StyledLink>
        </Flex>
        {ui.isMobile
          ? <MenuButtonContainer onClick={this.toggleMenu}>
              <MenuButton class="box-shadow-menu" />
            </MenuButtonContainer>
          : menu}
        {ui.isMobile && this.state.menuOpen && menu}
        {subheader &&
          <SubHeader auto>
            {subheader}
          </SubHeader>}
      </HeaderWrapper>
    );
  }
}

const HeaderLink = styled(Link)`
  font-size: 14px;
  text-transform: uppercase;
`;

const MenuButtonContainer = styled(Flex)`
  height: 100%;
`;

const MenuButton = styled.a`
  position: relative;
  padding-left: 1.25em;
  align-self: center;
  font-size: 25px;
  top: -8px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 0.1em;
    background: white;
    box-shadow: 0 0.25em 0 0 white, 0 0.5em 0 0 white;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  height: 100%;
  display: flex;
  align-items: center;
  .ant-menu-item {
    height: 100%;
    align-items: center;
  }
  .ant-menu-item.ant-menu-item-selected {
    background: #baf4bc;
    ${({ mobile }) =>
      !mobile &&
      `
      border-radius: 5px;
      height: 50px;
    `}
    a {
      color: black;
    }
  }
  ${({ mobile }) =>
    mobile &&
    `
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    z-index: 100;
    top: 75px; 
    left: 0;
    border-top: 1px solid #525252;
    .ant-menu-item {
      width: 100%;
      border-radius: 0;
      height: 70px !important;
      background: #25b47d;
    }
  `}
  border: none;
  background: none;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Title = styled.h2`
  color: black;
  font-size: 2em;
  text-transform: uppercase;
`;

const HeaderWrapper = styled(Flex)`
  position: fixed;
  width: 100%;
  background: #25b47c;
  color: black;
  padding: 0 30px;
  height: 75px;
  z-index: 2;
  ${({ topAligned }) =>
    !topAligned &&
    `
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07) !important;
  `}
  transition: box-shadow 0.3s ease-in-out;
`;

const MFSLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const SubHeader = styled(Flex)`
  background: #404040;
  padding: 10px 50px;
  color: #fff;
`;

const HeaderItem = styled(Menu.Item)`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  height: 50px;
  ${({ mobile }) =>
    mobile
      ? `
      justify-content: flex-start;
    `
      : `
    justify-content: center;
    align-items: center;
  `}

  i.anticon {
    padding-right: 10px;
  }
`;

export { Header };
export default inject('ui')(withRouter(Header));
