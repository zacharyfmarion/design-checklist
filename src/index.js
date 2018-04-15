// @flow

/**
 * The entry point into the application. This mostly just renders a bunch of HOCS
 * and react router routes that each show a component in the scene directory. This
 * file also sets up the analytics integration with Google Analytics.
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { inject, observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import GoogleAnalytics from 'helpers/analytics';
import StoreProvider from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { analyticsId } from 'constants/app';
import scenes from 'scenes';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import Checklist from 'scenes/Checklist';

// Initialize google analytics
GoogleAnalytics.initialize(analyticsId, {});

// Send page analytics on the initial page (Checklist) since we cannot listen
// for the change like we do for all subsequent pages
const sendPageAnalytics = location => {
  GoogleAnalytics.set({ page: location.hash.substring(1) });
  GoogleAnalytics.pageview(location.hash.substring(1));
};

// Listen to the history object and when the user navigates to a new
// url send analytics about that URL
const history = createHistory();
sendPageAnalytics(window.location);
history.listen((location, action) => {
  sendPageAnalytics(location);
});

// Render an component wrapped in the app store so that we can ensure a user
// cannot go to any scene but Checklist if they have not entered a project
// name on the first page. Note that the prop is called 'authed' because this
// logic can be extended to handle user authentication
const App = inject('app')(
  observer(({ app }) => (
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
            (scene, i) =>
              scene.path !== '/checklist' && (
                <PrivateRoute
                  exact
                  path={scene.path}
                  component={scene.component}
                  authed={!!app.projectName}
                  key={i}
                />
              ),
          )}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  )),
);

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root'),
);
// registerServiceWorker();
