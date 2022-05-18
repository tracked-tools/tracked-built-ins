import { tracked as glimmerTracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

import { TrackedMap, TrackedWeakMap } from './map';
import { TrackedSet, TrackedWeakSet } from './set';
import TrackedArray from './array';
import TrackedObject from './object';

export default function tracked<T>(obj: T[] | typeof Array): TrackedArray<T>;

export default function tracked<T>(obj: Set<T> | typeof Set): TrackedSet<T>;

export default function tracked<T, U>(
  obj: Map<T, U> | typeof Map
): TrackedMap<T, U>;

export default function tracked<T extends object>(
  obj: WeakSet<T> | typeof WeakSet
): TrackedWeakSet<T>;

export default function tracked<T extends object, U>(
  obj: WeakMap<T, U> | typeof WeakMap
): TrackedWeakMap<T, U>;

export default function tracked<T extends object>(obj: T | typeof Object): T;

export default function tracked(
  obj: object,
  key: string | symbol,
  desc?: PropertyDescriptor
): void;

export default function tracked(
  obj: object,
  key?: string | symbol,
  desc?: PropertyDescriptor
): unknown {
  if (key !== undefined && desc !== undefined) {
    return glimmerTracked(obj, key, desc);
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
    assert(
      `You must either use tracked as a field decorator, or to wrap built-in class instances:

      class Example {
        @tracked field = 123;

        map = tracked(Map);
        map = tracked(new Map());
      }`,
      typeof obj === 'object' && obj !== null
    );

    return new TrackedObject(obj as Record<PropertyKey, unknown>);
  }
}
