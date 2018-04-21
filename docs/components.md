# Components
> This file describes all the files in the `src/components` directory. These files are reusable components and are mostly design primitives, such as `<Button />` and `<Input />`.

## Button
A simple button component build on top of the antd component
with some styling additions

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClick | Function | true | Click handler for the button. If action, label, or value aresupplied as props clicking the button will also send an eventto Google Analytics |
| action | string | false | Action name for a Google Analytics event. If present an analyticsevent will be sent on click |
| label | string | false | Label for a Google Analytics event. If present an analytics eventwill be sent on click |
| value | string | false | Value for a Google Analytics event. If present an analytics eventwill be sent on click |
| flat | boolean | false | Whether or not a drop shadow should be added to the button |
| children | ReactNode | true | Child - should just be a text field |
| app | AppStore | true | App store for access to the app.primaryColor global property |


## CodeIssue

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| shadowed | boolean | true | No Description |
| className | string | false | No Description |
| ui | UiStore | true | No Description |
| error | signature | true | No Description |


## ComingSoon


## ErrorList

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| errors | Object | true | No Description |
| category | string | true | No Description |


## ErrorMessage

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | true | No Description |
| message | string | true | No Description |


## Feedback
A button that when clicked opens the users email client and provides
them with a template for sending feedback on the application


## Footer

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| location | Object | true | No Description |


## Settings

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | No Description |


## SideMenu

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| collapsed | boolean | true | No Description |
| toggleCollapsed | Function | true | No Description |
| title | string | true | No Description |
| ui | UiStore | true | No Description |
| app | AppStore | true | No Description |
| location | Object | true | No Description |


## ModalHeader

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | true | No Description |
| onClose | Function | true | No Description |
| app | AppStore | true | No Description |


## Panel

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| children | ReactNode | true | No Description |
| fluid | string | true | No Description |


## PrivateRoute

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| component | ReactComponent | true | No Description |
| authed | boolean | true | No Description |


## Spin


## SuccessMessage

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| message | string | true | No Description |


## Switch

