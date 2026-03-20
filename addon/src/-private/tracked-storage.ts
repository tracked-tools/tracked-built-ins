import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

declare const STORAGE: unique symbol;

export interface TrackedStorage<T> {
  [STORAGE]: T;
}

class TrackedStorageImpl<T> implements TrackedStorage<T> {
  declare [STORAGE]: T;

  @tracked _value: T;
  _lastValue: T;
  _isEqual: (a: T, b: T) => boolean;

  constructor(initialValue: T, isEqual: (a: T, b: T) => boolean) {
    this._value = this._lastValue = initialValue;
    this._isEqual = isEqual;
  }
}

function tripleEq(a: unknown, b: unknown) {
  return a === b;
}

export function createStorage<T = unknown>(
  initialValue: T,
  isEqual: (a: T, b: T) => boolean = tripleEq,
): TrackedStorage<T> {
  assert(
    'the second parameter to `createStorage` must be an equality function or undefined',
    typeof isEqual === 'function',
  );

  return new TrackedStorageImpl(initialValue, isEqual);
}

export function getValue<T>(storage: TrackedStorage<T>): T {
  assert(
    'getValue must be passed a tracked store created with `createStorage`.',
    storage instanceof TrackedStorageImpl,
  );

  return storage._value;
}

type TrackedStorageValue<T extends TrackedStorage<unknown>> =
  T extends TrackedStorage<infer U> ? U : never;

export function setValue<T extends TrackedStorage<unknown>>(
  storage: T,
  value: TrackedStorageValue<T>,
): void {
  assert(
    'setValue must be passed a tracked store created with `createStorage`.',
    storage instanceof TrackedStorageImpl,
  );

  const { _isEqual: isEqual, _lastValue: lastValue } = storage;

  if (!isEqual(value, lastValue)) {
    storage._value = storage._lastValue = value;
  }
}
