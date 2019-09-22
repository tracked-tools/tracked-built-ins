import {
  tracked,
  TrackedArray,
  TrackedObject,
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
  setTrackedBuiltInsConfig,
} from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('decorator', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', assert => {
    class Foo {
      @tracked arr = [];
      @tracked obj = {};
      @tracked map = new Map();
      @tracked weakMap = new WeakMap();
      @tracked set = new Set();
      @tracked weakSet = new WeakSet();
    }

    let foo = new Foo();

    assert.ok(foo.arr instanceof TrackedArray);
    assert.ok(foo.map instanceof TrackedMap);
    assert.ok(foo.weakMap instanceof TrackedWeakMap);
    assert.ok(foo.set instanceof TrackedSet);
    assert.ok(foo.weakSet instanceof TrackedWeakSet);

    assert.notOk(foo.obj instanceof TrackedObject);
  });

  module('USE_PROXY=true', hooks => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));

    test('it works', assert => {
      class Foo {
        @tracked arr = [];
        @tracked obj = {};
        @tracked map = new Map();
        @tracked weakMap = new WeakMap();
        @tracked set = new Set();
        @tracked weakSet = new WeakSet();
      }

      let foo = new Foo();

      assert.ok(foo.arr instanceof TrackedArray);
      assert.ok(foo.obj instanceof TrackedObject);
      assert.ok(foo.map instanceof TrackedMap);
      assert.ok(foo.weakMap instanceof TrackedWeakMap);
      assert.ok(foo.set instanceof TrackedSet);
      assert.ok(foo.weakSet instanceof TrackedWeakSet);
    });
  });
});
