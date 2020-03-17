tracked-built-ins
==============================================================================

This addon provides tracked versions of JavaScript's built-ins:

```js
import {
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
} from 'tracked-built-ins';
```

These classes have the same APIs as their native equivalents, but reading from
them or writing to them will be tracked, allowing you to use them in your Ember
apps and have changes automatically propagate!

Also included is an enhanced version of the `@tracked` decorator, which
automatically shallow-wraps the native versions of these classes:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  @tracked value = 123;

  map = tracked(Map);
  weakMap = tracked(WeakMap);
  set = tracked(Set);
  weakSet = tracked(WeakSet);
}
```

Installation
------------------------------------------------------------------------------

```
ember install tracked-built-ins
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
