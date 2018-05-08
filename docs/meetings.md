# Meeting Notes

> The following are the notes from all of the the independent study meetings for the semester.

## Meeting 1

#### Talking Points

- Find out how to get and disply the actual code for each file
- Confirm that the UI looks good / any changes need to be made
- Talk about visualization aspecs

#### Todo

- [x] Host the site
- [x] Email chengkang about getting code instead of path ranges
  - [x] Also need the rules to be mapped to more general categories from the guidelines page
  - http://www2.cs.duke.edu/courses/compsci308/spring18/assign/01_game/checklist.php
- [x] Get stats about your code (number of lines, classes, abstract classes, etc)
  - [ ]Percent commented, comment lines, files classes, methods, statements, total lines of code, complexity important as well
  - [ ] /component_measures/metric/functions/list ... top 10 longest methods with link to the method
- [x] Metrics on duplicated code
- [ ] historical data: copmletexiy and duplications
- [x] graphs
  - [x] Each person should have a different color and same level of transparency
  - Metrics:
    1. time of contribution
    2. How many issues did you close
    3. How many files are you the most "blamed" person
- [ ] Get from sonar: when was the last time it ran and did it fail...every 10 minutes ask if something new has happened?
- [ ] Have something saying when it was last run and whether it passed or failed

---

## Meeting 2

#### Todo

- [x] Get line numbers from the API (backend) (ALREADY THERE)
- [x] Map the subcategories to the rules (backend)
- [ ] How to tell whether it was run / is running / how to run the server through an API call. (backend)
 - [ ] Last successful run needs to be in the API
- [x] HOSTING!!! 
- [x] Find out how to get access to the correct gitlab repositories for the semester. (DONE)
- [ ] Make sure it works when repos is in progress
- [x] Make a new Quality profile for spring 2018 and categorize them all into the categories and subcategories
 - [ ] Update java version to 1.9 (try, duvall guesses that they haven't update to 1.9)
 - NEED pom.xml and yml file
- [x] Host on VM for right now (nohup ???) Run flask as a daemon/service, or set up chron job
  - The vm name is compsci308.colab.duke.edu
- [x] Make the progress circles clickable
- [ ] Change name of tab to analyze

#### Longer term
1. Admin section????

#### Recap

- Changed the frontend to get the code
- Looked into implementing login / access to the gitlab API for commit histories

#### Todos for next meeting

CALL TAB CHECKLIST

then have "STATISTICS" tab

---

## Meeting 3

#### Todo
- [ ] Check with percentages...little fishy
- [x] Make active category more clear
- [x] Add code duplication section
- [x] Finish the tutorial modal
- [x] Add refresh button so caching doesn't mess people up

---

## Meeting 4

#### Talking points
- [x] Nature of feedback (perhaps should be required, otherwise I doubt students will do it)
- [x] I have two midterms this week, will not be able to do as much work as usual
- [x] Ask about two students who did not turn in their assignments for 290

#### Todo
- [ ] Update the frontend for API changes to duplication API
- [ ] Duplicated code for smaller screen widths
- [x] Make a survey
 - Did you actually use the site?
 - Did you find it useful
 - Most useful thing
 - suggestions to improve
 - under 10
 - optionally include name?
 - Appeal to humanity...access to class mailing list. I'm a duke student, doing independent study, want to improve it for next assignement.
- [x] Add analytics

---

## Meeting 5

#### Talking Points
- [ ] Decompiling Codepro?

#### Todo
- [ ] Need to highlight regions of the code actually affected...issue when there is one line displayed twice because there are two issues on the same line.
- [x] Get longest method on same page with statistics
 - 34      name_of_method.java
 - 34      asdfasfasdfasdf.java
 - .... 
- [ ] Tag issues with how important they are
- [ ] Go through all projects and see if anything breaks
- [ ] Stats page
 - get rid of number of files
 - get rid of number lines
 - number lines of code (change from last one)
 - number of classes
 - number of methods (rename from functions)
 - then comments stuff
 - Maybe put directories in there and call it packages (and subtract one)
 - Put whether the code passed or failed


---

## Meeting 6

#### Talking points

- [ ] Update percentages to reflect severity?
- [x] What should the UI be like for filtering based on severity?

#### Todo
- [ ] Take the percentage out
- [x] Remove rule that says "Add package-info file" from java notes
- [x] Packages should be above number of classes
- [x] Percent for density
- [x] Try and get the method name / just put first line
- [x] Chengkang...change magic values from -2 through 2
- [ ] Duplication - if on the same line don't show more than once
- [x] Don't show multiple file names in duplciations more than once (like slogo_team07)
- [ ] Misclassified issues
 - "The return type of this method should be an interface such as "List" ..." - not showing up in correct place and also needs to be classified as MAJOR or CRITICAL or BLOCKING
- [ ] Graphing stuff if you have time
 - Starting point: contributions...overlay all of them (stacked on top of eachother)
 - Maybe if integrating gitlab have option to open whole file


---

## Meeting 7

#### Talking points

- Without percentages the page looks wierd
- Working on graphs, chengkang needs to find number of lines changed

#### Todo

- [ ] Instead of percent do stars:
 - perfect
 - 90% & above
 - 80% & above
 - etc (of 10, 12, 14, etc)
 - Always have at least one star
- [ ] Slogo team 07 duplication within multiple blocks & indentation
- [ ] Maybe host a dev verion of the site
- [x] Regex for function private List<String> replaceUnknowns showing "not found"
- [ ] Need to add timestamp about when sonarqube was run
- [ ] Slogo team 12
- [x] Process duplications so that they are all separate
- [ ] Git log name map - hopefully can get most of stuff from the roster
- [x] Send Duvall an email reminder about the email and name and netid

## Thursday Meeting

#### Todo
- [ ] Change the name of the issue
 - fail, high, medium, low, info (call priority)
- [ ] Get the categories from the data rather than having them hardcoded in constants file
- [x] Create an error component
- [ ] Fix safari star placement issue

#### Student Feedback
- [ ] Maybe be able to turn off certain specific issues as like an advanced option
- [ ] Have some info about the categories on the page before entering the project

---

## Meeting 8

#### Todo
- [x] Feature request: side scroller on duplicated code (slogo_team12)
- [x] Only add filters on a per project basis
- [x] Show number of errors with filters
- [x] apt_roulette doesn't show 100 even though there are no issues - maybe a rounding issue

#### Another thing
Maybe we can develop design APTs
- Start with bad, generated code and then have people fix it
- See if you can configure sonarqube?? separate APT rule set (per APT?)...talk to Chengkang
- He will give you some examples
- For roulette - get rid of cyclomatic complexity and exchange for an inheritance hierarchy
- Look for a way to change the quality profile on a per project basis (need to talk to Chengkang about that)

#### Future
- Look into doxygen and image about class dependencies

---

## Meeting 9

#### Todo

Current app is the "Error lens" part, we have talked about the "file lens" part, and then we want an "author lens"...want to see which errors individual developers have.

- [ ] Need historical data...as the project progressed, the number of errors generally went down
 - Talk to Chengkang about that
- [ ] Metadata - number of times that it was changed through Git, total number of errors (by category, by severity)


---

## Meeting 10

#### Todo

- [ ] Additions, deletions - maybe add to chengkengs repo
- [ ] Want a timeline (maybe show the weekend) - don't want to just show commit frequency b/c that isnt a really important metric
- [ ] Maybe put sprint 1 date, sprint 2 date in the configuration file
- [x] EMAIL CHENGKENG!!!!
- [x] Make a wiki on github...maybe on the backend as well???

---

## Meeting 11

#### Talking Points

- [x] Entered into the poster challenge - any ideas as to how to format it? (Duke Computer Science Undergraduate Project Showcase)
- [x] Performance issues with additions / deletions
- [x] Created a [wiki](https://github.com/zacharyfmarion/design-checklist/wiki)

#### Todo

- [ ] Maybe average number of lines changed per commit
- [ ] Stack the graphs so that you can see a lot at once
- [x] Document the backend
 - [x] How to start
 - [x] Document the endpoints
 - [x] What config files do you need
 - [x] How hosting works
- [ ] See if you need to modify the POM.xml file if you have an external dep (like jUnit)
- [x] Move welcome page to a separate scene

---

## Meeting 12

#### Talking Points

- [ ] Do I need to write a paper / reflection? If so when is that due?

#### Todo
- [ ] Sort the graphs tooltip so that it is easier to read - either by largest to smallest or in order (maybe have option for both?)
- [x] Color from green to red
- [ ] Sort packages by number of errors
- [x] Add percentages -> Benjamen & alex in iftruereturntrue
- [x] Color code a weekend => Line range???
- [ ] Fix scaling issue ... total number of lines of code
- [ ] Filtering => Be consistent!
- [ ] Graphs by file
- [x] Filter out directories so that we only have a package with java files in it
- [ ] Add to wiki: Future work / ideas that would be useful to add to the tool

---

## Meeting 13

#### Todo

- [x] Change errors to issues
- [x] Get rid of .java
- [x] Have the current folder at the top
- [x] Get rid of the src/ in all the collapse panel headers
- [ ] Labeling for bar charts
- [x] Try putting names on the pie chart
- [ ] Get data about milesones passed to the frontend
- [x] Ask Chengkang to get the name instead of the netid / other thing
- [x] Instead of normalized chart, want two pie charts (likes the percentages though)
- [x] ALSO GET RID OF SRC IN DUPLICATIONS COLLAPSE HEADER
- [x] Finish backend documentation
- [x] Dark theme???

#### Big Things

- [ ] Want longest method and actually have the code right there...Most value comes out of being able to look at student's code
- [ ] Want a view w/ too many lines, too many methods, too many parameters, and too many dependencies
- [ ] Plan for including historical information - maybe just statistics to start? (number of errors, amount of duplication)
- [ ] Maybe add a "by author" for the Checklist part
- [ ] Maybe add some functionality like git-blame
- [ ] Want the file itself as an API endpoint

---

## Meeting 14

#### Todo
- [ ] Color code based on person with distinct colors
- [ ] Given the four things that Duvall talked about, maybe do a mockup about how it might look
- [ ] Put the code on gitlab
- [ ] Fix theming bug with labels
- [ ] Add documentation about looking into the Codepro
- [ ] Add APT stuff to the documentation
- [ ] Separate category - style issues (braces on the same line, instance variables / class names following some kind of pattern
- [ ] Add style guidlines to documentation