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
| key | String | The key of the category in the issues object that gets returned by the API |

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
Component that displays the issues of a repository organized by the file
structure of the repository itself. The top of the page displays a series
of graphs visualizing the number of issues for a given package. The bottom
displays a nested list of Collapse Panels containing the issues in the
files contained in the denoted folder
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | App store for global application state |
| app | AppStore | true | Ui store for responsivity |
| store | ChecklistStore | true | Checklist store which handles most of the actions and state ofthe component. It is passed down from `<Checklist />` (whereit is instantiated) so that both `<ByCategory />` and `<ByFile />`have access to the same store. |

### Methods
#### `renderLoading()`

Render a loading indicator

#### `renderHelp()`

Renders a message intended to help the user understand how the graphs work on the page. This is displayed in a popover when the user clicks the Help button in <Controls /> segement of render()

#### `renderCollapse(data)`

Recursive function to render a series of nested <Collapse /> components until we reach a folder that doesn't contain any directories. NOTE: This needs to be updated as there are files with issues in directories that also have subdirectories. Right now they are not displayed in this portion (although they are shown in the graphs part)

| Name | Type | Description |
| --- | --- | --- |
| data | Object | The directory data currently being traversed. This data is originally derived from store.processedIssuesByFile |

#### `renderDirectories()`

Render all the collapse panels for the bottom portion of the page. Calls this.renderCollapse which recursively traverses all of the directories of the project and renders the issues in these folders

#### `renderHeaderActions()`

Render all of the header actions for the <Layout /> component on the page

#### `renderChart()`

Render the chart that appears in the top of the page. Based on the value of store.byFileGraphType it renders either a treemap, a bar chart or a pie chart

#### `handleGraphTypeChange(e)`

Handle when a radio button is changed

| Name | Type | Description |
| --- | --- | --- |
| e | Event | The radio button event |

---


## &lt;ByFileBarChart /&gt;
Bar chart that displays the number of issues in the files or
subfolders inside a directory
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | Data to be displayed in the graph |
| onExpand | Function | true | Function to handle when the user clicks on a a file/directory |
### Type Definitions
#### data
```js
Array<ChartDataItem>```
### Methods
#### `handleClick(data)`

Handle a bar being clicked by the user

| Name | Type | Description |
| --- | --- | --- |
| data | signature | The data item corresponding to the bar that was clicked |

---


## &lt;ByFilePieChart /&gt;
Pie chart that displays the number of issues in the files or
subfolders inside a directory
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | Data to be displayed in the graph |
| onExpand | Function | true | Function to handle when the user clicks on a a file/directory |
### Type Definitions
#### data
```js
Array<ChartDataItem>```
### Methods
#### `handleClick(data)`

Handle a bar being clicked by the user

| Name | Type | Description |
| --- | --- | --- |
| data | signature | The data item corresponding to the bar that was clicked |

---


## &lt;ByFileTreemap /&gt;
Pie chart that displays the number of issues in the files or
subfolders inside a directory
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Array | true | Data to be displayed in the graph |
| onExpand | Function | true | change the data when the user expands a section |
| canExpand | Function | true | Function determining whether the user can expand further |
### Type Definitions
#### data
```js
Array<Object>```
---


## &lt;FileIssuesModal /&gt;
Modal that displays all of the issues related to a given file in the
project. Note that we use the same `<CodeIssue />` component that is
used in the `<ByCategory />` page. Note that ideally the `<ErrorList />`
component would be refactored and used here.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| file | string | true | The filename |
| issues | Array | true | The array of issues associated with that file |
| onClose | Function | true | Function handler for when the tutorial is closed |
### Type Definitions
#### issues
```js
Array<Object>```
---


## &lt;Duplication /&gt;
Toplevel scene that shows the user all of the issues related to
duplications in their files. Note that this does not necessarily
mean that all the issues are about duplicated code. Note that ideally
the `<ErrorList />` component would be refactored and used here.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |

### Methods
#### `renderHeaderActions()`

Render all of the buttons in the header of the page

#### `renderDuplications()`

Render all of the duplications associated with the project.

---


## &lt;Graphs /&gt;
Toplevel scene to render a series of graphs related to the user's code.
Note that in the future this page might be broken up into separate
pages that each focus on a certain aspect of the code.
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | App store for global application state |
| ui | UiStore | true | Ui store for responsivity |

### Methods
#### `getAuthors(entry)`

Remove the "date" key from the API response object so just the authors are left

| Name | Type | Description |
| --- | --- | --- |
| entry | Object | No description |

#### `renderNormalizedChart()`

Render a chart of normalized statistics about the user's code

#### `renderStatsByDateChart()`

Render a stacked area chart where the x axis is the date where each commit was made.

#### `renderGraphs()`

Render all of the graphs for the page. This is broken out into a separate method so that the render method does not get too cluttered

#### `renderHeaderActions()`

Render the header buttons for the page

---


## &lt;NotFound /&gt;
Page that is rendered when the application hits a route that
is not mapped to any other component

---


## &lt;Playground /&gt;
This is a place to experiment with anything. Note that this route is only
added in dev mode so you don't have to worry about it showing up in prod

---


## &lt;Statistics /&gt;
Toplevel scene the displays stats about the project, such as
how many packages they have and how many lines of code
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| app | AppStore | true | App store for global application state |

### Methods
#### `renderStatistics()`

What is rendered if the API call has been completed successfully

---


## &lt;Welcome /&gt;
The first scene that is shown when the user goes to the app's URL. It
displays an input that asks for the project name, and once this input
is entered the application redirects to the `<Checklist />` page
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| ui | UiStore | true | Ui store for responsivity |
| app | AppStore | true | App store for global application state |
| history | Object | true | The history object passed in by React Router |

### Methods
#### `confirmProject()`

Wrapper for the stores confirmProject method that also sends analytics data to Google Analytics

---


## &lt;InfoModal /&gt;
Modal that displays basic information about the application and is
visible from the `<Welcome />` page
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | Function handler for when the modal is closed |

---


## &lt;TutorialModal /&gt;
Modal that displays a tutorial about how to use the application
### Props

| Prop Name | Type | Required | Description |
| --- | --- | --- | --- |
| onClose | Function | true | Function handler for when the modal is closed |
| fromError | boolean | false | Error didn't |

---

