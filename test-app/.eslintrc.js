'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['ember', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // ts files
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'prefer-const': 'off',
        // Use the default `ban-types` rule *except* for allowing `object`, which is
        // used throughout. We may switch to using `Record<PropertyKey, unknown>` on
        // a future (breaking) release, but this choice allows us to preserve the
        // current types while landing a robust linting config in general.
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              object: false,
            },
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      // extends: ['plugin:qunit/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        // JS files where TS rules don't make sense
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
