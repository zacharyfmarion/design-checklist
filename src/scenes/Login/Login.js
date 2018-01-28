import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import Button from 'components/Button';
import Layout from 'components/Layout';
import UserStore from 'stores/UserStore';

type Props = {
  user: UserStore,
  history: Object
};

@observer
class Login extends React.Component<Props> {
  componentDidMount() {
    // check whether we have been redirected from oauth
    const { history, user } = this.props;
    const { code } = qs.parse(window.location.search);
    if (code) {
      user.setLoggedIn(history, code);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <Layout>
        <Button primary onClick={user.login}>
          Login with Gitlab
        </Button>
      </Layout>
    );
  }
}

export default inject('user')(withRouter(Login));
