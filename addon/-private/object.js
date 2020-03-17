import { consumeKey, dirtyKey } from 'tracked-maps-and-sets/-private/util';
import { notifyPropertyChange } from '@ember/object';

function createProxy<T>(obj: { [key: string]: T } = {}) {
  return new Proxy(obj, {
    get(target, prop) {
      consumeKey(target, prop);

      return (target as any)[prop];
    },

    set(target, prop, value, receiver) {
      (target as any)[prop] = value;

      dirtyKey(target, prop);

      // We need to notify this way to make {{each-in}} update
      notifyPropertyChange(receiver, '_SOME_PROP_');

      return true;
    },

    getPrototypeOf() {
      return TrackedObject.prototype;
    },
  });
}

export default class TrackedObject {
  static fromEntries(entries: Iterable<readonly [PropertyKey, T]>): { [k in PropertyKey]: T } {
    return createProxy(Object.fromEntries(entries));
  }

  constructor(obj = {}) {
    let proto = Object.getPrototypeOf(obj);
    let descs = Object.getOwnPropertyDescriptors(obj)

    let clone = Object.create(proto);

    for (let prop in descs) {
      Object.defineProperty(clone, prop, descs[prop]);
    }

    return createProxy(clone);
  }
}
