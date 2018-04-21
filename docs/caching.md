## How to Cache Data

Some application information is cached in `sessionStorage` and `localStorage`. In order to avoid conflicts with other applications and schema change issues, each key is prefixed with a variable called `applicationPrefix` found in `constants/app.js`. This variable itself contains the application's version. Every time there is a change to the schema of any cached data, the `VERSION` variable in `constants/app.js` should be updated, to ensure that no old cached data in the incorrect format gets used by the application. The caching is used in the following way, assuming the key was `"test"`:

```js
import { applicationPrefix } from 'constants/app';

// setting
sessionStorage.setItem(
  `${applicationPrefix}_test`,
  JSON.stringify({
    data: "this is a test",
  }),
);

// getting
const cachedTest = sessionStorage.getItem(`${applicationPrefix}_test`);
if (cachedTest) {
  const { data } = JSON.parse(cached);
  console.log(data); // "this is a test"
}
```

Note that if you add more caching, make sure to update the `clearProject()` function in `AppStore.js` so that it does not bleed into other project sessions.