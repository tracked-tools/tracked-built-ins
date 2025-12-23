import { macroCondition, appEmberSatisfies, importSync } from '@embroider/macros';

let TrackedSet;
let TrackedWeakSet;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/set');
  TrackedSet = module.TrackedSet;
  TrackedWeakSet = module.TrackedWeakSet;
} else {
  const module = importSync('./old/set');
  TrackedSet = module.TrackedSet;
  TrackedWeakSet = module.TrackedWeakSet;
}

export { TrackedSet, TrackedWeakSet };
//# sourceMappingURL=set.js.map
