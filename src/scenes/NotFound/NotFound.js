// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Layout from 'components/Layout';

const NotFound = ({ app }) => (
  <Layout showSidebar={!!app.projectName}>
    <h1>Page not found :(</h1>
  </Layout>
);

export default inject('app')(observer(NotFound));
