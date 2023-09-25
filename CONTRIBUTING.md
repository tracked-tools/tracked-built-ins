# How To Contribute

This repo is divided into multiple packages using a [pnpm](https://pnpm.io)
workspace:

- `tracked-built-ins` is the actual tracked-built-ins addon
- `test-app` is its test suite

## Installation

* `git clone https://github.com/tracked-tools/tracked-built-ins.git`
* `cd tracked-built-ins`
* `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the addon

- `cd tracked-built-ins`
- `pnpm build`

## Running tests

* `cd tracked-built-in && pnpm start` – Builds the addon in "watch mode" so changes picked up by test app.
* `cd test-app && ember test` – Runs the test suite on the current Ember version
* `cd test-app && ember test --server` – Runs the test suite in "watch mode"
* `cd test-app && ember try:each` – Runs the test suite against multiple Ember versions

During development, if you'd like test app to pick up changes in the addon, make sure to run both
`cd tracked-built-in && pnpm start` and `cd test-app && ember test --server` in different terminals.

## Running the test application

- `cd test-app`
- `pnpm start`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
