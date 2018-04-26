import * as React from 'react';
import ReactPlayground from 'component-playground';
import { Provider } from 'mobx-react';
import Layout from 'components/Layout';
import Button, { example } from 'components/Button';

/**
 * This is a place to experiment with anything. Note that this route is only
 * added in dev mode so you don't have to worry about it showing up in prod
 */
class Playground extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <ReactPlayground
          codeText={example}
          scope={{ React, Provider, Button }}
        />
      </Layout>
    );
  }
}

export default Playground;
