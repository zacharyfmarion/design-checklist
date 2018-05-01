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

## Flexbox

This app uses [reflexbox](https://github.com/jxnblk/reflexbox), which is a simple React flexbox grid system. Really the only component that is used is the `<Flex />` component, which is essentially a wrapper on a regular div element that provides a lot of useful props that are shortcuts for flexbox css properties. For example, `<Flex column></Flex>` will basically display a div with the css attributes `display: flex` and `flex-direction: column`.

## Responsivity

Everything in the site should be designed to be responsive. From analytics it looks like <5% of traffic is on mobile but it is still a good practice. `UiStore.js` provides a series of computed properties (`isDesktop`, `isTablet`, `isMobile`) that help determine how to display the page. For example, if you wanted to display two horizontal containers on a desktop view but make them vertical on tablet and mobile, you could do something like this (note that we also change the background color on mobile to show how this can be used with `styled-components`):


```js
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import UiStore from 'stores/UiStore';

type Props = {
  ui: UiStore,
};

const ResponsiveExample = ({ ui }: Props) => {
  return (
    <Container column={!ui.isDesktop} isMobile={ui.isMobile}>
      <Flex auto>Container 1</Flex> 
      <Flex auto>Container 2</Flex> 
    </Container>
  );
};

const Container = styled(Flex)`
  background: ${({ isMobile }) => isMobile ? `red` : `yellow`};
`;

// Need to inject the UiStore in order to get the computed properties
export default inject('ui')(observer(ResponsiveExample));

```

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