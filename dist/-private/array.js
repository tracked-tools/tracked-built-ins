import { macroCondition, appEmberSatisfies, importSync } from '@embroider/macros';

let TrackedArray;
/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(appEmberSatisfies('^6.8.0-beta.1 || >= 6.8.0'))) {
  const module = importSync('./new/array');
  TrackedArray = module.TrackedArray;
} else {
  const module = importSync('./old/array');
  TrackedArray = module.default;
}

export { TrackedArray };
//# sourceMappingURL=array.js.map
