'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            '@ember/string': '^3.0.0',
            '@ember/test-helpers': '^2.9.3',
            '@glimmer/component': '^1.0.0',
            'ember-cli': '~3.28.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '~8.0.0',
            'ember-source': '~3.24.0',
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@ember/string': '^3.0.0',
            '@ember/test-helpers': '^2.9.3',
            '@glimmer/component': '^1.0.0',
            'ember-cli': '~3.28.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '~8.0.0',
            'ember-source': '~3.28.11',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~5.8.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
    ],
  };
};
