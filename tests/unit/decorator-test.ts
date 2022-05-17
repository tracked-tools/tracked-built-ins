import {
  tracked,
  TrackedObject,
  TrackedArray,
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
} from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { expectTypeOf } from 'expect-type';

module('decorator', function (hooks) {
  setupRenderingTest(hooks);

  test('it works as a decorator', (assert) => {
    expectTypeOf(tracked).toMatchTypeOf<PropertyDecorator>();

    class Foo {
      @tracked prop = 123;
    }

    let foo = new Foo();

    assert.equal(foo.prop, 123, 'prop works correctly');

    foo.prop = 456;

    assert.equal(foo.prop, 456, 'prop updates correctly');
  });

  test('it works to wrap built-ins by instance', (assert) => {
    let obj = tracked({ neat: true });
    let arr = tracked([1, 2, 3]);
    let map = tracked(new Map<string, number>());
    let set = tracked(new Set<number>());
    let weakMap = tracked(new WeakMap<object, string>());
    let weakSet = tracked(new WeakSet<object>());

    assert.ok(obj instanceof TrackedObject, 'obj instanceof TrackedObject');
    expectTypeOf(obj).toEqualTypeOf<{ neat: boolean }>();
    assert.ok(arr instanceof TrackedArray, 'arr instanceof TrackedArray');
    expectTypeOf(arr).toEqualTypeOf<TrackedArray<number>>();
    assert.ok(map instanceof TrackedMap, 'map instanceof TrackedMap');
    expectTypeOf(map).toEqualTypeOf<TrackedMap<string, number>>();
    assert.ok(set instanceof TrackedSet, 'set instanceof TrackedSet');
    expectTypeOf(set).toEqualTypeOf<TrackedSet<number>>();
    assert.ok(
      weakMap instanceof TrackedWeakMap,
      'weakMap instanceof TrackedWeakMap'
    );
    expectTypeOf(weakMap).toEqualTypeOf<TrackedWeakMap<object, string>>();
    assert.ok(
      weakSet instanceof TrackedWeakSet,
      'weakSet instanceof TrackedWeakSet'
    );
    expectTypeOf(weakSet).toEqualTypeOf<TrackedWeakSet<object>>();

    assert.ok(obj instanceof Object, 'obj instanceof Object');
    // The whole point here is that Object *is* the thing we are matching, ESLint!
    // eslint-disable-next-line @typescript-eslint/ban-types
    expectTypeOf(obj).toMatchTypeOf<Object>();
    assert.ok(arr instanceof Array, 'arr instanceof Array');
    expectTypeOf(arr).toMatchTypeOf<Array<number>>();
    assert.ok(map instanceof Map, 'map instanceof Map');
    expectTypeOf(map).toMatchTypeOf<Map<string, number>>();
    assert.ok(set instanceof Set, 'set instanceof Set');
    expectTypeOf(set).toMatchTypeOf<Set<number>>();
    assert.ok(weakMap instanceof WeakMap, 'weakMap instanceof WeakMap');
    expectTypeOf(weakMap).toMatchTypeOf<WeakMap<object, string>>();
    assert.ok(weakSet instanceof WeakSet, 'weakSet instanceof WeakSet');
    expectTypeOf(weakSet).toMatchTypeOf<WeakSet<object>>();
  });

  test('it works to wrap built-ins by constructor', (assert) => {
    let obj = tracked(Object);
    let arr = tracked(Array);
    let map = tracked(Map);
    let set = tracked(Set);
    let weakMap = tracked(WeakMap);
    let weakSet = tracked(WeakSet);

    assert.ok(obj instanceof TrackedObject);
    expectTypeOf(obj).toEqualTypeOf<ObjectConstructor>();
    assert.ok(arr instanceof TrackedArray);
    expectTypeOf(arr).toEqualTypeOf<TrackedArray>();
    assert.ok(map instanceof TrackedMap);
    expectTypeOf(map).toEqualTypeOf<TrackedMap>();
    assert.ok(set instanceof TrackedSet);
    expectTypeOf(set).toEqualTypeOf<TrackedSet>();
    assert.ok(weakMap instanceof TrackedWeakMap);
    expectTypeOf(weakMap).toEqualTypeOf<TrackedWeakMap>();
    assert.ok(weakSet instanceof TrackedWeakSet);
    expectTypeOf(weakSet).toEqualTypeOf<TrackedWeakSet>();
  });

  test('objects, arrays, maps, and sets wrap and keep their values', (assert) => {
    let obj = tracked({ foo: 123 });
    let arr = tracked([456]);
    let map = tracked(new Map([[1, 2]]));
    let set = tracked(new Set([3]));

    assert.equal(obj.foo, 123, 'objects work');
    expectTypeOf(obj).toEqualTypeOf<{ foo: number }>();
    assert.equal(arr[0], 456, 'arrays work');
    expectTypeOf(arr).toEqualTypeOf<TrackedArray<number>>();
    assert.equal(map.get(1), 2, 'maps work');
    expectTypeOf(map).toEqualTypeOf<TrackedMap<number, number>>();
    assert.ok(set.has(3), 'sets work');
    expectTypeOf(set).toEqualTypeOf<TrackedSet<number>>();
  });
});
