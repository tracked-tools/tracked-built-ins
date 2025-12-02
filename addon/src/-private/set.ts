import {
  macroCondition,
  appEmberSatisfies,
  importSync,
} from '@embroider/macros';

import type {
  TrackedSet as TrackedSetType,
  TrackedWeakSet as TrackedWeakSetType,
} from './old/set.ts';

export interface TrackedSet<V = unknown> extends Set<V> {}
export let TrackedSet: typeof TrackedSetType;

export interface TrackedWeakSet<V extends WeakKey> extends WeakSet<V> {}
export let TrackedWeakSet: typeof TrackedWeakSetType;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/set') as any;

  TrackedSet = module.TrackedSet;
  TrackedWeakSet = module.TrackedWeakSet;
} else {
  const module = importSync('./old/set') as any;

  TrackedSet = module.TrackedSet;
  TrackedWeakSet = module.TrackedWeakSet;
}
