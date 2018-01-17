// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import StoreProvider from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { scenes } from 'constants/app';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <Router>
        <div>
          {scenes.map(scene =>
            <Route exact path={scene.path} component={scene.component} />
          )}
        </div>
      </Router>
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
