// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { inject, observer } from 'mobx-react';
import StoreProvider, { user } from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { scenes } from 'constants/app';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'components/PrivateRoute';

const App = inject('user')(
  observer(() =>
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/checklist" />}
          />
          {scenes.map(scene =>
            <PrivateRoute
              exact
              path={scene.path}
              component={scene.component}
              authed={user.loggedIn}
            />
          )}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
);

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
