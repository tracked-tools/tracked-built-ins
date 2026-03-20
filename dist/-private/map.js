import { macroCondition, appEmberSatisfies, importSync } from '@embroider/macros';

let TrackedMap;
let TrackedWeakMap;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/map');
  TrackedMap = module.TrackedMap;
  TrackedWeakMap = module.TrackedWeakMap;
} else {
  const module = importSync('./old/map');
  TrackedMap = module.TrackedMap;
  TrackedWeakMap = module.TrackedWeakMap;
}

export { TrackedMap, TrackedWeakMap };
//# sourceMappingURL=map.js.map
