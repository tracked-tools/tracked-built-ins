import { trackedSet, trackedWeakSet } from '@ember/reactive/collections';

const setConfig = {
  equals: () => false,
  description: 'TrackedSet from tracked-built-ins',
};
const weakSetConfig = {
  equals: () => false,
  description: 'TrackedWeakSet from tracked-built-ins',
};

export class TrackedSet {
  constructor(existing: any) {
    const reactive = trackedSet(existing, setConfig);

    return new Proxy(reactive, {
      get(target, prop) {
        const value = Reflect.get(target, prop, target);

        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
      getPrototypeOf() {
        return TrackedSet.prototype;
      },
    });
  }
}

export class TrackedWeakSet {
  constructor(values: any) {
    const reactive = trackedWeakSet(values, weakSetConfig);

    return new Proxy(reactive, {
      get(target, prop) {
        const value = Reflect.get(target, prop, target);

        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
      getPrototypeOf() {
        return TrackedWeakSet.prototype;
      },
    });
  }
}

// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedSet.prototype, Set.prototype);
Object.setPrototypeOf(TrackedWeakSet.prototype, WeakSet.prototype);
