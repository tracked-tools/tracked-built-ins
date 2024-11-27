tracked-built-ins [![GitHub Actions Build Status](https://github.com/tracked-tools/tracked-built-ins/workflows/CI/badge.svg)](https://github.com/tracked-tools/tracked-built-ins/actions/workflows/CI.yml?query=branch%3Amaster)
==============================================================================

This addon provides tracked versions of JavaScript's built-ins:

```js
import {
  TrackedObject,
  TrackedArray,
  TrackedMap,
  TrackedSet,
  TrackedWeakMap,
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

  obj = tracked({});
  arr = tracked([]);
  map = tracked(Map);
  set = tracked(Set);
  weakMap = tracked(WeakMap);
  weakSet = tracked(WeakSet);
}
```

**Note:** This addon does _NOT_ support IE 11 or older browsers. If you need to support them,
consider using [tracked-maps and sets](https://github.com/pzuraq/tracked-maps-and-sets) instead.

Installation
------------------------------------------------------------------------------

```
ember install tracked-built-ins
```

Usage
------------------------------------------------------------------------------

See the MDN documentation for each class to learn more about it:

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

All public APIs are the same, with a few exceptions:

1. `new TrackedArray()` should receive an _array_ instead of variable number of
   arguments. This decision was due to the confusing nature of `new Array()` in
   general, and for symmetry with the other `new` APIs.

   ```js
   // bad
   new TrackedArray(123);
   new TrackedArray('foo', 'bar', 'baz');

   // good
   new TrackedArray([123]);
   new TrackedArray(['foo', 'bar', 'baz']);
   ```

2. `new TrackedObject()` returns a _copy_ of the object passed back to it,
   whereas `new Object()` will return the _original_ object. This is to prevent
   accidentally mutating the original object.

   ```js
   let original = {};
   let obj = new TrackedObject(original);

   obj.foo = 123;
   original.foo; // undefined;
   ```

3. Static `Array` and `Object` methods that do not create a new Array/Object
   have been omitted. In general, you should use the original static methods for
   these features, since autotracking has nothing to do with them. The static
   methods that are supported are:

   - `Array`
     - `from`
     - `of`
   - `Object`
     - `fromEntries`

   `Object.create` has also been omitted, even though it creates an instance,
   because manual prototype manipulation is an advanced use case in general that
   is not currently supported.

All types will also register as `instanceof` their base type, so they can be
used as fully transparent replacements in most circumstances.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.28 (LTS) or above
* Embroider v3 and greater or ember-auto-import v2.7.0 and greater

### TypeScript

This project follows the current draft of [the Semantic Versioning for TypeScript Types][semver] specification.

- **Currently supported TypeScript versions:** v5.4, 5.5, 5.6, and 5.7
- **Compiler support policy:** [simple majors][sm]
- **Public API:** all published types not in a `-private` module are public

[semver]: https://www.semver-ts.org/
[sm]: https://www.semver-ts.org/#simple-majors

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
