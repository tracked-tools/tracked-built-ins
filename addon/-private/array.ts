/* eslint-disable @typescript-eslint/no-explicit-any */
// Unfortunately, TypeScript's ability to do inference *or* type-checking in a
// `Proxy`'s body is very limited, so we have to use a number of casts `as any`
// to make the internal accesses work. The type safety of these is guaranteed at
// the *call site* instead of within the body: you cannot do `Array.blah` in TS,
// and it will blow up in JS in exactly the same way, so it is safe to assume
// that properties within the getter have the correct type in TS.

import {
  createTag,
  consumeTag,
  dirtyTag,
  consumeCollection,
  dirtyCollection,
} from 'tracked-maps-and-sets/-private/util';

// SEMVER: this relies on the non-user-constructible `Tag` API, which ultimately
// comes from Glimmer itself. In the future, we should rely on a publicly
// exported type for this rather than relying on this inference (as this can
// technically break under us!). For now, this is "safe" for us to absorb
// internally as a "friend" API, but we have to uphold the invariant ourselves.
type Tag = ReturnType<typeof createTag>;

const ARRAY_GETTER_METHODS = new Set<string | symbol | number>([
  Symbol.iterator,
  'concat',
  'entries',
  'every',
  'fill',
  'filter',
  'find',
  'findIndex',
  'flat',
  'flatMap',
  'forEach',
  'includes',
  'indexOf',
  'join',
  'keys',
  'lastIndexOf',
  'map',
  'reduce',
  'reduceRight',
  'slice',
  'some',
  'values',
]);

function convertToInt(prop: number | string | symbol): number | null {
  if (typeof prop === 'symbol') return null;

  const num = Number(prop);

  if (isNaN(num)) return null;

  return num % 1 === 0 ? num : null;
}

function createArrayProxy<T>(arr: T[]): TrackedArray<T> {
  let indexTags: Tag[] = [];

  let boundFns = new Map();

  return new Proxy(arr, {
    get(target, prop, receiver) {
      let index = convertToInt(prop);

      if (index !== null) {
        let tag = indexTags[index];

        if (tag === undefined) {
          tag = indexTags[index] = createTag();
        }

        consumeTag(tag);
        consumeCollection(receiver);

        return target[index];
      } else if (prop === 'length') {
        consumeCollection(receiver);
      } else if (ARRAY_GETTER_METHODS.has(prop)) {
        let fn = boundFns.get(prop);

        if (fn === undefined) {
          fn = (...args: unknown[]) => {
            consumeCollection(receiver);
            return (target as any)[prop](...args);
          };

          boundFns.set(prop, fn);
        }

        return fn;
      }

      return (target as any)[prop];
    },

    set(target, prop, value, receiver) {
      (target as any)[prop] = value;

      let index = convertToInt(prop);

      if (index !== null) {
        let tag = indexTags[index];

        if (tag !== undefined) {
          dirtyTag(tag);
        }

        dirtyCollection(receiver);
      } else if (prop === 'length') {
        dirtyCollection(receiver);
      }

      return true;
    },

    getPrototypeOf() {
      return TrackedArray.prototype;
    },
  });
}

class TrackedArray<T = unknown> {
  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   */
  static from<T>(iterable: Iterable<T> | ArrayLike<T>): TrackedArray<T>;

  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  static from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: unknown
  ): TrackedArray<U>;

  static from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapfn?: (v: T, k: number) => U,
    thisArg?: unknown
  ): TrackedArray<T> | TrackedArray<U> {
    return mapfn
      ? createArrayProxy(Array.from(iterable, mapfn, thisArg))
      : createArrayProxy(Array.from(iterable));
  }

  static of<T>(...arr: T[]): TrackedArray<T> {
    return createArrayProxy(arr);
  }

  constructor(arr: T[] = []) {
    return createArrayProxy(arr.slice());
  }
}

// This rule is correctly in the general case, but it doesn't understand
// declaration merging, which is how we're using the interface here. This
// declaration says that `TrackedArray` acts just like `Array<T>`, but also has
// the properties declared via the `class` declaration above -- but without the
// cost of a subclass, which is much slower that the proxied array behavior.
// That is: a `TrackedArray` *is* an `Array`, just with a proxy in front of
// accessors and setters, rather than a subclass of an `Array` which would be
// de-optimized by the browsers.
//
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TrackedArray<T = unknown> extends Array<T> {}

export default TrackedArray;

// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedArray.prototype, Array.prototype);
