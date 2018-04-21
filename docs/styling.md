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

It will also work with any custom component that passes in a className. For an example of this check out the <Input /> component. For more information check out their excellent documentation, or [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) documentation about tagged template literals