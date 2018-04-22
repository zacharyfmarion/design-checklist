# Scenes
> This file describes all the files in the `src/scenes` directory. The top-level components in these directory correspond to application routes. For example the <Statistics /> component is mapped to the "/statistics" route. Note that this mapping happens in `src/scenes/index.js`

## &lt;Checklist /&gt;


## &lt;FilterMenu /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| className | string | false | No Description |


## &lt;ByCategory /&gt;
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| store | ChecklistStore | true | No Description |


## &lt;PercentageCard /&gt;


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

