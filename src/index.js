// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import StoreProvider from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { scenes, analyticsId } from 'constants/app';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'components/PrivateRoute';

// Initialize google analytics
ReactGA.initialize(analyticsId, {
  debug: process.env.NODE_ENV !== 'production'
});

const sendPageAnalytics = location => {
  ReactGA.set({ page: location.hash.substring(1) });
  ReactGA.pageview(location.hash.substring(1));
};

const history = createHistory();
sendPageAnalytics(window.location);
history.listen((location, action) => {
  sendPageAnalytics(location);
});

const Checklist = scenes.find(scene => scene.path === '/checklist').component;

const App = inject('app')(
  observer(({ app }) =>
    <Router history={history}>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/checklist" />}
          />
          <Route exact path="/checklist" component={Checklist} />
          {scenes.map(
            scene =>
              scene.path !== '/checklist' &&
              <PrivateRoute
                exact
                path={scene.path}
                component={scene.component}
                authed={!!app.projectName}
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
