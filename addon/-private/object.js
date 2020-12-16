import { consumeKey, dirtyKey } from 'tracked-maps-and-sets/-private/util';
import { notifyPropertyChange } from '@ember/object';
import { DEBUG } from '@glimmer/env';

const COLLECTION = Symbol();

if (DEBUG) {
  // patch mandatory setter
  // eslint-disable-next-line no-undef
  let utils = Ember.__loader.require('@ember/-internals/utils')
  let originalSetupMandatorySetter = utils.setupMandatorySetter;

  utils.setupMandatorySetter = (tag, obj, keyName) => {
    if (obj instanceof TrackedObject) {
      return;
    }

    return originalSetupMandatorySetter(tag, obj, keyName);
  }
}

const proxyHandler = {
  get(target, prop) {
    consumeKey(target, prop);

    return target[prop];
  },

  has(target, prop) {
    consumeKey(target, prop);

    return prop in target;
  },

  ownKeys(target) {
    consumeKey(target, COLLECTION);

    return Reflect.ownKeys(target);
  },

  set(target, prop, value, receiver) {
    target[prop] = value;

    dirtyKey(target, prop);
    dirtyKey(target, COLLECTION);

    // We need to notify this way to make {{each-in}} update
    notifyPropertyChange(receiver, '_SOME_PROP_');

    return true;
  },

  deleteProperty(target, prop, receiver) {
    if (!(prop in target)) { return; }

    delete target[prop];

    dirtyKey(target, COLLECTION);

    // We need to notify this way to make {{each-in}} update
    notifyPropertyChange(receiver, '_SOME_PROP_');
  },

  getPrototypeOf() {
    return TrackedObject.prototype;
  },
};

function createProxy(obj = {}) {
  return new Proxy(obj, proxyHandler);
}

export default class TrackedObject {
  static fromEntries(entries) {
    return createProxy(Object.fromEntries(entries));
  }

  constructor(obj = {}) {
    let proto = Object.getPrototypeOf(obj);
    let descs = Object.getOwnPropertyDescriptors(obj);

    let clone = Object.create(proto);

    for (let prop in descs) {
      Object.defineProperty(clone, prop, descs[prop]);
    }

    return createProxy(clone);
  }
}
