// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import StoreProvider, { user } from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { scenes } from 'constants/app';
import Login from 'scenes/Login';
import PrivateRoute from 'components/PrivateRoute';

const App = inject('user')(
  observer(() =>
    <Router>
      <div>
        <Route exact path="/login" component={Login} />
        {scenes.map(scene =>
          <PrivateRoute
            exact
            path={scene.path}
            component={scene.component}
            authed={user.loggedIn}
          />
        )}
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
