import { tracked as glimmerTracked } from '@glimmer/tracking';

import { USE_PROXY } from './config';
import TrackedArray from './array';
import TrackedObject from './object';
import { TrackedMap, TrackedWeakMap } from './map';
import { TrackedSet, TrackedWeakSet } from './set';

export default function tracked(
  target: object,
  key: string,
  desc: PropertyDescriptor
) {
  let initializer = (desc as any).initializer;
  let trackedDesc = glimmerTracked(target, key, desc);
  let { get: originalGet, set: originalSet } = trackedDesc;

  let defaultAssigned = new WeakMap();

  function set(this: any, value: unknown) {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        value = TrackedArray.from(value);
      } else if (
        USE_PROXY &&
        'constructor' in value &&
        value.constructor === Object
      ) {
        value = new TrackedObject(value);
      } else if (value instanceof Map) {
        value = new TrackedMap(value);
      } else if (value instanceof WeakMap) {
        value = new TrackedWeakMap();
      } else if (value instanceof Set) {
        value = new TrackedSet(value);
      } else if (value instanceof WeakSet) {
        value = new TrackedWeakSet();
      }
    }

    return originalSet!.call(this, value);
  }

  function get(this: any) {
    if (!defaultAssigned.has(this)) {
      let defaultValue = initializer();

      set.call(this, defaultValue);

      defaultAssigned.set(this, true);
    }

    return originalGet!.call(this);
  }

  trackedDesc.get = get;
  trackedDesc.set = set;

  return trackedDesc;
}
