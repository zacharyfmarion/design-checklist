import { action, observable } from 'mobx';
import { postRequest } from '../helpers/api';
import { sessionStoragePrefix } from 'constants/app';

const GITLAB_HOST = 'https://coursework.cs.duke.edu';
const CLIENT_ID =
  'b27cc3f64dc837755a2aa88993e70c89c9d558d20168703cb2aa7c79946cc94f';
const REDIRECT_URI = 'http://localhost:3000/login';
const OAUTH_URL = `${GITLAB_HOST}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

class UserStore {
  @observable loggedIn: boolean = true;
  @observable code: string;

  @action
  setLoggedIn = async (history: Object, code: string): Promise<*> => {
    try {
      this.loggedIn = true;
      this.code = code;
      const { access_token, refresh_token } = await this.requestToken();
      window.auth = {
        accessToken: access_token,
        refreshToken: refresh_token
      };
      sessionStorage.setItem(
        `${sessionStoragePrefix}_auth`,
        JSON.stringify({
          accessToken: access_token,
          refreshToken: refresh_token
        })
      );
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  @action
  login = () => {
    window.location = OAUTH_URL;
  };

  @action
  requestToken = (): Promise<*> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest('/auth', {
          code: this.code
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  logout = () => {
    sessionStorage.setItem(`${sessionStoragePrefix}_auth`, '');
    window.auth = undefined;
    this.loggedIn = false;
  };

  constructor() {
    const auth = sessionStorage.getItem(`${sessionStoragePrefix}_auth`);
    if (auth) {
      const { accessToken, refreshToken } = JSON.parse(auth);
      window.auth = { accessToken, refreshToken };
    }
  }
}

export default UserStore;
