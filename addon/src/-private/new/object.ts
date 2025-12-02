import { trackedObject } from '@ember/reactive/collections';

const config = {
  equals: () => false,
  description: 'TrackedObject from tracked-built-ins',
};

export class TrackedObject {
  static fromEntries(entries: any) {
    return new TrackedObject(Object.fromEntries(entries));
  }

  constructor(obj = {}) {
    const reactive = trackedObject(obj, config);

    return new Proxy(reactive, {
      get(target, prop) {
        const value = Reflect.get(target, prop, target);

        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
      getPrototypeOf() {
        return TrackedObject.prototype;
      },
    });
  }
}
