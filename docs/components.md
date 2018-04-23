# Components
> This file describes all the files in the `src/components` directory. These files are reusable components and are mostly design primitives, such as `<Button />` and `<Input />`.

## &lt;Button /&gt;
A simple button component build on top of the antd component
with some styling additions
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClick | Function | true | Click handler for the button. If action, label, or value aresupplied as props clicking the button will also send an eventto Google Analytics |
| action | string | false | Action name for a Google Analytics event. If present an analyticsevent will be sent on click |
| label | string | false | Label for a Google Analytics event. If present an analytics eventwill be sent on click |
| value | string | false | Value for a Google Analytics event. If present an analytics eventwill be sent on click |
| flat | boolean | false | Whether or not a drop shadow should be added to the button |
| children | ReactNode | true | Child - should just be a text field |
| app | AppStore | true | App store for access to the app.primaryColor global property |

---


## &lt;CodeIssue /&gt;
Component that handles the rendering of a sonarqube issue. It displays a
collapsable panel with the code described in the error prop. This prop can
contain either an error attribute or a duplications attribute, and depending
on which it contains a different code view is rendered. If the duplication
property is present a side-by-side view of the code is rendered, turning into
a list of tabs if there are too many duplicated blocks or the width of the
screen is too small. Currently there is a log of messy logic in this file which
ideally would be abstracted away into separate mobx stores / components.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| shadowed | boolean | true | Whether or not to include a drop shadow |
| ui | UiStore | true | Ui store for responsivity |
| error | signature | true | Error object |
| className | string | false | No Description |
### Type Definitions
#### error
```js
{
  duplications?: Array<Array<Object>>,
  code?: Array<Object>,
  error?: Array<Object>,
  message: string,
  severity: string,
  path: string,
}```
### Methods
#### `getLongestCodeLength(duplication)`



| Name | Type | Description |
| --- | --- | --- |
| duplication | Array | No description |

#### `getLastTabIndex(line)`



| Name | Type | Description |
| --- | --- | --- |
| line | string | No description |

#### `getDupLeastWhitespace(code)`



| Name | Type | Description |
| --- | --- | --- |
| code | Array | No description |

#### `getLeastWhitespace(code)`



| Name | Type | Description |
| --- | --- | --- |
| code | Array | No description |

#### `getMaxLineNumbers(duplications)`



| Name | Type | Description |
| --- | --- | --- |
| duplications | No type | No description |

#### `processDuplications(duplications)`

Change the duplications from [[], []] to pairs of lines

| Name | Type | Description |
| --- | --- | --- |
| duplications | Array | No description |

#### `processDuplication(duplication)`



| Name | Type | Description |
| --- | --- | --- |
| duplication | No type | No description |

#### `stripFilename(path)`



| Name | Type | Description |
| --- | --- | --- |
| path | string | No description |

#### `stripFilenameMobile(path)`



| Name | Type | Description |
| --- | --- | --- |
| path | string | No description |

#### `renderDuplication(dup, maxLines, dupNumber)`



| Name | Type | Description |
| --- | --- | --- |
| dup | No type | No description |
| maxLines | No type | No description |
| dupNumber | No type | No description |

#### `renderMobileDuplication(fileIndex, maxLine)`



| Name | Type | Description |
| --- | --- | --- |
| fileIndex | number | No description |
| maxLine | number | No description |

#### `renderMobileDuplications(maxLines)`



| Name | Type | Description |
| --- | --- | --- |
| maxLines | Array | No description |

#### `renderDuplications()`



#### `renderCode()`



---


## &lt;ErrorList /&gt;
A component for rendering a list of errors, most notably used in `<ByCategory />`.
Note that currently the data format is tightly coupled with the API response
format, which is not really ideal for a supposedly reusable component
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| errors | union | true | A list of errors that can either by an `Object` or an `Array`. If it is anobject then the keys are the category, and if it an Array then there areno categories. Either way the format of each individual error is the same |
| category | string | true | Category that is currently active. Note that this is tightly coupled withthe `<ByCategory />` view and needs to be refactored |
### Type Definitions
#### errors
```js
Object | Array<Object>```
### Methods
#### `renderSubcategories(subcategory, i)`



| Name | Type | Description |
| --- | --- | --- |
| subcategory | string | No description |
| i | number | No description |

#### `renderCategory()`



#### `handleCollapseChange(activeColumns)`



| Name | Type | Description |
| --- | --- | --- |
| activeColumns | Array | No description |

---


## &lt;ErrorMessage /&gt;
A small component that renders an svg error as well as a title and message
corresponding to the error
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | true | The title of the error |
| message | string | true | The message to be displayed underneath the error |

---


## &lt;Feedback /&gt;
A button that when clicked opens the users email client and provides
them with a template for sending feedback on the application

### Methods
#### `handleClick()`



---


## &lt;Footer /&gt;
Simple footer component that renders links to all of the routes
defined in `scenes/index.js`
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| location | Object | true | The location object passed in by React Router |

---


## &lt;Settings /&gt;
Dropdown that is rendered in the `<Header />` which contains global
settings that the user can change. Currently this only consists of
the configuration of the applications current theme. Note that this
is cached in localstorage so that the user does not have to set the
theme each time they reload the page.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | Injected store so that we can access global state |

### Methods
#### `handleCustomHexChange(value)`



| Name | Type | Description |
| --- | --- | --- |
| value | string | No description |

#### `renderContent()`



---


## &lt;SideMenu /&gt;
Component that renders the sidebar for the application.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| collapsed | boolean | true | Whether or not the sidebar is collapsed to only show icons |
| toggleCollapsed | Function | true | Function to toggle whether the sidebar is collapsed |
| title | string | true | Sidebar title |
| ui | UiStore | true | Global store inject to handle responsivity |
| app | AppStore | true | Global store inject to handle theme |
| location | Object | true | Object provided by React router to determine the current active route |

### Methods
#### `getBasePath()`



#### `handleItemClick()`



---


## &lt;ModalHeader /&gt;
Header for the modal component. Note that this is actually cloned
in `<Modal />` and passed the onClose prop. This is a good example of
handling React Children in case it needs to be done for other components
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | true | Header title |
| onClose | Function | true | Function that is called when the modal is closed |
| app | AppStore | true | Global store inject to handle theme |

---


## &lt;Panel /&gt;
Component for rendering a panel on a page. This is used in most scenes
as the background for whatever content appears on the page
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| children | ReactNode | true | Children to be displayed in the panel |
| fluid | string | true | Whether or not to have a background color and large margin |

---


## &lt;PrivateRoute /&gt;
Route that handles authentication. Basically if `authed` is true it functions
like a normal React Route `<Route />` component but if `authed` is false it
renders a redirect to the default application path.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| component | ReactComponent | true | Component to be rendered by the route |
| authed | boolean | true | Whether or not the component should be rendered (if authed is false the user is insteadredirected to the default route of the application, as defined in `scenes/index.js`) |

---


## &lt;Spin /&gt;
A loading indicator used throughout the application, usually when waining for
an API call to complete.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | Global store inject to handle theme |
| className | string | true | No Description |

---


## &lt;SuccessMessage /&gt;
Component that renders an svg indicating success, along with a message
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| message | string | true | Message to be displayed below the svg |

---


## &lt;Switch /&gt;
Themed wrapper to render an antd Switch component
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | Global store inject to handle theme |

---

