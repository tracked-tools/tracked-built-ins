import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';

let TrackedObject;

/**
 * https://rfcs.emberjs.com/id/1068-tracked-collections
 */
if (macroCondition(dependencySatisfies('ember-source', '>= 6.8.0-beta.1'))) {
  const module = importSync('./new/object');
  TrackedObject = module.TrackedObject;
} else {
  const module = importSync('./old/object');
  TrackedObject = module.default;
}

export { TrackedObject };
//# sourceMappingURL=object.js.map
