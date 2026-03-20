import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { g, i } from 'decorator-transforms/runtime';

class TrackedStorageImpl {
  static {
    g(this.prototype, "_value", [tracked]);
  }
  #_value = (i(this, "_value"), void 0);
  _lastValue;
  _isEqual;
  constructor(initialValue, isEqual) {
    this._value = this._lastValue = initialValue;
    this._isEqual = isEqual;
  }
}
function tripleEq(a, b) {
  return a === b;
}
function createStorage(initialValue, isEqual = tripleEq) {
  assert('the second parameter to `createStorage` must be an equality function or undefined', typeof isEqual === 'function');
  return new TrackedStorageImpl(initialValue, isEqual);
}
function getValue(storage) {
  assert('getValue must be passed a tracked store created with `createStorage`.', storage instanceof TrackedStorageImpl);
  return storage._value;
}
function setValue(storage, value) {
  assert('setValue must be passed a tracked store created with `createStorage`.', storage instanceof TrackedStorageImpl);
  const {
    _isEqual: isEqual,
    _lastValue: lastValue
  } = storage;
  if (!isEqual(value, lastValue)) {
    storage._value = storage._lastValue = value;
  }
}

export { createStorage, getValue, setValue };
//# sourceMappingURL=tracked-storage.js.map
