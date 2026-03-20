import { trackedMap, trackedWeakMap } from '@ember/reactive/collections';

const mapConfig = {
  equals: () => false,
  description: 'TrackedMap from tracked-built-ins'
};
const weakMapConfig = {
  equals: () => false,
  description: 'TrackedWeakMap from tracked-built-ins'
};
class TrackedMap {
  constructor(existing) {
    const reactive = trackedMap(existing, mapConfig);
    return new Proxy(reactive, {
      get(target, prop) {
        const value = Reflect.get(target, prop, target);
        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
      getPrototypeOf() {
        return TrackedMap.prototype;
      }
    });
  }
}
class TrackedWeakMap {
  constructor(values) {
    const reactive = trackedWeakMap(values, weakMapConfig);
    return new Proxy(reactive, {
      get(target, prop) {
        const value = Reflect.get(target, prop, target);
        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
      getPrototypeOf() {
        return TrackedWeakMap.prototype;
      }
    });
  }
}

// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedMap.prototype, Map.prototype);
Object.setPrototypeOf(TrackedWeakMap.prototype, WeakMap.prototype);

export { TrackedMap, TrackedWeakMap };
//# sourceMappingURL=map.js.map
