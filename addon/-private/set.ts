import { consume, dirty } from './util';

export class TrackedSet<T = any> extends Set<T> {
  // **** KEY GETTERS ****
  has(value: T) {
    consume(this, value);

    return super.has(value);
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

  forEach(fn: (value1: T, value2: T, map: this) => void) {
    consume(this);

    super.forEach(fn);
  }

  get size() {
    consume(this);

    return super.size;
  }

  // **** KEY SETTERS ****
  add(value: T) {
    dirty(this, value);
    dirty(this);

    return super.add(value);
  }

  delete(value: T) {
    dirty(this, value);
    dirty(this);

    return super.delete(value);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirty(this, k));
    dirty(this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedSet.prototype[Symbol.iterator];

  Object.defineProperty(TrackedSet.prototype, Symbol.iterator, {
    get() {
      consume(this);
      return originalIterator;
    }
  });
}

export class TrackedWeakSet<T extends object = object> extends WeakSet<T> {
  has(value: T) {
    consume(this, value);

    return super.has(value);
  }

  add(value: T) {
    dirty(this, value);

    return super.add(value);
  }

  delete(value: T) {
    dirty(this, value);

    return super.delete(value);
  }
}
