'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },
    autoImport: {
      forbidEval: true,
      watchDependencies: ['tracked-built-ins'],
    },

    // Add options here
  });

  if (process.env.EMBER_TRY_CURRENT_SCENARIO === 'ember-lts-3.24') {
    // Embroider does not support 3.24
    return app.toTree();
  }

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,
    packageRules: [
      {
        package: 'test-app',
        components: {
          '{{test-component}}': {
            safeToIgnore: true,
          },
        },
      },
    ],
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
