## Overview

Analytics are integrated with Google Analytics through the [React-ga package](https://github.com/react-ga/react-ga). Note that the package is wrapped in `helpers/analytics.js` to stub the used methods if you are developing. This prevents statistics being skewed by any student's repositories that you test on.

## Tracking pages

All react router routes are automatically tracked and sent to Google Analytics. This is done in `index.js`.

## Adding an event

Events can be added to track specific actions within the application. Because there are currently no users to tie the event to it's currently a bit difficult to get useful insights...in the future they should really always be tied to whatever the current project is:

```js
import GoogleAnalytics from 'helpers/analytics';

GoogleAnalytics.event({
  category: 'Interaction',
  action: 'user clicked on x',
  label: 'label',
  value: 12,
});
```

## Button events

Clicks to the `<Button />` component are automatically sent to Google Analytics provided the component is supplied at the very least an `action` prop. You can also supply a label and value.