# Scenes
> This file describes all the files in the `src/scenes` directory. The top-level components in these directory correspond to application routes. For example the <Statistics /> component is mapped to the "/statistics" route. Note that this mapping happens in `src/scenes/index.js`

## &lt;Checklist /&gt;
The default scene of an authed route. It essentially displays two
`<ModeSelect />` links (defined in `Checklist.js`) and allows the
user to either view their issues by file or by category. Depending
on which the user selects it renders a route with the `<ByFile />`
or `<ByCategory />` component

### Methods
#### `renderHeaderActions()`

Render buttons that will appear in the header on this page. Note that these buttons will also appear in the routes rendered on this page, so this is shared between `<ByFile />` and `<ByCategory />`.

---


## &lt;FilterMenu /&gt;
Component that allows users to filter issues based on severity level. It
is rendered as a header action in the `<Checklist />` component.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |
| className | string | false | No Description |

### Methods
#### `renderMenu()`

Render the menu that will be displayed when the user selects the filter menu button. The menu just consists of a series of `<Switch />` components noting whether or not the severity level is currently active

---


## &lt;ByCategory /&gt;
Component that displays the issues of a repository organized into a set
of defined categories (such as 'Code Smells'). This component is a good
example of the ideal level of component abtraction that should occur in
a scene. If it gets too long, components should be split out and passed
the data that they need.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |
| store | ChecklistStore | true | Checklist store which handles most of the actions and state ofthe component. It is passed down from `<Checklist />` (whereit is instantiated) so that both `<ByCategory />` and `<ByFile />`have access to the same store. |

### Methods
#### `renderLoading()`

Render a loading indicator

#### `changeCategory(key)`

Changes the current category of issues to be rendered. Really just a wrapper for store.changeCategory(), with the additional functionality of saving a google anayltics event. This is a good example of how to handle event creation.

| Name | Type | Description |
| --- | --- | --- |
| key | String | The key of the category in the errors object that gets returned by the API |

#### `renderErrors()`

Function that actually handles the rendering of the content once the page has loaded.

---


## &lt;PercentageCard /&gt;
Component to display how well the user is doing for a given category.
Note that originally it displayed the percentage directly but now it
displays a series of 5 stars to display how well the repository is doing
for each category.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| category | string | true | The category string, e.g. "Code Smells" |
| percent | number | true | Number representing how well the user is doing for the category |
| active | boolean | true | Whether or not the category is currently selected |
| onClick | Function | true | Click handler for the function, which should change the active prop to true |
| numIssues | number | true | Number of issues, to be displayed in the top right. Note thatthis number is updated when a filter is applied from the`<FilterMenu />` component |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |

---


## &lt;ByFile /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |
| ui | UiStore | true | No Description |
| store | ChecklistStore | true | No Description |

### Methods
#### `renderLoading()`



#### `renderHelp()`



#### `renderCollapse(data)`



| Name | Type | Description |
| --- | --- | --- |
| data | Object | No description |

#### `renderDirectories()`



#### `renderHeaderActions()`



#### `renderChart()`



#### `handleGraphTypeChange(e)`



| Name | Type | Description |
| --- | --- | --- |
| e | Event | No description |

---


## &lt;ByFileBarChart /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
### Type Definitions
#### data
```js
Array<Object>```
### Methods
#### `handleClick(data, index)`



| Name | Type | Description |
| --- | --- | --- |
| data | No type | No description |
| index | No type | No description |

---


## &lt;ByFilePieChart /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
| onExpand | Function | true | No Description |
### Type Definitions
#### data
```js
Array<Object>```
### Methods
#### `handleClick(data, index)`



| Name | Type | Description |
| --- | --- | --- |
| data | No type | No description |
| index | No type | No description |

---


## &lt;ByFileTreemap /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
| onExpand | Function | true | No Description |
| canExpand | Function | true | No Description |
### Type Definitions
#### data
```js
Array<Object>```
---


## &lt;DirectoryIssuesModal /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| file | string | true | No Description |
| issues | Array | true | No Description |
| onClose | Function | true | No Description |
### Type Definitions
#### issues
```js
Array<Object>```
---


## &lt;Duplication /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |

### Methods
#### `renderHeaderActions()`



#### `renderDuplications()`



---


## &lt;Graphs /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |
| ui | UiStore | true | No Description |

### Methods
#### `getAuthors(entry)`



| Name | Type | Description |
| --- | --- | --- |
| entry | No type | No description |

#### `renderNormalizedChart()`



#### `renderStatsByDateChart()`



#### `renderGraph()`



#### `renderHeaderActions()`



---


## &lt;NotFound /&gt;

---


## &lt;Statistics /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |

### Methods
#### `renderStatistics()`



---


## &lt;Welcome /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| history | Object | true | No Description |

### Methods
#### `confirmProject()`



---


## &lt;InfoModal /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |

---


## &lt;TutorialModal /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |
| fromError | boolean | false | No Description |

---

