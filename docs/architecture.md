# Architecture Overview

> The following is a high-level overview of the architecture of the application (both the frontend and backend pieces). Note that the backend repository can be found [here](https://github.com/wellxchen/Design-CheckUp-Web-Backend) and has it's own Wiki.

## General Overview

This project is structured like most modern web applications - the frontend makes REST calls to a backend API that is hosted separately (although on the same VM). The file `helpers/api.js` defines wrapper methods on fetch that are specific to calling endpoints for the API. In general, the stores associated with root-level scenes (`DuplicationsStore`, `ChecklistStore`, etc) make the API calls. The associated scene component calls the store functions in `componentDidMount` and then displays the results when the request is completed.

The backend API itself does several things, depending on the endpoint that is called. Many of the endpoints ask for analysis done by sonarqube, which means that the backend also has to call several API endpoints and aggregate/process the data in a way that the frontend can parse it. Additionally, it also will clone down the repository associated with the project given and again depending on the endpoint may do it's own anaylsis on the code stored locally. 

## Data

Currently there is no database, as the information that is needed is mostly pulled directly from student's code or the sonarqube API. Should users be implemented in the future that would have to change. In the event that users are implemented the existing localStorage caching can be used for saving tokens and the `<PrivateRoute />` component can be used to determine whether a route can be visited.

## Design Considerations

There is a pretty clear division between the frontend and backend. The backend handles all of the data aggregation and formats it in such a way that frontend can easily display it. 