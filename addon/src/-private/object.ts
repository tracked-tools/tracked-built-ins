import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';

import type TrackedObjectType from './old/object.ts';

export let TrackedObject: TrackedObjectType;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(dependencySatisfies('ember-source', '>= 6.8.0-beta.1'))) {
  const module = importSync('./new/object') as any;

  TrackedObject = module.TrackedObject;
} else {
  const module = importSync('./old/object') as any;

  TrackedObject = module.default;
}
