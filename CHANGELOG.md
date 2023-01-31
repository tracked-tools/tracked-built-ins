




## v3.1.1 (2023-01-31)

#### :bug: Bug Fix
* [#402](https://github.com/tracked-tools/tracked-built-ins/pull/402) Backport: Introduce flag for length access after push/unshift ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 1
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))

## v3.1.0 (2022-05-17)

#### :rocket: Enhancement
* [#30](https://github.com/tracked-tools/tracked-built-ins/pull/30) Trigger update after calling `delete` on an object property ([@lifeart](https://github.com/lifeart))

#### :bug: Bug Fix
* [#331](https://github.com/tracked-tools/tracked-built-ins/pull/331) Ignore generated types in repo ([@chriskrycho](https://github.com/chriskrycho))

#### :house: Internal
* [#331](https://github.com/tracked-tools/tracked-built-ins/pull/331) Ignore generated types in repo ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 2
- Alex Kanunnikov ([@lifeart](https://github.com/lifeart))
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))

## v3.0.0 (2022-05-17)

#### :boom: Breaking Change
* [#330](https://github.com/tracked-tools/tracked-built-ins/pull/330) Drop support for Node 12 ([@chriskrycho](https://github.com/chriskrycho))
* for supporting Ember v4, **now requires ember-auto-import v2** 

#### :rocket: Enhancement
* [#315](https://github.com/tracked-tools/tracked-built-ins/pull/315) Adopt SemVer spec strictness guidelines ([@chriskrycho](https://github.com/chriskrycho))
* [#314](https://github.com/tracked-tools/tracked-built-ins/pull/314) Add type tests and fix a types bug they exposed ([@chriskrycho](https://github.com/chriskrycho))
* [#313](https://github.com/tracked-tools/tracked-built-ins/pull/313) Introduce TS support policy with TS 4.4–4.6 ([@chriskrycho](https://github.com/chriskrycho))
* [#307](https://github.com/tracked-tools/tracked-built-ins/pull/307) Use Ember v4 types ([@chriskrycho](https://github.com/chriskrycho))

#### :bug: Bug Fix
* [#314](https://github.com/tracked-tools/tracked-built-ins/pull/314) Add type tests and fix a types bug they exposed ([@chriskrycho](https://github.com/chriskrycho))

#### :memo: Documentation
* [#241](https://github.com/tracked-tools/tracked-built-ins/pull/241) Update repository url in package.json ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* [#305](https://github.com/tracked-tools/tracked-built-ins/pull/305) Additional `TrackedArray` test to ensure that clearing the array by setting `length = 0` is possible. ([@ksrb](https://github.com/ksrb))
* [#321](https://github.com/tracked-tools/tracked-built-ins/pull/321) Directly integrate tracked maps and sets ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 3
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Kevin Suen ([@ksrb](https://github.com/ksrb))
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))

## v2.0.1 (2021-12-17)

#### :bug: Bug Fix
* [#227](https://github.com/tracked-tools/tracked-built-ins/pull/227) Update to latest ember-cli-babel ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 1
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))

## v2.0.0 (2021-11-11)

#### :boom: Breaking Change
* [#173](https://github.com/tracked-tools/tracked-built-ins/pull/173) Support Ember 4 and drop Ember <3.24 TLS ([@SergeAstapov](https://github.com/SergeAstapov))
* [#161](https://github.com/tracked-tools/tracked-built-ins/pull/161) Tracked storage implementations ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* [#144](https://github.com/tracked-tools/tracked-built-ins/pull/144) Breaking: drop Node 10 support ([@chriskrycho](https://github.com/chriskrycho))
* [#98](https://github.com/tracked-tools/tracked-built-ins/pull/98) Remove mandatory setter override ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :rocket: Enhancement
* [#189](https://github.com/tracked-tools/tracked-built-ins/pull/189) Update npmignore file ([@SergeAstapov](https://github.com/SergeAstapov))
* [#173](https://github.com/tracked-tools/tracked-built-ins/pull/173) Support Ember 4 and drop Ember <3.24 TLS ([@SergeAstapov](https://github.com/SergeAstapov))
* [#161](https://github.com/tracked-tools/tracked-built-ins/pull/161) Tracked storage implementations ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :memo: Documentation
* [#188](https://github.com/tracked-tools/tracked-built-ins/pull/188) Update Build Status badge: Travis -> GH Actions ([@SergeAstapov](https://github.com/SergeAstapov))
* [#172](https://github.com/tracked-tools/tracked-built-ins/pull/172) Update README.md to align with tracked-built-ins ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* [#201](https://github.com/tracked-tools/tracked-built-ins/pull/201) Update Node and @typescript-eslint/parser, add Prettier ([@chriskrycho](https://github.com/chriskrycho))
* [#188](https://github.com/tracked-tools/tracked-built-ins/pull/188) Update Build Status badge: Travis -> GH Actions ([@SergeAstapov](https://github.com/SergeAstapov))
* [#87](https://github.com/tracked-tools/tracked-built-ins/pull/87) chore(deps-dev): bump @typescript-eslint/parser from 4.22.1 to 4.23.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#86](https://github.com/tracked-tools/tracked-built-ins/pull/86) chore(deps-dev): bump @typescript-eslint/eslint-plugin from 4.22.1 to 4.23.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#85](https://github.com/tracked-tools/tracked-built-ins/pull/85) chore(deps-dev): bump eslint from 7.25.0 to 7.26.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#84](https://github.com/tracked-tools/tracked-built-ins/pull/84) chore(deps-dev): bump release-it from 14.6.1 to 14.6.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#83](https://github.com/tracked-tools/tracked-built-ins/pull/83) chore(deps): bump handlebars from 4.7.3 to 4.7.7 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#81](https://github.com/tracked-tools/tracked-built-ins/pull/81) chore(deps): bump ember-cli-babel from 7.26.4 to 7.26.5 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#82](https://github.com/tracked-tools/tracked-built-ins/pull/82) chore(deps): bump underscore from 1.9.2 to 1.13.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#79](https://github.com/tracked-tools/tracked-built-ins/pull/79) chore(deps-dev): bump @typescript-eslint/eslint-plugin from 4.22.0 to 4.22.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#80](https://github.com/tracked-tools/tracked-built-ins/pull/80) chore(deps-dev): bump @typescript-eslint/parser from 4.22.0 to 4.22.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#78](https://github.com/tracked-tools/tracked-built-ins/pull/78) chore(deps-dev): bump ember-source from 3.26.1 to 3.27.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#76](https://github.com/tracked-tools/tracked-built-ins/pull/76) chore(deps-dev): bump eslint from 7.24.0 to 7.25.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#77](https://github.com/tracked-tools/tracked-built-ins/pull/77) chore(deps-dev): bump ember-source-channel-url from 1.2.0 to 3.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#75](https://github.com/tracked-tools/tracked-built-ins/pull/75) chore(deps-dev): bump @typescript-eslint/eslint-plugin from 4.14.1 to 4.22.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#71](https://github.com/tracked-tools/tracked-built-ins/pull/71) chore(deps-dev): bump @types/ember from 3.16.3 to 3.16.5 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#69](https://github.com/tracked-tools/tracked-built-ins/pull/69) chore(deps-dev): bump @types/ember__test-helpers from 1.7.3 to 2.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#68](https://github.com/tracked-tools/tracked-built-ins/pull/68) chore(deps-dev): bump qunit-dom from 0.8.5 to 1.6.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#74](https://github.com/tracked-tools/tracked-built-ins/pull/74) chore(deps): bump ember-cli-babel from 7.26.3 to 7.26.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#70](https://github.com/tracked-tools/tracked-built-ins/pull/70) chore(deps-dev): bump ember-cli-uglify from 2.1.0 to 3.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#72](https://github.com/tracked-tools/tracked-built-ins/pull/72) chore(deps-dev): bump @typescript-eslint/parser from 4.14.1 to 4.22.0 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 3
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## v1.1.1 (2021-04-23)

#### :bug: Bug Fix
* [#42](https://github.com/pzuraq/tracked-built-ins/pull/42) [Bug]: resolve error in build without browsers in targets.js file ([@snewcomer](https://github.com/snewcomer))

#### :house: Internal
* [#65](https://github.com/pzuraq/tracked-built-ins/pull/65) chore: bump to latest release-it-lerna-changelog ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 2
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Scott Newcomer ([@snewcomer](https://github.com/snewcomer))

## v1.1.0 (2021-04-23)

#### :rocket: Enhancement
* [#56](https://github.com/pzuraq/tracked-built-ins/pull/56) Export correct types ([@chriskrycho](https://github.com/chriskrycho))

#### :house: Internal
* [#61](https://github.com/pzuraq/tracked-built-ins/pull/61) Bump release-it from 13.1.1 to 14.6.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#62](https://github.com/pzuraq/tracked-built-ins/pull/62) Bump @glimmer/tracking from 1.0.0 to 1.0.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#60](https://github.com/pzuraq/tracked-built-ins/pull/60) Bump @glimmer/component from 1.0.0 to 1.0.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#64](https://github.com/pzuraq/tracked-built-ins/pull/64) Bump tracked-maps-and-sets from 2.0.0 to 2.2.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#63](https://github.com/pzuraq/tracked-built-ins/pull/63) Bump typescript from 4.1.3 to 4.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#59](https://github.com/pzuraq/tracked-built-ins/pull/59) chore: (re)integrate dependabot ([@chriskrycho](https://github.com/chriskrycho))
* [#58](https://github.com/pzuraq/tracked-built-ins/pull/58) chore: to latest ember-resolver and ember-cli-babel ([@chriskrycho](https://github.com/chriskrycho))
* [#33](https://github.com/pzuraq/tracked-built-ins/pull/33) Bump highlight.js from 9.18.1 to 9.18.5 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#55](https://github.com/pzuraq/tracked-built-ins/pull/55) chore: bump ember-source ([@chriskrycho](https://github.com/chriskrycho))
* [#54](https://github.com/pzuraq/tracked-built-ins/pull/54) chore: bump misc Ember dependencies ([@chriskrycho](https://github.com/chriskrycho))
* [#53](https://github.com/pzuraq/tracked-built-ins/pull/53) chore: bump eslint and template-lint ([@chriskrycho](https://github.com/chriskrycho))
* [#52](https://github.com/pzuraq/tracked-built-ins/pull/52) chore: bump ember-cli-htmlbars; drop ember-cli-htmlbars-inline-precompile ([@chriskrycho](https://github.com/chriskrycho))
* [#50](https://github.com/pzuraq/tracked-built-ins/pull/50) chore: ember-cli to latest ([@chriskrycho](https://github.com/chriskrycho))
* [#28](https://github.com/pzuraq/tracked-built-ins/pull/28) Bump websocket-extensions from 0.1.3 to 0.1.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#49](https://github.com/pzuraq/tracked-built-ins/pull/49) Bump y18n from 4.0.0 to 4.0.3 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#34](https://github.com/pzuraq/tracked-built-ins/pull/34) Bump ini from 1.3.5 to 1.3.8 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#48](https://github.com/pzuraq/tracked-built-ins/pull/48) chore: bump ember-cli-babel and ember-cli-typescript ([@chriskrycho](https://github.com/chriskrycho))
* [#47](https://github.com/pzuraq/tracked-built-ins/pull/47) chore: configure CI to use GitHub Actions ([@chriskrycho](https://github.com/chriskrycho))
* [#46](https://github.com/pzuraq/tracked-built-ins/pull/46) chore: pin Node and Yarn via Volta ([@chriskrycho](https://github.com/chriskrycho))
* [#36](https://github.com/pzuraq/tracked-built-ins/pull/36) Fix TravisCI build ([@gnclmorais](https://github.com/gnclmorais))

#### Committers: 2
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Gonçalo Morais ([@gnclmorais](https://github.com/gnclmorais))

## v1.0.2 (2020-04-24)

#### :bug: Bug Fix
* [#25](https://github.com/pzuraq/tracked-built-ins/pull/25) [BUGFIX] Fixes the mandatory setter bug ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

## v1.0.1 (2020-03-25)

#### :bug: Bug Fix
* [#22](https://github.com/pzuraq/tracked-built-ins/pull/22) [BUGFIX] Ensure key operators work for TrackedObject ([@pzuraq](https://github.com/pzuraq))
* [#20](https://github.com/pzuraq/tracked-built-ins/pull/20) Update decorator.ts ([@speigg](https://github.com/speigg))

#### Committers: 2
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))
- Gheric Speiginer ([@speigg](https://github.com/speigg))

## v1.0.0 (2020-03-18)

#### :boom: Breaking Change
* [#16](https://github.com/pzuraq/tracked-built-ins/pull/16) [FEAT] Adds TrackedArray and TrackedObject ([@pzuraq](https://github.com/pzuraq))
* [#13](https://github.com/pzuraq/tracked-built-ins/pull/13) [REFACTOR] Extracts Maps and Sets, updates decorator ([@pzuraq](https://github.com/pzuraq))

#### :rocket: Enhancement
* [#18](https://github.com/pzuraq/tracked-built-ins/pull/18) [FEAT] Adds release process and changelog ([@pzuraq](https://github.com/pzuraq))
* [#17](https://github.com/pzuraq/tracked-built-ins/pull/17) [FEAT] Adds error when attempting to use in IE11 ([@pzuraq](https://github.com/pzuraq))
* [#15](https://github.com/pzuraq/tracked-built-ins/pull/15) [REFACTOR] Better decorator types ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

