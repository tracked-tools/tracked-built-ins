module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['ember', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
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
  },
  overrides: [
    // JS files where TS rules don't make sense
    {
      files: ['addon/**/*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './config/**/*.js',
        './index.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
