import { tracked as tracked$1 } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { TrackedWeakMap, TrackedMap } from './map.js';
import { TrackedWeakSet, TrackedSet } from './set.js';
import TrackedArray from './array.js';
import { TrackedObject } from './object.js';

function tracked(obj, key, desc) {
  if (key !== undefined && desc !== undefined) {
    return tracked$1(obj, key, desc);
  }
  if (Array.isArray(obj)) {
    return new TrackedArray(obj);
  }
  switch (obj) {
    case Object:
      return new TrackedObject();
    case Array:
      return new TrackedArray();
    case Map:
      return new TrackedMap();
    case WeakMap:
      return new TrackedWeakMap();
    case Set:
      return new TrackedSet();
    case WeakSet:
      return new TrackedWeakSet();
  }
  if (obj instanceof Map) {
    return new TrackedMap(obj);
  } else if (obj instanceof WeakMap) {
    return new TrackedWeakMap();
  } else if (obj instanceof Set) {
    return new TrackedSet(obj);
  } else if (obj instanceof WeakSet) {
    return new TrackedWeakSet();
  } else {
    assert(`You must either use tracked as a field decorator, or to wrap built-in class instances:

      class Example {
        @tracked field = 123;

        map = tracked(Map);
        map = tracked(new Map());
      }`, typeof obj === 'object' && obj !== null);
    return new TrackedObject(obj);
  }
}

export { tracked as default };
//# sourceMappingURL=decorator.js.map
