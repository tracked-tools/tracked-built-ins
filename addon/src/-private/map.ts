import {
  macroCondition,
  appEmberSatisfies,
  importSync,
} from '@embroider/macros';

import type {
  TrackedMap as TrackedMapType,
  TrackedWeakMap as TrackedWeakMapType,
} from './old/map.ts';

export interface TrackedMap<K = unknown, V = unknown> extends Map<K, V> {}
export let TrackedMap: typeof TrackedMapType;

export interface TrackedWeakMap<K = unknown, V = unknown> extends Map<K, V> {}
export let TrackedWeakMap: typeof TrackedWeakMapType;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/map') as any;

  TrackedMap = module.TrackedMap;
  TrackedWeakMap = module.TrackedWeakMap;
} else {
  const module = importSync('./old/map') as any;

  TrackedMap = module.TrackedMap;
  TrackedWeakMap = module.TrackedWeakMap;
}
