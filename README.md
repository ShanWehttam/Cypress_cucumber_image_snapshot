# Cypress demo
The purpose of this demo is to show how to use Cypress (https://www.cypress.io/) as a replacement for Cucumber/Ruby/Selenium.

## Some background terms

* Cypress — is a full-featured testing framework (written in JavaScript/Node), primarily for integration/E2E automation
* Cucumber — an automated acceptance testing framework (written in Ruby, but JavaScript and Java versions exist), primarily for integration/E2E automation
* Selenium — a driver that allows you to control a web-browser using code

## Installing the demo

Prerequisites for developing JavaScript applications. You will probably already have these:

1. Node (https://nodejs.org/en/download/)
2. npm (comes with Node)

Then you can get this thing running!

1. Clone this repo and `cd` into its directory on your machine
2. Run `npm install`, which will download all of the JavaScript dependencies (npm is "node package manager", which is the JavaScript equivalent of Ruby gems)

## Running Cypress tests from the command line

Run the following:

    ./node_modules/.bin/cypress run

You should see some stuff happening and two passing tests in your Terminal window. By default it'll also record videos of each test. Hurrah!

## Running Cypress from the GUI

Cypress comes with a Mac app that makes it easier to launch tests without using the command line.

To open the project in the app:

    ./node_modules/.bin/cypress open

You should now see two tests listed: `google_spec.js` and `google.feature`. These are demonstration files showing two ways of writing acceptance tests.

## RSpec-style tests

Open `cypress/integration/google_spec.js` and you'll see a very basic spec for testng Google. You can see the `describe` and `it` functions that are used to structure the test, which should be familiar to you if you've used RSpec (http://www.betterspecs.org/). The test:

1. Goes to the Google homepage
2. Puts a name into the search box
3. Submits the form
4. Verifies that search results are displayed

To run the test, click `google_spec.js` in the Cypress app. You'll see Chrome open up and the test will run.

## Cucumber-style tests

Open `cypress/integration/google.feature` and you'll see a normal Gherkin feature file. Then open `cypress/support/step_definitions/google.js` to see the step definitions. This should look very familiar if you've used Cucumber (Ruby). The actions Cypress is performing are exactly the same for this test, but it's just structured slightly differently to allow the abstraction of gherkin features and test implementation.

To run the test, click `google.feature` in the Cypress app. You'll see Chrome open up and the test will run.

## Cypress benefits

There are some obvious benefits of tis approach over our current Ruby/Cucumber/Selenium stack:

* Our existing Dockerised/Selenium setup is not easy for newcomers and is tricky to debug. Cypress works out of the box, but can be run under Docker in CI too
* Selenium itself can be brittle and difficult to debug — it's hard to step through tests. Cypress runs _in_ the browser rather than trying to drive one remotely
* We have other clients using JavaScript-based cucumber testing (Photobox for example), and frontend developers are already using JavaScript daily
* Test feedback is instant — Cypress can re-run tests as you save the test files
* Test debugging is instant — Cypress allows you to go back in time through DOM snapshots for each step, making it really easy to see what happened
