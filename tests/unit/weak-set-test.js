import Component from '@glimmer/component';
import { TrackedWeakSet } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';

module('TrackedWeakSet', function(hooks) {
  setupRenderingTest(hooks);

  test('constructor', assert => {
    let obj = {};
    let set = new TrackedWeakSet([obj]);

    assert.equal(set.has(obj), true);
  });

  test('does not work with built-ins', assert => {
    let set = new TrackedWeakSet();

    assert.throws(() => set.add('aoeu'), /Invalid value used in weak set/);
    assert.throws(() => set.add(true), /Invalid value used in weak set/);
    assert.throws(() => set.add(123), /Invalid value used in weak set/);
    assert.throws(() => set.add(undefined), /Invalid value used in weak set/);
  });

  test('add/has', assert => {
    let obj = {};
    let set = new TrackedWeakSet();

    set.add(obj);
    assert.equal(set.has(obj), true);
  });

  test('delete', assert => {
    let obj = {};
    let set = new TrackedWeakSet();

    assert.equal(set.has(obj), false);

    set.add(obj);
    assert.equal(set.has(obj), true);

    set.delete(obj);
    assert.equal(set.has(obj), false);
  });

  reactivityTest(
    'add/has',
    class extends Component {
      obj = {};
      set = new TrackedWeakSet();

      get value() {
        return this.set.has(this.obj);
      }

      update() {
        this.set.add(this.obj);
      }
    }
  );

  reactivityTest(
    'add/has existing value',
    class extends Component {
      obj = {};
      obj2 = {};
      set = new TrackedWeakSet([this.obj]);

      get value() {
        return this.set.has(this.obj);
      }

      update() {
        this.set.add(this.obj);
      }
    }
  );

  reactivityTest(
    'add/has unrelated value',
    class extends Component {
      obj = {};
      obj2 = {};
      set = new TrackedWeakSet();

      get value() {
        return this.set.has(this.obj);
      }

      update() {
        this.set.add(this.obj2);
      }
    },
    false
  );

  reactivityTest(
    'delete',
    class extends Component {
      obj = {};
      obj2 = {};
      set = new TrackedWeakSet([this.obj, this.obj2]);

      get value() {
        return this.set.has(this.obj);
      }

      update() {
        this.set.delete(this.obj);
      }
    }
  );

  reactivityTest(
    'delete unrelated value',
    class extends Component {
      obj = {};
      obj2 = {};
      set = new TrackedWeakSet([this.obj, this.obj2]);

      get value() {
        return this.set.has(this.obj);
      }

      update() {
        this.set.delete(this.obj2);
      }
    },
    false
  );
});
