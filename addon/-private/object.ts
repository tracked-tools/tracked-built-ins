import {
  TrackedStorage,
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

export default class TrackedObject {
  static fromEntries<T>(entries: Iterable<readonly [PropertyKey, T]>): T {
    // SAFETY: this is valid because the constructor simply produces a proxy for
    // the type `T`.
    return new TrackedObject(Object.fromEntries(entries)) as unknown as T;
  }

  constructor(obj = {}) {
    let proto = Object.getPrototypeOf(obj);
    let descs = Object.getOwnPropertyDescriptors(obj);

    let clone = Object.create(proto);

    for (let prop in descs) {
      Object.defineProperty(clone, prop, descs[prop]);
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;

    return new Proxy(clone, {
      get(target, prop /*, receiver*/) {
        self.#readStorageFor(prop);

        return target[prop];
      },

      has(target, prop) {
        self.#readStorageFor(prop);

        return prop in target;
      },

      ownKeys(target) {
        getValue(self.#collection);

        return Reflect.ownKeys(target);
      },

      set(target, prop, value /*, receiver */) {
        target[prop] = value;

        self.#dirtyStorageFor(prop);
        setValue(self.#collection, null);

        return true;
      },

      getPrototypeOf() {
        return TrackedObject.prototype;
      },
    });
  }

  #storages = new Map<PropertyKey, TrackedStorage<null>>();

  #collection = createStorage(null, () => false);

  #readStorageFor(key: PropertyKey): void {
    let storage = this.#storages.get(key);

    if (storage === undefined) {
      storage = createStorage(null, () => false);
      this.#storages.set(key, storage);
    }

    getValue(storage);
  }

  #dirtyStorageFor(key: PropertyKey): void {
    const storage = this.#storages.get(key);

    if (storage) {
      setValue(storage, null);
    }
  }
}

export default interface TrackedObject {
  fromEntries<T>(entries: Iterable<readonly [PropertyKey, T]>): {
    PropertyKey: T;
  };

  new <T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>>(
    obj?: T
  ): T;
}

const x = new TrackedObject();
const y = new Object();

Object.setPrototypeOf(TrackedObject.prototype, Object.prototype);
