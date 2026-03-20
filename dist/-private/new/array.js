import { trackedArray } from '@ember/reactive/collections';

// Old TrackedArray dirtied all values on change, regardless of whether the value
// actually changed.
const config = {
  equals: () => false,
  description: 'TrackedArray from tracked-built-ins'
};
class TrackedArray {
  static from(iterable, mapfn, thisArg) {
    return mapfn ? new TrackedArray(Array.from(iterable, mapfn, thisArg)) : new TrackedArray(Array.from(iterable));
  }
  static of(...arr) {
    return new TrackedArray(arr);
  }
  constructor(arr = []) {
    const reactive = trackedArray(arr, config);
    return new Proxy(reactive, {
      getPrototypeOf() {
        return TrackedArray.prototype;
      }
    });
  }
}
// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedArray.prototype, Array.prototype);

export { TrackedArray };
//# sourceMappingURL=array.js.map
