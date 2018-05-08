# Future Directions

There were a lot of ideas for directions that the project could go in that were not completed by the time the semester concluded. The following sections will detail these thoughts and ideas on how they could be implemented.

## Get code for entire files

One idea was to have an endpoint like `/file` where the frontend could pass a `fileName` parameter and receive the code for that file. Because the backend clones down the repositories, it should not be very hard to implement. This could be shown in the frontend `/checklist/by-file` route in the `<FileIssuesModal />` component. If would also be helpful to have as a modal that could be accessed from clicking on a file from anywhere in the ui.

## Codepro duplication

Sonarqube's duplication detection is not very good, and so ideally would be replaced with another service. Professor Duvall looked into using [CodePro](https://dzone.com/articles/codepro-integration-eclipse) for this purpose, and decompiled some of the necessary .jar files to get that work started.

## Separate category for style issues

In the future Professor Duvall said he might want to have a separate category for style issues (braces on the same line, instance variables / class names following some kind of pattern, etc). This would have to be changed on the backend, but shouldn't require much change on the frontend. The variable `categories` in `constants/general.js` would have to change if the user does not first go to a route that gets the categories in the response. This is an architectural issue that should be addressed at some point.

## APT-like view

## Displaying project milestones on the `/graphs` page

Ideally the `/commits` endpoint would return the dates of project milestones so that these could be displayed on the graph in addition to weekends. This would give some insight into exactly when the students commit and how their work is distributed in relation to the deadlines.

## Longest method

- Want longest method and actually have the code right there...Most value comes out of being able to look at student's code

## Separate view for code complexity

- Want a view w/ too many lines, too many methods, too many parameters, and too many dependencies

## Historical Information

- Plan for including historical information - maybe just statistics to start? (number of errors, amount of duplication)

## By Author view in the `/checklist` scene

- Maybe add a "by author" for the Checklist part