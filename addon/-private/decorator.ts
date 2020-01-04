import { tracked as glimmerTracked } from '@glimmer/tracking';

import { TrackedMap, TrackedWeakMap } from './map';
import { TrackedSet, TrackedWeakSet } from './set';

function tracked(target: object, key: string, desc: PropertyDescriptor) {
  let initializer = (desc as any).initializer;
  let trackedDesc = glimmerTracked(target, key, desc);
  let { get: originalGet, set: originalSet } = trackedDesc;

  let defaultAssigned = new WeakSet();

  function set(this: any, value: unknown) {
    if (typeof value === 'object' && value !== null) {
      if (value instanceof Map) {
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

      defaultAssigned.add(this);
    }

    return originalGet!.call(this);
  }

  trackedDesc.get = get;
  trackedDesc.set = set;

  return trackedDesc;
}

export default (tracked as unknown) as PropertyDecorator;
