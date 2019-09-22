import { get, notifyPropertyChange } from '@ember/object';
import { assert } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

import { USE_PROXY, STRICT_PROXY_ACCESS } from './config';
import { SUPPORTS_PROXY } from './util';

const ACCESS_COUNTS = new WeakMap();
let IS_CREATING_ARRAY = false;

const ARRAY_KEY = '[]';

export default class TrackedArray<T> extends Array<T> {
  constructor() {
    super(...arguments);

    let self = this;

    if (SUPPORTS_PROXY === true && (USE_PROXY === true || DEBUG)) {
      self = new Proxy(this, {
        get(target, prop) {
          if (prop === 'prototype') {
            return;
          }

          if (DEBUG && !USE_PROXY && STRICT_PROXY_ACCESS) {
            assert(
              `You attempted to access this TrackedArray directly via: ${String(
                prop
              )}. This works in modern browsers, but does _not_ work in older browsers like IE. If you want to access TrackedArrays like this, set  the \`USE_PROXY\` option for TrackedBuiltIns to true. Otherwise, make sure you are using KVO compliant methods, such as \`get\` or \`getLength\`.`,

              // Note: We check both getter/setter methods here because setter
              // methods are _accessed_, not actually set.
              ACCESS_COUNTS.get(self) > 0 ||
                IS_CREATING_ARRAY ||
                typeof prop === 'symbol' ||
                (isNaN(prop as any) && prop !== 'length')
            );
          } else if (
            prop === 'length' ||
            prop === 'entries' ||
            prop === 'values' ||
            prop === 'keys' ||
            (typeof prop !== 'symbol' && !isNaN(prop as any))
          ) {
            // entangle
            get(self, ARRAY_KEY as any);
          }

          return Reflect.get(target, prop);
        },

        set(target, prop, value) {
          if (DEBUG && !USE_PROXY) {
            assert(
              `You attempted to set a value in this TrackedArray directly via: ${String(
                prop
              )}. This works in modern browsers, but does _not_ work in older browsers like IE. If you want to set values in TrackedArrays like this, set  the \`USE_PROXY\` option for TrackedBuiltIns to true. Otherwise, make sure you are using KVO compliant methods, such as \`set\`.`,
              ACCESS_COUNTS.get(self) > 0 ||
                IS_CREATING_ARRAY ||
                typeof prop === 'symbol' ||
                (isNaN(prop as any) && prop !== 'length')
            );
          } else if (
            typeof prop !== 'symbol' &&
            (!isNaN(prop as any) || prop === 'length')
          ) {
            // update
            notifyPropertyChange(self, ARRAY_KEY);
          }

          return Reflect.set(target, prop, value);
        },
      });
    }

    if (DEBUG) {
      ACCESS_COUNTS.set(self, 0);
    }

    return self;
  }

  get(i: number): T {
    return this[i];
  }

  set(i: number, value: T): T {
    return (this[i] = value);
  }

  getLength(): number {
    return this.length;
  }

  setLength(length: number): number {
    return (this.length = length);
  }
}

if ((DEBUG && !USE_PROXY) || !SUPPORTS_PROXY) {
  function patch<T>(prototype: T, key: keyof T, wrap: (fn: any) => any) {
    if (key in prototype) {
      prototype[key] = wrap(prototype[key] as any);
    }
  }

  let patchWithAccessCounter;

  if (DEBUG) {
    patchWithAccessCounter = function<T>(
      prototype: T,
      key: keyof T,
      notify: <K>(arr: TrackedArray<K>) => void
    ) {
      patch(prototype, key, fn => {
        return function<K>(this: TrackedArray<K>) {
          if (DEBUG) {
            ACCESS_COUNTS.set(this, ACCESS_COUNTS.get(this) + 1);
          }

          notify(this);
          let ret = fn.apply(this, arguments);

          if (DEBUG) {
            ACCESS_COUNTS.set(this, ACCESS_COUNTS.get(this) - 1);
          }

          return ret;
        };
      });
    };
  } else {
    patchWithAccessCounter = function<T>(
      prototype: T,
      key: keyof T,
      notify: <K>(arr: TrackedArray<K>) => void
    ) {
      patch(prototype, key, fn => {
        return function<K>(this: TrackedArray<K>) {
          notify(this);
          return fn.apply(this, arguments);
        };
      });
    };
  }

  const ARRAY_GETTER_METHODS = [
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
    'get',
    'getLength',
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
  ] as const;

  const ARRAY_SETTER_METHODS = [
    'copyWithin',
    'pop',
    'push',
    'set',
    'setLength',
    'shift',
    'splice',
    'unshift',
  ] as const;

  const ARRAY_GET_SET_METHODS = ['reverse', 'sort', 'splice'] as const;

  for (let methodName of ARRAY_GETTER_METHODS) {
    // @ts-ignore
    patchWithAccessCounter(TrackedArray.prototype, methodName, arr => {
      if (STRICT_PROXY_ACCESS) {
        get(arr, ARRAY_KEY as any);
      }
    });
  }

  for (let methodName of ARRAY_SETTER_METHODS) {
    patchWithAccessCounter(TrackedArray.prototype, methodName, arr => {
      notifyPropertyChange(arr, ARRAY_KEY);
    });
  }

  for (let methodName of ARRAY_GET_SET_METHODS) {
    patchWithAccessCounter(TrackedArray.prototype, methodName, arr => {
      if (STRICT_PROXY_ACCESS) {
        get(arr, ARRAY_KEY as any);
      }

      notifyPropertyChange(arr, ARRAY_KEY);
    });
  }

  if (typeof Symbol !== undefined) {
    TrackedArray.prototype[Symbol.iterator] = TrackedArray.prototype.values;
  }

  if (DEBUG) {
    function patchWithCreationFlag<T>(prototype: T, key: keyof T) {
      patch(prototype, key, fn => {
        return function<K>(this: TrackedArray<K>) {
          IS_CREATING_ARRAY = true;

          let ret = fn.apply(this, arguments);

          IS_CREATING_ARRAY = false;

          return ret;
        };
      });
    }

    const ARRAY_CREATION_METHODS = [
      'concat',
      'slice',
      'splice',
      'filter',
      'map',
      'flat',
      'flatMap',
    ] as const;

    const ARRAY_CREATION_STATIC_METHODS = ['from', 'of'] as const;

    for (let methodName of ARRAY_CREATION_METHODS) {
      // @ts-ignore
      patchWithCreationFlag(TrackedArray.prototype, methodName);
    }

    for (let methodName of ARRAY_CREATION_STATIC_METHODS) {
      patchWithCreationFlag(TrackedArray, methodName);
    }
  }
}
