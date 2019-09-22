import Component from '@glimmer/component';
import { TrackedSet } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';

module('TrackedSet', function(hooks) {
  setupRenderingTest(hooks);

  test('constructor', assert => {
    let set = new TrackedSet(['foo', 123]);

    assert.equal(set.has('foo'), true);
    assert.equal(set.size, 2);
  });

  test('works with all kinds of values', assert => {
    let set = new TrackedSet(['foo', {}, () => {}, 123, true, null]);

    assert.equal(set.size, 6);
  });

  test('add/has', assert => {
    let set = new TrackedSet();

    set.add('foo');
    assert.equal(set.has('foo'), true);
  });

  test('entries', assert => {
    let set = new TrackedSet();
    set.add(0);
    set.add(2);
    set.add(1);

    let iter = set.entries();

    assert.deepEqual(iter.next().value, [0, 0]);
    assert.deepEqual(iter.next().value, [2, 2]);
    assert.deepEqual(iter.next().value, [1, 1]);
    assert.equal(iter.next().done, true);
  });

  test('keys', assert => {
    let set = new TrackedSet();
    set.add(0);
    set.add(2);
    set.add(1);

    let iter = set.keys();

    assert.equal(iter.next().value, 0);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().done, true);
  });

  test('values', assert => {
    let set = new TrackedSet();
    set.add(0);
    set.add(2);
    set.add(1);

    let iter = set.values();

    assert.equal(iter.next().value, 0);
    assert.equal(iter.next().value, 2);
    assert.equal(iter.next().value, 1);
    assert.equal(iter.next().done, true);
  });

  test('forEach', assert => {
    let set = new TrackedSet();
    set.add(0);
    set.add(1);
    set.add(2);

    let count = 0;
    let values = '';

    set.forEach((v, k) => {
      count++;
      values += k;
      values += v;
    });

    assert.equal(count, 3);
    assert.equal(values, '001122');
  });

  test('size', assert => {
    let set = new TrackedSet();
    assert.equal(set.size, 0);

    set.add(0);
    assert.equal(set.size, 1);

    set.add(1);
    assert.equal(set.size, 2);

    set.delete(1);
    assert.equal(set.size, 1);

    set.add(0);
    assert.equal(set.size, 1);
  });

  test('delete', assert => {
    let set = new TrackedSet();

    assert.equal(set.has(0), false);

    set.add(0);
    assert.equal(set.has(0), true);

    set.delete(0);
    assert.equal(set.has(0), false);
  });

  test('clear', assert => {
    let set = new TrackedSet();

    set.add(0);
    set.add(1);
    assert.equal(set.size, 2);

    set.clear();
    assert.equal(set.size, 0);
    assert.equal(set.has(0), false);
    assert.equal(set.has(1), false);
  });

  reactivityTest(
    'add/has',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'add/has existing value',
    class extends Component {
      set = new TrackedSet(['foo']);

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'add/has unrelated value',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.add('bar');
      }
    },
    false
  );

  reactivityTest(
    'entries',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.entries();
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'keys',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.keys();
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'values',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.values();
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'forEach',
    class extends Component {
      set = new TrackedSet();

      get value() {
        this.set.forEach(() => {});
        return 'test';
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'size',
    class extends Component {
      set = new TrackedSet();

      get value() {
        return this.set.size;
      }

      update() {
        this.set.add('foo');
      }
    }
  );

  reactivityTest(
    'delete',
    class extends Component {
      set = new TrackedSet(['foo', 123]);

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.delete('foo');
      }
    }
  );

  reactivityTest(
    'delete unrelated value',
    class extends Component {
      set = new TrackedSet(['foo', 123]);

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.delete(123);
      }
    },
    false
  );

  reactivityTest(
    'clear',
    class extends Component {
      set = new TrackedSet(['foo', 123]);

      get value() {
        return this.set.has('foo');
      }

      update() {
        this.set.clear();
      }
    }
  );
});
