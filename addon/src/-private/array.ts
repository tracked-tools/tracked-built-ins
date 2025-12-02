import {
  macroCondition,
  appEmberSatisfies,
  importSync,
} from '@embroider/macros';

import type TrackedArrayType from './old/array.ts';

export let TrackedArray: typeof TrackedArrayType;
export interface TrackedArray<T = unknown> extends Array<T> {}

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/array') as any;

  TrackedArray = module.TrackedArray;
} else {
  const module = importSync('./old/array') as any;

  TrackedArray = module.default;
}
