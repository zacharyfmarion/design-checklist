# Styling

## Styled Components

This repository uses [styled-components](https://www.styled-components.com/) for css styling, which is a css-in-js solution that combines the best of both worlds by still using classes and stylesheets as opposed to actually biding to the style attribute of an element. They provide component primitives for all valid html elements, so if you wanted to style a div you could do:

```js
import styled from 'styled-components';

const Example = () => (
  <FancyDiv>Hello</FancyDiv>
);

const FancyDiv = styled.div`
  color: red;
`

export default Example;
```

It will also work with any custom component that passes in a className. For an example of this check out the `<Input />` component. For more information check out their excellent documentation, or [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) documentation about tagged template literals.

## Theming

Because we are using css-in-js theming is quite easy to do. For example, if we wanted to style the above div, but instead with the application's current primary color, we could so something like this:

```js
import styled from 'styled-components';
// Mobx decorators so that React knows to update the render method when
// a mobx store property changes
import { inject, observer } from 'mobx-react';
// Mobx store that is instantiated as a singleton and injected into
// the component. Used here just for a flow type
import AppStore from 'stores/AppStore';

// Always define prop types
type Props = {
  app: AppStore,
};

const Example = ({app}: Props) => (
  <FancyDiv primaryColor={app.primaryColor}>Hello</FancyDiv>
);

// Using tagged template literals we can access props of the
// component that we pass in!!!
const FancyDiv = styled.div`
  background: ${({primaryColor}) => primaryColor};
`;

// We inject the app store into the component
export default inject('app')(observer(Example));
```

Make sure that whatever new component / scene is added, it looks good and functions properly under all theme / primaryColor choices!!!

### Primary color

The primary color of the application can be changed by the user. The file `constants/styles.js` defines an array called `primaryColors` which contains a predefined set of colors. The `<Settings />` component allows the user to select one of these, which is stored in the global app store defined in `stores/AppStore.js` under the property `primaryColor`.


### Theme

Similar to the primary color, there is a `theme` object exported from `constants/styles.js`. Currently there are dark and light themes, but more can easily be added. The user can also change the theme from the global store defined in `stores/AppStore.js`, under the property `themeName`. There is also a computed property `theme` on that store which provides the actual theme Object.