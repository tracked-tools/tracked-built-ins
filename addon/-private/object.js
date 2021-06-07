import { notifyPropertyChange } from "@ember/object";
import { createTagsCache } from "./tags-cache";

const OBJECT_KEYS = Symbol("objectKeys");

function createProxy(obj = {}) {
  const propsTags = createTagsCache();
  const keysTags = createTagsCache();

  return new Proxy(obj, {
    get(target, p) {
      propsTags.track(p);
      return Reflect.get(target, p);
    },

    set(target, p, value, receiver) {
      const isNewKey = !Reflect.has(target, p);
      const currentValue = Reflect.get(target, p);
      const result = Reflect.set(target, p, value);

      if (isNewKey) {
        keysTags.dirty(OBJECT_KEYS);
        keysTags.dirty(p);
      }

      if (currentValue !== value) propsTags.dirty(p);

      notifyPropertyChange(receiver, "_SOME_PROP_");

      return result;
    },

    has(target, p) {
      keysTags.track(p);
      return Reflect.has(target, p);
    },

    ownKeys(target) {
      keysTags.track(OBJECT_KEYS);
      return Reflect.ownKeys(target);
    },

    defineProperty(target, p, attributes) {
      const result = Reflect.defineProperty(target, p, attributes);
      const value = Reflect.get(target, p);

      keysTags.dirty(OBJECT_KEYS);
      keysTags.dirty(p);
      if (value !== undefined) propsTags.dirty(p);

      return result;
    },

    deleteProperty(target, p) {
      const currentValue = Reflect.get(target, p);
      const result = Reflect.deleteProperty(target, p);

      keysTags.dirty(OBJECT_KEYS);
      keysTags.dirty(p);
      if (currentValue !== undefined) propsTags.dirty(p);

      return result;
    },

    getPrototypeOf() {
      return TrackedObject.prototype;
    },
  });
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
