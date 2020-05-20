import {
  createTag,
  consumeTag,
  dirtyTag,
  consumeCollection,
  dirtyCollection
} from 'tracked-maps-and-sets/-private/util';

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

function createArrayProxy<T>(arr: T[]) {
  let indexTags: any[] = [];

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

export default class TrackedArray<T = unknown> {
  static from<T>(it: Iterable<T>) {
    return createArrayProxy(Array.from(it));
  }

  static of<T>(...arr: T[]) {
    return createArrayProxy(arr);
  }

  constructor(arr: T[] = []) {
    return createArrayProxy(arr.slice());
  }
}

// Ensure instanceof works correctly
Object.setPrototypeOf(TrackedArray.prototype, Array.prototype);
