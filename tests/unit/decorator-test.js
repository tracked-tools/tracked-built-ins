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

  test('it works as a decorator', assert => {
    class Foo {
      @tracked prop = 123;
    }

    let foo = new Foo();

    assert.equal(foo.prop, 123, 'prop works correctly');

    foo.prop = 456;

    assert.equal(foo.prop, 456, 'prop updates correctly');
  });

  test('it works to wrap built-ins by instance', assert => {
    let map = tracked(new Map());
    let set = tracked(new Set());
    let weakMap = tracked(new WeakMap());
    let weakSet = tracked(new WeakSet());

    assert.ok(map instanceof TrackedMap);
    assert.ok(set instanceof TrackedSet);
    assert.ok(weakMap instanceof TrackedWeakMap);
    assert.ok(weakSet instanceof TrackedWeakSet);
  });

  test('it works to wrap built-ins by constructor', assert => {
    let map = tracked(Map);
    let set = tracked(Set);
    let weakMap = tracked(WeakMap);
    let weakSet = tracked(WeakSet);

    assert.ok(map instanceof TrackedMap);
    assert.ok(set instanceof TrackedSet);
    assert.ok(weakMap instanceof TrackedWeakMap);
    assert.ok(weakSet instanceof TrackedWeakSet);
  });

  test('maps and sets wrap and keep their values', assert => {
    let map = tracked(new Map([[1, 2]]));
    let set = tracked(new Set([3]));

    assert.equal(map.get(1), 2, 'maps work');
    assert.ok(set.has(3), 'sets work');
  });
});
