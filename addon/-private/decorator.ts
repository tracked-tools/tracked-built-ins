import { DEBUG } from '@glimmer/env';
import { tracked as glimmerTracked } from '@glimmer/tracking';

import { TrackedMap, TrackedWeakMap, TrackedSet, TrackedWeakSet } from 'tracked-maps-and-sets';

export default function tracked(target: object, key: string | symbol, desc: PropertyDescriptor): void;
export default function tracked<T, U>(obj: Map<T, U>): TrackedMap<T, U>;
export default function tracked<T extends object, U>(obj: WeakMap<T, U>): TrackedWeakMap<T, U>;
export default function tracked<T>(obj: Set<T>): TrackedSet<T>;
export default function tracked<T extends object>(obj: WeakSet<T>): TrackedWeakSet<T>;
export default function tracked(obj: object, key?: string | symbol, desc?: PropertyDescriptor) {
  if (key !== undefined && desc !== undefined) {
    return glimmerTracked(obj, key as string, desc);
  }

  switch (obj) {
    case Map: return new TrackedMap();
    case WeakMap: return new TrackedWeakMap();
    case Set: return new TrackedSet();
    case WeakSet: return new TrackedWeakSet();
  }

  if (obj instanceof Map) {
    return new TrackedMap(obj);
  } else if (obj instanceof WeakMap) {
    return new TrackedWeakMap();
  } else if (obj instanceof Set) {
    return new TrackedSet(obj);
  } else if (obj instanceof WeakSet) {
    return new TrackedWeakSet();
  }

  if (DEBUG) {
    throw new Error(`You must either use tracked as a field decorator, or to wrap built-in class instances:

    class Example {
      @tracked field = 123;

      map = tracked(Map);
      map = tracked(new Map());
    }
    `);
  }

  return;
}
