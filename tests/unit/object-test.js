import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';
import { eachInReactivityTest } from '../helpers/collection-reactivity';

module('TrackedObject', function(hooks) {
  setupRenderingTest(hooks);

  test('basic usage', assert => {
    let original = { foo: 123 };
    let obj = new TrackedObject(original);

    assert.ok(obj instanceof TrackedObject);
    assert.deepEqual(Object.keys(obj), ['foo']);
    assert.equal(obj.foo, 123);

    obj.foo = 456;
    assert.equal(obj.foo, 456, 'object updated correctly');
    assert.equal(original.foo, 123, 'original object was not updated')
  });

  test('preserves getters', assert => {
    let obj = new TrackedObject({
      foo: 123,
      get bar() {
        return this.foo;
      }
    });

    obj.foo = 456;
    assert.equal(obj.foo, 456, 'object updated correctly');
    assert.equal(obj.bar, 456, 'getter cloned correctly')
  });

  test('fromEntries', assert => {
    let obj = TrackedObject.fromEntries(Object.entries({ foo: 123 }));

    assert.ok(obj instanceof TrackedObject);
    assert.deepEqual(Object.keys(obj), ['foo']);
  });

  eachInReactivityTest(
    '{{each-in}} works with new items',
    class extends Component {
      collection = new TrackedObject({
        foo: 123
      });

      update() {
        this.collection.bar = 456;
      }
    }
  );

  eachInReactivityTest(
    '{{each-in}} works when updating old items',
    class extends Component {
      collection = new TrackedObject({
        foo: 123
      });

      update() {
        this.collection.foo = 456;
      }
    }
  );

  reactivityTest(
    'it works',
    class extends Component {
      obj = new TrackedObject();

      get value() {
        return this.obj.foo;
      }

      update() {
        this.obj.foo = 123;
      }
    }
  );
});
