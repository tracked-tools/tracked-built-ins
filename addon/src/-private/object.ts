import {
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

// @ts-expect-error This does not make TS happy
export default interface TrackedObject<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
> extends T {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging -- We are doing this intentionally
export default class TrackedObject<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
> {
  static fromEntries<T = unknown>(
    entries: Iterable<readonly [PropertyKey, T]>,
  ) {
    return new TrackedObject(Object.fromEntries(entries));
  }

  constructor(...args: Record<PropertyKey, never> extends T ? [] | [T] : [T]);
  constructor(obj = {}) {
    const proto = Object.getPrototypeOf(obj);
    const descs = Object.getOwnPropertyDescriptors(obj);

    const clone = Object.create(proto);

    for (const prop in descs) {
      Object.defineProperty(clone, prop, descs[prop]!);
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(clone, {
      get(target: T, prop: PropertyKey) {
        self.#readStorageFor(prop);

        return target[prop];
      },

      has(target: T, prop: PropertyKey) {
        self.#readStorageFor(prop);

        return prop in target;
      },

      ownKeys(target: T) {
        getValue(self.#collection);

        return Reflect.ownKeys(target);
      },

      set<K extends keyof T & PropertyKey>(target: T, prop: K, value: T[K]) {
        target[prop] = value;

        self.#dirtyStorageFor(prop);
        self.#dirtyCollection();

        return true;
      },

      deleteProperty(target: T, prop: PropertyKey) {
        if (prop in target) {
          delete target[prop];
          self.#dirtyStorageFor(prop);
          self.#dirtyCollection();
        }

        return true;
      },

      getPrototypeOf() {
        return TrackedObject.prototype;
      },
    });
  }

  #storages = new Map();

  #collection = createStorage(null, () => false);

  #readStorageFor(key: PropertyKey) {
    let storage = this.#storages.get(key);

    if (storage === undefined) {
      storage = createStorage(null, () => false);
      this.#storages.set(key, storage);
    }

    getValue(storage);
  }

  #dirtyStorageFor(key: PropertyKey) {
    const storage = this.#storages.get(key);

    if (storage) {
      setValue(storage, null);
    }
  }

  #dirtyCollection() {
    setValue(this.#collection, null);
  }
}
