import { consume, dirty } from './util';

export class TrackedMap<K = any, V = any> extends Map<K, V> {
  // **** KEY GETTERS ****
  get(key: K) {
    consume(this, key);

    return super.get(key);
  }

  has(key: K) {
    consume(this, key);

    return super.has(key);
  }

  // **** ALL GETTERS ****
  entries() {
    consume(this);

    return super.entries();
  }

  keys() {
    consume(this);

    return super.keys();
  }

  values() {
    consume(this);

    return super.values();
  }

  forEach(fn: (value: V, key: K, map: this) => void) {
    consume(this);

    super.forEach(fn);
  }

  get size() {
    consume(this);

    return super.size;
  }

  // **** KEY SETTERS ****
  set(key: K, value: V) {
    dirty(this, key);
    dirty(this);

    return super.set(key, value);
  }

  delete(key: K) {
    dirty(this, key);
    dirty(this);

    return super.delete(key);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirty(this, k));
    dirty(this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedMap.prototype[Symbol.iterator];

  Object.defineProperty(TrackedMap.prototype, Symbol.iterator, {
    get() {
      consume(this);
      return originalIterator;
    }
  });
}

export class TrackedWeakMap<K extends object = object, V = any> extends WeakMap<
  K,
  V
> {
  get(key: K) {
    consume(this, key);

    return super.get(key);
  }

  has(key: K) {
    consume(this, key);

    return super.has(key);
  }

  set(key: K, value: V) {
    dirty(this, key);

    return super.set(key, value);
  }

  delete(key: K) {
    dirty(this, key);

    return super.delete(key);
  }
}
