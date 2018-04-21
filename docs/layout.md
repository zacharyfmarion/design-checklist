## Folder Structure

```
public/            <-- Where the index.html that will be compiled goes
scripts/           <-- Scripts for serving a dev version of the site and building a prod version
src/               <-- Where all the code that will be compiled goes
  scenes/          <-- Toplevel scenes that are mapped to routes
  components/      <-- Reusable components used throughout different scenes
  stores/          <-- Global mobx stores that can be accessed from any component
  constants/       <-- Constants
  assets/          <-- Images, svgs, and other static assets
  helpers/         <-- Helper functions
  types/           <-- Flow type declarations
  index.js         <-- Entry point into the application
```

## More on the src folder

All components have the following file structure (Assuming this is called MyComponent):

```
MyComponent/
  components/             <-- Folder containing any components specific to MyComponent
  index.js                <-- File that imports and re-exports the component
  MyComponent.js          <-- Component file itself
  MyComponentStore.js     <-- Mobx Store for the component (if necessary)
```

The files are organized in this way so that we can do `import MyComponent from './components/MyComponent` and NOT `import MyComponent from ./components/MyComponent/MyComponent`, which is ugly and redundant. We also don't want to just put the component code in `index.js`, which would solve the import problem but all the component files would be named `index.js` and they would be impossible to work with.

### Root Directory Imports

All folders that are the direct child of the src folder can be referred to absolutely in imports. For example, from any file, we can do:

```js
// import a store
import UiStore from 'stores/UiStore';
// import a scene
import Checklist from 'scenes/Checklist';
// import a constant
import { applicationPrefix } from 'constants/app';
// ..etc
```

### Scenes

Scenes are just components that are rendered as routes in the main `index.js` file. Note that `constants/app.js` exposes an array called `scenes` which is what is used to actually render the routes. If you want to add a scene, first make a new folder in `scenes` and export a component, following the same format as the other scenes. Then add an object to the array in `constants/app.js`. The scene should then be visible in the sidebar of the app once a project is chosen.

### Components

Components is where all reusable components go. Currently some design primitives are defined if the differ significantly from the ones that antd provides - for example the `<Button />` component. Using some webpack magic, components can be declared without using relative imports. So regardless of where you are in the project you can access the Button component with `import Button from 'components/Button'` instead of `import Button from '../../../components/Button'`.

### Stores

Stores are javascript classes that follow Mobx's specification. These stores are instantiated as global singletons and can be accessed from any component using the `@observer` and `@inject` decorators from react-mobx. For example, the AppStore contains global application state, such as whether a user has entered a project and whether the sidebar is collapsed.

### Types

Types would theoretically contain flow type declarations shared between multiple files for the project, but has not really been utilized so far.