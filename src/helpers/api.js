// @flow
import { GITLAB_GROUP } from 'constants/app';

// Function to help with making calls to the api - basically wraps fetch with some
// API specific things
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://compsci308.colab.duke.edu:5000/api'
    : 'http://localhost:5000/api';

// https://stackoverflow.com/questions/111529/how-to-create-query-parameters-in-javascript
const encodeParams = params => {
  return Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
};

export const getRequest = (
  url: string,
  params: Object = {},
  options: Object = {},
): Promise<*> => {
  const opts = options || {};
  const base = opts.externalBase || baseUrl;
  const path =
    base + url + '?' + encodeParams({ ...params, group: GITLAB_GROUP });
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'GET',
      headers: opts.additionalHeaders || {},
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export const postRequest = (
  url: string,
  params: Object = {},
  options: Object = {},
): Promise<*> => {
  const opts = options || {};
  const base = opts.externalBase || baseUrl;
  const path = base + url;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...opts.additionalHeaders,
      },
      body: encodeParams({ ...params, group: GITLAB_GROUP }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
