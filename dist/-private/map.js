import { createStorage, getValue, setValue } from 'ember-tracked-storage-polyfill';

class TrackedMap {
  collection = createStorage(null, () => false);
  storages = new Map();
  vals;
  readStorageFor(key) {
    const {
      storages
    } = this;
    let storage = storages.get(key);
    if (storage === undefined) {
      storage = createStorage(null, () => false);
      storages.set(key, storage);
    }
    getValue(storage);
  }
  dirtyStorageFor(key) {
    const storage = this.storages.get(key);
    if (storage) {
      setValue(storage, null);
    }
  }
  constructor(existing) {
    // TypeScript doesn't correctly resolve the overloads for calling the `Map`
    // constructor for the no-value constructor. This resolves that.
    this.vals = existing ? new Map(existing) : new Map();
  }

  // **** KEY GETTERS ****
  get(key) {
    // entangle the storage for the key
    this.readStorageFor(key);
    return this.vals.get(key);
  }
  has(key) {
    this.readStorageFor(key);
    return this.vals.has(key);
  }

  // **** ALL GETTERS ****
  entries() {
    getValue(this.collection);
    return this.vals.entries();
  }
  keys() {
    getValue(this.collection);
    return this.vals.keys();
  }
  values() {
    getValue(this.collection);
    return this.vals.values();
  }
  forEach(fn) {
    getValue(this.collection);
    this.vals.forEach(fn);
  }
  get size() {
    getValue(this.collection);
    return this.vals.size;
  }
  [Symbol.iterator]() {
    getValue(this.collection);
    return this.vals[Symbol.iterator]();
  }
  get [Symbol.toStringTag]() {
    return this.vals[Symbol.toStringTag];
  }

  // **** KEY SETTERS ****
  set(key, value) {
    this.dirtyStorageFor(key);
    setValue(this.collection, null);
    this.vals.set(key, value);
    return this;
  }
  delete(key) {
    this.dirtyStorageFor(key);
    setValue(this.collection, null);
    this.storages.delete(key);
    return this.vals.delete(key);
  }

  // **** ALL SETTERS ****
  clear() {
    this.storages.forEach(s => setValue(s, null));
    this.storages.clear();
    setValue(this.collection, null);
    this.vals.clear();
  }
}

// So instanceof works
Object.setPrototypeOf(TrackedMap.prototype, Map.prototype);
class TrackedWeakMap {
  storages = new WeakMap();
  vals;
  readStorageFor(key) {
    const {
      storages
    } = this;
    let storage = storages.get(key);
    if (storage === undefined) {
      storage = createStorage(null, () => false);
      storages.set(key, storage);
    }
    getValue(storage);
  }
  dirtyStorageFor(key) {
    const storage = this.storages.get(key);
    if (storage) {
      setValue(storage, null);
    }
  }
  constructor(existing) {
    // TypeScript doesn't correctly resolve the overloads for calling the `Map`
    // constructor for the no-value constructor. This resolves that.
    this.vals = existing ? new WeakMap(existing) : new WeakMap();
  }
  get(key) {
    this.readStorageFor(key);
    return this.vals.get(key);
  }
  has(key) {
    this.readStorageFor(key);
    return this.vals.has(key);
  }
  set(key, value) {
    this.dirtyStorageFor(key);
    this.vals.set(key, value);
    return this;
  }
  delete(key) {
    this.dirtyStorageFor(key);
    this.storages.delete(key);
    return this.vals.delete(key);
  }
  get [Symbol.toStringTag]() {
    return this.vals[Symbol.toStringTag];
  }
}

// So instanceof works
Object.setPrototypeOf(TrackedWeakMap.prototype, WeakMap.prototype);

export { TrackedMap, TrackedWeakMap };
//# sourceMappingURL=map.js.map
