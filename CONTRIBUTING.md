# How To Contribute

This repo is divided into multiple packages using a [pnpm](https://pnpm.io)
workspace:

- `addon` is the actual tracked-built-ins addon
- `test-app` is its test suite

## Installation

* `git clone https://github.com/tracked-tools/tracked-built-ins.git`
* `cd tracked-built-ins`
* `pnpm install`

## Linting

Inside any of the packages you can run:

* `pnpm lint:hbs`
* `pnpm lint:js`
* `pnpm lint:js --fix`

## Running tests


* `cd addon && pnpm start` – Builds the addon in "watch mode" so changes picked up by test app.
* `cd test-app && ember test` – Runs the test suite on the current Ember version
* `cd test-app && ember test --server` – Runs the test suite in "watch mode"
* `cd test-app && ember try:each` – Runs the test suite against multiple Ember versions

During development, if you'd like test app to pick up changes in the addon, make sure to run both
`cd addon && pnpm start` and `cd test-app && ember test --server` in different terminals.

## Running the dummy application

* `cd test-app && ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
