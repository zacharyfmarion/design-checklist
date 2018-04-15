// @flow
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { defaultRoute } from 'scenes';

type Props = {
  component: React.Component<{}>,
  authed: boolean,
};

// from https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
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
