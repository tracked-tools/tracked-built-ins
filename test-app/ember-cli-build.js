'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { compatBuild } = require('@embroider/compat');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

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
    return compatBuild(app, buildOnce);
  }

  return compatBuild(app, buildOnce, {
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
  });
};
