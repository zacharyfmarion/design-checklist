// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link, type RouterHistory } from 'react-router-dom';
import { Flex } from 'reflexbox';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import styled from 'styled-components';
import { shadow } from 'constants/styles';
import { title, shortTitle } from 'constants/app';
import logo from 'assets/logo.png';
import Button from 'components/Button';

// local components
import Settings from '../Settings';

type Props = {
  history: RouterHistory,
  location: Object,
  sidebarCollapsed: boolean,
  sidebarVisible: boolean,
  toggleSidebar: Function,
  subheader?: React.Node,
  onTabClick?: Function,
  actions?: React.Node,
  app: AppStore,
  ui: UiStore
};

type State = {
  topAligned: boolean
};

@observer
class Header extends React.Component<Props> {
  state: State;
  header: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
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
    const {
      ui,
      app,
      sidebarCollapsed,
      toggleSidebar,
      sidebarVisible
    } = this.props;
    return (
      <HeaderWrapper
        auto
        justify="space-between"
        topAligned={this.state.topAligned}
        collapsed={sidebarCollapsed}
        isDesktop={ui.isDesktop}
        sidebarVisible={sidebarVisible}
        primary={app.primaryColor}
      >
        <Flex align="center">
          {ui.isDesktop || !sidebarVisible
            ? <StyledLink to="/">
                <MFSLogo src={logo} />
              </StyledLink>
            : <MenuButtonContainer onClick={toggleSidebar}>
                <MenuButton class="box-shadow-menu" />
              </MenuButtonContainer>}
          <Title>
            {ui.isMobile ? shortTitle : title}
          </Title>
        </Flex>
        <Flex align="center" justify="center">
          {this.props.actions}
          {app.projectConfirmed &&
            <Flex align="center">
              <ClearButton
                primary
                onClick={app.clearProject}
                icon="rollback"
                action="clicked new project"
              >
                {!ui.isMobile && `New Project`}
              </ClearButton>
              <VerticalBar />
              <Settings />
            </Flex>}
        </Flex>
      </HeaderWrapper>
    );
  }
}

const VerticalBar = styled.div`
  height: 30px;
  border-left: 1px solid #fff;
  margin: 0 8px;
`;

const ClearButton = styled(Button)`
  margin-left: 8px;
`;

const MenuButtonContainer = styled(Flex)`
  height: 100%;
  padding-right: 5px;
`;

const MenuButton = styled.span`
  position: relative;
  padding-left: 1.25em;
  align-self: center;
  font-size: 25px;
  cursor: pointer;
  top: -8px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 0.1em;
    background: black;
    box-shadow: 0 0.25em 0 0 black, 0 0.5em 0 0 black;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2em;
  text-transform: uppercase;
`;

const HeaderWrapper = styled(Flex)`
  position: fixed;
  left: ${({ sidebarVisible, collapsed, isDesktop }) =>
    sidebarVisible && isDesktop ? (collapsed ? '64px' : '256px') : '0'};
  right: 0;
  background: ${({ primary }) => primary};
  color: black;
  padding: 0 30px;
  height: 75px;
  z-index: 2;
  ${({ topAligned }) =>
    !topAligned &&
    `
    box-shadow: ${shadow} !important;
  `}
  transition: box-shadow 0.3s ease-in-out;
`;

const MFSLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export { Header };
export default inject('ui', 'app')(withRouter(Header));
