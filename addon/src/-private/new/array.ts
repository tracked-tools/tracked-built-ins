import { trackedArray } from '@ember/reactive/collections';

// Old TrackedArray dirtied all values on change, regardless of whether the value
// actually changed.
const config = {
  equals: () => false,
  description: 'TrackedArray from tracked-built-ins',
};

export class TrackedArray {
  static from(iterable: any, mapfn: any, thisArg?: any) {
    return mapfn
      ? new TrackedArray(Array.from(iterable, mapfn, thisArg))
      : new TrackedArray(Array.from(iterable));
  }

  static of(...arr: unknown[]) {
    return new TrackedArray(arr);
  }
  constructor(arr: unknown[] = []) {
    const reactive = trackedArray(arr, config);

    const boundFns = new WeakMap();

    function call(
      target: object,
      receiver: object,
      fn: (...args: unknown[]) => unknown,
    ) {
      let existing = boundFns.get(fn);

      if (!existing) {
        existing = (...args: unknown[]) => {
          const result = fn.apply(target, args);

          if (result === reactive) {
            return receiver;
          }

          return result;
        };
        boundFns.set(fn, existing);
      }

      return existing;
    }

    return new Proxy(reactive, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, target);

        if (typeof value === 'function') {
          return call(target, receiver, value);
        }

        return value;
      },
      getPrototypeOf() {
        return TrackedArray.prototype;
      },
    });
  }
}
// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedArray.prototype, Array.prototype);
