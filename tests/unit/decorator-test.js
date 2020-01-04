import {
  tracked,
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
} from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('decorator', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', assert => {
    class Foo {
      @tracked map = new Map();
      @tracked weakMap = new WeakMap();
      @tracked set = new Set();
      @tracked weakSet = new WeakSet();
    }

    let foo = new Foo();

    assert.ok(foo.map instanceof TrackedMap);
    assert.ok(foo.weakMap instanceof TrackedWeakMap);
    assert.ok(foo.set instanceof TrackedSet);
    assert.ok(foo.weakSet instanceof TrackedWeakSet);
  });
});
