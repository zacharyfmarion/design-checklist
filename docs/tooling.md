## ES6

This project uses babel to transpile es6 code split into files into a single js bundle that is optimized for production. Some proposed features of the es7 spec, such as async-await and decorators, are also available, and used throughout the repository.

## Flow

This project uses [Flow](https://flow.org/) types for static analysis purposes. For example, a typical component will look like this:

```js
// ExampleComponent.js
// @flow
import * as React from 'react';

type Props = {
  title: string,
  size: number,
  data: Array<number>
};

type State = {
  active: boolean,
}

class ExampleComponent extends React.Component<Props, State> {
 // ... component details
}

export default ExampleComponent;
```

You can run the flow checker with `yarn flow`.

## Eslint

Linting for the project is integrated with eslint, and should show up in the console if you run `yarn start`. You can manually lint with `yarn lint`, which runs `eslint --fix src` (fixing any easily rectified issues and displaying the rest).

## Prettier

[Prettier](https://prettier.io) is used for code formatting purposes. There is a git pre-commit hook that runs prettier on all the files to make sure that they are consistently formatted. It can also be manually run on all files with `yarn format`. Personally I also use a prettier plugin for my editor (VSCode) that runs on save. The configuration settings for prettier are found in the file `.prettierrc`. Note that you can bypass the precommit hooks with `git commit --no-verify -m "commit message"`.

## Source Map Explorer

You can run `yarn analyze` to get a visualization of your bundle and a better idea of how much certain packages are affecting the applications performance. Currently it has not been optimized very much, but in the future code splitting and other perf techniques might be a good idea. You can run it with `yarn analyze`, but note that you need to run `yarn build` first to generate a production build. One dependency that really should go is `brace`, which provides a code editor that is only used in the `TutorialModal` but takes up 15% of the bundle.

## Documentation

Documentation is generated using [Docsify](https://docsify.js.org/#/). Basically you just edit the static markdown files in the `docs/` folder of the repo and it is deployed through github pages. Documentation for individual React components is also generated using [React-docgen](https://github.com/reactjs/react-docgen). You can run the command `yarn docgen` in order to document all of the components. The file `scripts/docs.js` handles this process.