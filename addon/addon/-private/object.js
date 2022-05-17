import {
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

export default class TrackedObject {
  static fromEntries(entries) {
    return new TrackedObject(Object.fromEntries(entries));
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
      get(target, prop) {
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

      set(target, prop, value) {
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

  // @private
  #storages = new Map();

  // @private
  #collection = createStorage(null, () => false);

  // @private
  #readStorageFor(key) {
    let storage = this.#storages.get(key);

    if (storage === undefined) {
      storage = createStorage(null, () => false);
      this.#storages.set(key, storage);
    }

    getValue(storage);
  }

  // @private
  #dirtyStorageFor(key) {
    const storage = this.#storages.get(key);

    if (storage) {
      setValue(storage, null);
    }
  }
}
