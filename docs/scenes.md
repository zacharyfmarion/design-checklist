# Scenes
> This file describes all the files in the `src/scenes` directory. The top-level components in these directory correspond to application routes. For example the <Statistics /> component is mapped to the "/statistics" route. Note that this mapping happens in `src/scenes/index.js`

## &lt;Checklist /&gt;
The default scene of an authed route. It essentially displays two
`<ModeSelect />` links (defined in `Checklist.js`) and allows the
user to either view their issues by file or by category. Depending
on which the user selects it renders a route with the `<ByFile />`
or `<ByCategory />` component


## &lt;FilterMenu /&gt;
Component that allows users to filter issues based on severity level. It
is rendered as a header action in the `<Checklist />` component.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |
| className | string | false | No Description |


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


## &lt;ByFile /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |
| ui | UiStore | true | No Description |
| store | ChecklistStore | true | No Description |


## &lt;ByFileBarChart /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
### Type Definitions
#### data
```js
Array<Object>```

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

## &lt;Duplication /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |


## &lt;Graphs /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |


## &lt;NotFound /&gt;


## &lt;Statistics /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |


## &lt;Welcome /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| history | Object | true | No Description |


## &lt;InfoModal /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |


## &lt;TutorialModal /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |
| fromError | boolean | false | No Description |

