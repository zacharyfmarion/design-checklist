// @flow
// from https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { defaultRoute } from 'scenes';

type Props = {
  /** Component to be rendered by the route */
  component: React.Component<{}>,
  /** Whether or not the component should be rendered (if authed is false the user is instead
   * redirected to the default route of the application, as defined in `scenes/index.js`)
   */
  authed: boolean,
};

/**
 * Route that handles authentication. Basically if `authed` is true it functions
 * like a normal React Route `<Route />` component but if `authed` is false it
 * renders a redirect to the default application path.
 */
const PrivateRoute = ({ component: Component, authed, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: defaultRoute.path,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
