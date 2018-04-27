// @flow
import * as React from 'react';
import { Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import scenes from 'scenes';
import AppStore from 'stores/AppStore';

type Props = {
  /** The location object passed in by React Router */
  location: Object,
  /** Global app state */
  app: AppStore,
};

/**
 * Simple footer component that renders links to all of the routes
 * defined in `scenes/index.js`
 */
const Footer = ({ app, location }: Props) => {
  const FooterLink = props => (
    <StyledLink
      active={location.pathname === props.to}
      theme={app.theme}
      {...props}
    >
      {props.children}
    </StyledLink>
  );
  return (
    <FooterLinks theme={app.theme}>
      <Breadcrumb>
        {scenes.map((scene, i) => (
          <Breadcrumb.Item key={i}>
            <FooterLink to={scene.path}>{scene.name}</FooterLink>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </FooterLinks>
  );
};

const StyledLink = styled(Link)`
  ${({ active }) => active && `font-weight: bold;`};
  color: ${({ theme }) => theme.color} !important;
`;

const FooterLinks = styled(Flex)`
  margin: 0 30px;
  padding: 15px 0;
  border-top: 1px solid #d6d6d6;
`;

export default withRouter(inject('app')(observer(Footer)));
