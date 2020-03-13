import Component from '@glimmer/component';
import { TrackedMap } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';
//import { eachReactivityTest } from '../helpers/each-reactivity';
import { eachInReactivityTest } from '../helpers/each-in-reactivity';

module('TrackedMap', function(hooks) {
  setupRenderingTest(hooks);

  test('constructor', assert => {
    let map = new TrackedMap([['foo', 123]]);

    assert.equal(map.get('foo'), 123);
    assert.equal(map.size, 1);
  });

  test('works with all kinds of keys', assert => {
    let map = new TrackedMap([
      ['foo', 123],
      [{}, {}],
      [() => {}, 'bar'],
      [123, true],
      [true, false],
      [null, null],
    ]);

    assert.equal(map.size, 6);
  });

  test('get/set', assert => {
    let map = new TrackedMap();

    map.set('foo', 123);
    assert.equal(map.get('foo'), 123);

    map.set('foo', 456);
    assert.equal(map.get('foo'), 456);
  });

  test('has', assert => {
    let map = new TrackedMap();

    assert.equal(map.has('foo'), false);
    map.set('foo', 123);
    assert.equal(map.has('foo'), true);
  });

  test('entries', assert => {
    let map = new TrackedMap();
    map.set(0, 1);
    map.set(1, 2);
    map.set(2, 3);

    let iter = map.entries();

    assert.deepEqual(iter.next().value, [0, 1]);
    assert.deepEqual(iter.next().value, [1, 2]);
    assert.deepEqual(iter.next().value, [2, 3]);
    assert.equal(iter.next().done, true);
  });

  test('keys', assert => {
    let map = new TrackedMap();
    map.set(0, 1);
    map.set(1, 2);
    map.set(2, 3);

    let iter = map.keys();

    assert.equal(iter.next().value, 0);
    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().done, true);
  });

  test('values', assert => {
    let map = new TrackedMap();
    map.set(0, 1);
    map.set(1, 2);
    map.set(2, 3);

    let iter = map.values();

    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().value, 3);
    assert.equal(iter.next().done, true);
  });

  test('forEach', assert => {
    let map = new TrackedMap();
    map.set(0, 1);
    map.set(1, 2);
    map.set(2, 3);

    let count = 0;
    let values = '';

    map.forEach((v, k) => {
      count++;
      values += k;
      values += v;
    });

    assert.equal(count, 3);
    assert.equal(values, '011223');
  });

  test('size', assert => {
    let map = new TrackedMap();
    assert.equal(map.size, 0);

    map.set(0, 1);
    assert.equal(map.size, 1);

    map.set(1, 2);
    assert.equal(map.size, 2);

    map.delete(1);
    assert.equal(map.size, 1);

    map.set(0, 3);
    assert.equal(map.size, 1);
  });

  test('delete', assert => {
    let map = new TrackedMap();

    assert.equal(map.has(0), false);

    map.set(0, 123);
    assert.equal(map.has(0), true);

    map.delete(0);
    assert.equal(map.has(0), false);
  });

  test('clear', assert => {
    let map = new TrackedMap();

    map.set(0, 1);
    map.set(1, 2);
    assert.equal(map.size, 2);

    map.clear();
    assert.equal(map.size, 0);
    assert.equal(map.get(0), undefined);
    assert.equal(map.get(1), undefined);
  });

  reactivityTest(
    'get/set',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'get/set existing value',
    class extends Component {
      map = new TrackedMap([['foo', 456]]);

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'get/set unrelated value',
    class extends Component {
      map = new TrackedMap([['foo', 456]]);

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.set('bar', 123);
      }
    },
    false
  );

  reactivityTest(
    'has',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.has('foo');
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'entries',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.entries();
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'keys',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.keys();
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'values',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.values();
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'forEach',
    class extends Component {
      map = new TrackedMap();

      get value() {
        this.map.forEach(() => {});
        return 'test';
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'size',
    class extends Component {
      map = new TrackedMap();

      get value() {
        return this.map.size;
      }

      update() {
        this.map.set('foo', 123);
      }
    }
  );

  reactivityTest(
    'delete',
    class extends Component {
      map = new TrackedMap([['foo', 123]]);

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.delete('foo');
      }
    }
  );

  reactivityTest(
    'delete unrelated value',
    class extends Component {
      map = new TrackedMap([['foo', 123], ['bar', 456]]);

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.delete('bar');
      }
    },
    false
  );

  reactivityTest(
    'clear',
    class extends Component {
      map = new TrackedMap([['foo', 123]]);

      get value() {
        return this.map.get('foo');
      }

      update() {
        this.map.clear();
      }
    }
  );

  /* TODO
   *
   * You can't currently #each over a built-in Map in Ember--even though it has
   * an iterator that yields tuples (two-element arrays containing key-value
   * pairs) so it should ostensibly work. If and when that changes, we can
   * enable these tests...
   *
  eachReactivityTest(
    'set',
    class extends Component {
      collection = new TrackedMap([['foo', 123]]);

      update() {
        this.collection.set('bar', 456);
      }
    }
  );

  eachReactivityTest(
    'set existing value',
    class extends Component {
      collection = new TrackedMap([['foo', 123]]);

      update() {
        this.collection.set('foo', 789);
      }
    }
  );
   *
   */

  eachInReactivityTest(
    'set',
    class extends Component {
      collection = new TrackedMap([['foo', 123]]);

      update() {
        this.collection.set('bar', 456);
      }
    }
  );

  eachInReactivityTest(
    'set existing value',
    class extends Component {
      collection = new TrackedMap([['foo', 123]]);

      update() {
        this.collection.set('foo', 789);
      }
    }
  );
});
