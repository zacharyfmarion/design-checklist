# Scenes
> This file describes all the files in the `src/scenes` directory. The top-level components in these directory correspond to application routes. For example the <Statistics /> component is mapped to the "/statistics" route. Note that this mapping happens in `src/scenes/index.js`

## Checklist


## FilterMenu

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| className | string | false | No Description |


## ByCategory

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| store | ChecklistStore | true | No Description |


## PercentageCard


## ByFile

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |
| ui | UiStore | true | No Description |
| store | ChecklistStore | true | No Description |


## ByFileBarChart

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |


## ByFilePieChart

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
| onExpand | Function | true | No Description |


## ByFileTreemap

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | No Description |
| onExpand | Function | true | No Description |
| canExpand | Function | true | No Description |


## DirectoryIssuesModal

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| file | string | true | No Description |
| issues | Array | true | No Description |
| onClose | Function | true | No Description |


## Duplication

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |


## Graphs

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |


## NotFound


## Statistics

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |


## Welcome

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| history | Object | true | No Description |


## InfoModal

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |


## TutorialModal

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | No Description |
| fromError | boolean | false | No Description |

