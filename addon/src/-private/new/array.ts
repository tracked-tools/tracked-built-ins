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
    return new Proxy(reactive, {
      getPrototypeOf() {
        return TrackedArray.prototype;
      },
    });
  }
}
// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedArray.prototype, Array.prototype);
