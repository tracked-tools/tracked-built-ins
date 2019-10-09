import { assert } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { USE_PROXY } from './config';
import { consume, dirty, SUPPORTS_PROXY } from './util';

const setterPropertyPrefix = '__PROPERTY__';

function defineHiddenProperty(obj: object, propertyName: string, value: any) {
  Object.defineProperty(obj, propertyName, {
    enumerable: false,
    configurable: true,
    writable: true,
    value
  })
}

function patchObjectDescriptor(obj: object, keyName: string, desc: PropertyDescriptor) {
  if (desc.configurable === false) {
    return;
  }
  if (typeof desc.get === 'function' || typeof desc.set === 'function') {
    return;
  }
  const key = `${setterPropertyPrefix}${keyName}`;
  defineHiddenProperty(obj, key, desc.value);
  Object.defineProperty(obj, keyName, {
    enumerable: desc.enumerable,
    configurable: true,
    get() {
      consume(this, keyName);
      return (this as any)[key];
    },
    set(value) {
      dirty(this, keyName);
      (this as any)[key] = value;
    }
  });
}

const proxyHandler = {
  get(target: object, prop: string) {
    consume(target, prop);
    return Reflect.get(target, prop);
  },

  set(target: object, prop: string, value: any) {
    dirty(target, prop);
    return Reflect.set(target, prop, value);
  }
}

export default class TrackedObject extends Object {
  constructor(obj: object = {}) {
    super();

    assert(
      'You attempted to create a TrackedObject, but you have not enabled Proxy support or you are using a browser that does not support Proxy.',
      USE_PROXY ? SUPPORTS_PROXY : true
    );
    
    Object.assign(this, obj);

    if (USE_PROXY === false) {
      Object.keys(obj).forEach((keyName)=>{
        const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(obj, keyName) as PropertyDescriptor;
        patchObjectDescriptor(this, keyName, desc);
      });
      if (DEBUG) {
        return Object.seal(this);
      } else {
        return this;
      }
    }

    return new Proxy(this, proxyHandler);
  }
}
