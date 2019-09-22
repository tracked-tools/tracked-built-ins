tracked-built-ins
==============================================================================

This addon provides tracked versions of JavaScript's built-in built-ins:

```js
import {
  TrackedArray,
  TrackedObject,
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
} from 'tracked-built-ins';
```

These classes have the same APIs as their native equivalents, but reading from
them or writing to them will be tracked, allowing you to use them in your Ember
apps and have changes automatically propagate!

> Note: `TrackedArray` and `TrackedObject` have major caveats with the default
> settings, for performance and compatibility reasons. Read the [Usage](#usage)
> section thoroughly to understand these caveats.

Also included is an enhanced version of the `@tracked` decorator, which
automatically shallow-wraps the native versions of these classes:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  @tracked arr = [];
  @tracked obj = {}; // Works with USE_PROXY=true
  @tracked map = new Map();
  @tracked weakMap = new WeakMap();
  @tracked set = new Set();
  @tracked weakSet = new WeakSet();
}
```

Installation
------------------------------------------------------------------------------

```
ember install tracked-built-ins
```

Usage
------------------------------------------------------------------------------

As mentioned above, the tracked built-ins have the same usage as their native
equivalents, with the exception of `TrackedArray` and `TrackedObject`. In order
to make these types fully tracked, we must use the native
[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
API. This comes with two major caveats:

1. `Proxy` is _not_ available on IE11 or other older browsers
2. Proxies have significant performance implications, since they intercept every
   access to their target object.

Because of this, usage of `Proxy` is disabled by default. If you do not need to
support IE11 or older browsers, and if you are not as concerned with
performance, you can enable them by setting the `USE_PROXY` option to true
in `config/environment.js`:

```js
let ENV = {
  // ...

  trackedBuiltIns: {
    USE_PROXY: true,
  },
};
```

However, by default this library also operates in a loose mode that allows you
to mostly use native syntax:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  @tracked arr = [1, 2, 3];

  get tail() {
    let [head, ...tail] = this.arr;

    return tail;
  }
}
```

This loose mode does have some rules that may be a bit trickier to follow, which
are described in greater detail below. If you want more strict behavior, you can
enable the `STRICT_PROXY_ACCESS` option in `config/environment.js`:

```js
let ENV = {
  // ...

  trackedBuiltIns: {
    STRICT_PROXY_ACCESS: true,
  },
};
```

### `TrackedArray`

#### Default Behavior

By default, you can access arrays using native syntax:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  @tracked arr = [1, 2, 3];

  get head() {
    let [head] = this.arr;

    return head;
  }

  get tail() {
    let [head, ...tail] = this.arr;

    return tail;
  }
}
```

However, arrays _must_ always be accessed as tracked properties, in order to
be tracked correctly.

```js
import { TrackedArray } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';

class Foo {
  // This will autotrack
  @tracked arr = TrackedArray.from([1, 2, 3]);

  // This will _not_ autotrack
  arr2 = TrackedArray.from([3, 2, 1]);
}
```

This means you cannot necessarily move arrays around and assign them in other
places. If the array is passed around between components as an _argument_, or
otherwise through the template layer, it should be fine. You can also use
`Ember.get` to access the array, or return the array from a `@computed`
property, and it should autotrack correctly.

In order to update the array and its length, you must use _setter_ methods that
have been added to `TrackedArray`:

```js
class Foo {
  @tracked arr = TrackedArray.from([1, 2, 3]);

  updateValue() {
    this.arr[0] = 2; // this doesn't work
    this.arr.set(0, 2); // this.arr === [2, 2, 3];
  }

  updateLength() {
    this.arr.length = 100; // this doesn't work
    this.arr.setLength(100); // this.arr.length === 100
  }
}
```

However, this is only for setting array values/length directly. You can use
standard array methods such as `push`, `pop`, `shift`, etc. and they will update
correctly:

```js
class Foo {
  @tracked arr = TrackedArray.from([1, 2, 3]);

  pushValue() {
    this.arr.push(4); // this.arr === [1, 2, 3, 4];
  }
}
```

#### `USE_PROXY=true` Behavior

With `USE_PROXY=true`, you can treat `TrackedArrays` just like normal arrays:

```js
import { TrackedArray } from 'tracked-built-ins';

class Foo {
  // This will autotrack whenever the array is accessed, using any syntax
  arr2 = TrackedArray.from([3, 2, 1]);
}
```

#### `STRICT_PROXY_ACCESS=true` Behavior

With `STRICT_PROXY_ACCESS=true`, you must use the setter methods _and_ the
getter methods when interacting with the array:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  @tracked arr = [1, 2, 3];

  get head() {
    return this.arr.get(0);
  }

  get tail() {
    return this.arr.slice(1);
  }
}
```

Like with setters, normal array methods will work and autotrack correctly. Since
this mode requires all accesses and updates to go through getter/setter methods,
you can move arrays around and assign them anywhere.

### `TrackedObject`

#### Default Behavior

By default `TrackedObject` is disabled when proxies are disabled. Attempting to
create one will cause an error. Consider using `TrackedMap` as an alternative.

#### `USE_PROXY=true` Behavior

With proxies enabled, you'll be able to use tracked objects as expected. They
work just like any other object:

```js
class Foo {
  obj = new TrackedObject();

  get value() {
    return this.obj['some-key'];
  }

  set value(val) {
    this.obj['some-key'] = val;
  }
}
```

### `@tracked`

#### Default Behavior

Since `TrackedObject` is disabled when proxies are disabled, the shallow
wrapping in `@tracked` will leave objects alone:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  // Changes to this object are _not_ autotracked
  @tracked obj = {};
}
```

#### `USE_PROXY=true` Behavior

With proxies enabled, the shallow wrapping in `@tracked` will wrap objects in
a `TrackedObject`:

```js
import { tracked } from 'tracked-built-ins';

class Foo {
  // Changes to this object _are_ autotracked
  @tracked obj = {};
}
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
