# Assignment 5

**Assignment and Code Blog entry due at 11:59pm on Monday, 6/4/2017**

**This assignment will not be demoed.**

The goals of this assignment are to start to do some routing with Express and to start working with Handlebars for templating on the server.  There are several different parts of the assignment detailed below.

## Write a twit template partial

Your first job for this assignment is to write a Handlebars template partial for a single twit in the file `views/partials/twit.handlebars`.  The twit template should implement the twit structure we've been working with throughout the assignments in this course (this structure is detailed in a comment in the template file above).  It should take an argument for the twit text and an argument for the twit author and plug them into the appropriate place in the template.

## Write a template for a page to display twits:

Next, you should write a Handlebars template in `views/twitPage.handlebars` that implements the body of a page for displaying twits.  This page should match the main Tweeter page of the assignments we've been working on to now in the course.  In particular, it should contain the following things:
  * The header (from the already-defined partial in `views/partials/header.handlebars`).
  * The main twit container, with all of the supplied twits displayed within.
  * The create-twit modal (from the already-defined partial in `views/partials/createTwitModal.handlebars`).  The inclusion of the modal is optional and should be controlled with an argument passed into the template, as described below.

This template should take the following arguments:
  * An array of twits to be displayed.  The template should display all of the twits contained in this array.
  * A boolean value to control whether the create-twit modal is included in the page.  If this value is `false`, the modal should not be included.

## Write an Express-based server

You should write an Express server in the file `server.js`.  The server should do the following things:

  * It should use a `require` call to import the twit data from `twitData.json`.

  * It should statically serve files from the `public/` directory out of the root URL path ('`/`').  For example, the file `public/style.css` should be available at the URL path '`/style.css`'.

  * It should route the root path ('`/`') to the twit page implemented in `views/twitPage.handlebars`.  In this case, all of the twits from `twitData.json` should be displayed, and the create-twit modal *should* be displayed.

  * It should route a dynamic path '`/twits/<INDEX>`' to the twit page implemented in `views/twitPage.handlebars`.  In this case, if '`<INDEX>`' is an integer corresponding to the array index of one of the twits in `twitData.json`, only that twit should be displayed on the twit page, and the create-twit modal *should NOT* be displayed.

  * It should route any non-existent path, including '`/notes/<INDEX>`' for any value of '`<INDEX>`' that is not an integer corresponding to the array index of one of the twits in `twitData.json`, to the 404 page implemented in `views/404Page.handlebars`.  In this case, a 404 status should be returned.

  * It should listen on the port specified by the `PORT` environment variable or on port 3000 if the `PORT` environment variable is note defined.

Importantly, when performing the routing steps described above (particularly the ones that route to the twit page), make sure you provide the arguments needed by your Handlebars templates.

## Development using npm

When working on this assignment, you will need to use npm.  The first thing you should do when you clone this code onto your development machine is to install the required dependencies:
```
npm install
```

As you are developing, you should get into the habit of using `npm` to start your server instead of using `node` directly.  In particular, to start your server, you should run:
```
npm start
```

For this assignment, starting your server this way is particularly important, because the package is set up so that some extra needed work is done before the server starts.  Specifically, the app is set up to use the twit template you write in `views/partials/twit.handlebars` on the client to generate twits created using the create-twit modal.  You can see this in action in the `generateNewTwitElem()` function in `public/index.js`.  In order to use that template on the client, it must be *precompiled* into JavaScript.  A `build` step is defined in the `scripts` section of `package.json` to perform this precompilation and to output the resulting JS code into a file in `public/` so it can be accessed and used by your client-side code.

In addition, a `prestart` script is defined in `package.json` so that the precompilation is run *automatically* before the server is started whenever you run `npm start`.  This will ensure that the freshest version of your template is made available to the client when it requests it.

## Code Blog

Add an entry to your Code Blog reflecting on your experience with this assignment.  Here are some questions you could answer (though these aren't the only ones):

  * What was challenging about the assignment, and what specific kinds of problems did you have.  How did you solve those problems?

  * What did you learn from the assignment?  Were there any special insights you had?  What did you find that you already knew?

  * What kinds of resources were helpful for completing the assignment?  Specific websites?  Lectures?  The class Piazza forum?  The TAs?  How did you use each of these resources?

  * What are one or two things you had to Google to complete the assignment?

## Submission

As always, we'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Just make sure your completed files are committed and pushed by the assignment's deadline to the master branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the master branch your assignment repo on the github.com website (i.e. github.com/OSU-CS290-Sp17/assignment-5-YourGitHubUsername/). If your changes show up there, you can consider your files submitted.

In addition to submitting your assignment via GitHub, you must submit the URL to your code blog entry (e.g. http://web.engr.oregonstate.edu/~YOUR_ONID_ID/cs290/blog.html) via Canvas by the due date specified above.

## Grading criteria

For this assignment, you should only modify the following files:
  * `server.js`
  * `views/twitPage.handlebars`
  * `views/partials/twit.handlebars`

Changes to other files will be ignored.

In addition, no dependencies beyond the ones already defined in `package.json` (express, handlebars, and express-handlebars) should be used.

The assignment is worth 100 points total:

  * 15 points: twit template partial is correctly implemented in `views/partials/twit.handlebars`

  * 25 points: twit page template is correctly implemented in `views/twitPage.handlebars`

  * 60 points: the server is correctly implemented
    * 10 points: all files in `public/` are served statically at the appropriate path
    * 15 points: the root URL path ('`/`') is routed to the twit page, and all twits from `twitData.json` are displayed there, as is the create-twit modal
    * 20 points: the dynamic path '`/twits/<INDEX>`' is routed to an individual twit page with no create-twit modal, as described above
    * 10 points: any other unhandled path (including '`/twits/<INDEX>`' for an unknown index value) is routed to the 404 page, and a 404 status is returned
    * 5 points: the server listens on the port specified by the `PORT` environment variable with a default port of 3000
