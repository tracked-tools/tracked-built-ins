import { assert } from '@ember/debug';

import { USE_PROXY } from './config';
import { consume, dirty, SUPPORTS_PROXY } from './util';

export default class TrackedObject extends Object {
  constructor(obj: object) {
    super();

    Object.assign(this, obj);

    assert(
      'You attempted to create a TrackedObject, but you have not enabled Proxy support or you are using a browser that does not support Proxy.',
      SUPPORTS_PROXY && USE_PROXY
    );

    return new Proxy(this, {
      get(target, prop) {
        consume(self, prop);

        return Reflect.get(target, prop);
      },

      set(target, prop, value) {
        dirty(self, prop);

        return Reflect.set(target, prop, value);
      },
    });
  }
}
