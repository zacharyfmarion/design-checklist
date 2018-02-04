import * as React from 'react';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import ComingSoon from 'components/ComingSoon';

type Props = {};

class Statistics extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <Panel>
          <ComingSoon />
        </Panel>
      </Layout>
    );
  }
}

export default Statistics;
