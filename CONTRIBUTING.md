# How To Contribute

This repo is divided into multiple packages using Yarn workspaces:

- `addon` is the actual tracked-built-ins addon
- `test-app` is its test suite

## Installation

* `git clone https://github.com/tracked-tools/tracked-built-ins.git`
* `cd tracked-built-ins`
* `yarn install`

## Linting

Inside any of the packages you can run:

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

## Running tests

* `cd test-app && ember test` – Runs the test suite on the current Ember version
* `cd test-app && ember test --server` – Runs the test suite in "watch mode"
* `cd test-app && ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `cd test-app && ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
