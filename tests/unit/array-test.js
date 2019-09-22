import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TrackedArray, setTrackedBuiltInsConfig } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';

const ARRAY_GETTER_METHODS = [
  'concat',
  'entries',
  'every',
  'fill',
  'filter',
  'find',
  'findIndex',
  'flat',
  'flatMap',
  'forEach',
  'get',
  'getLength',
  'includes',
  'indexOf',
  'join',
  'keys',
  'lastIndexOf',
  'map',
  'reduce',
  'reduceRight',
  'reverse',
  'splice',
  'slice',
  'sort',
  'some',
  'values',
];

const ARRAY_SETTER_METHODS = [
  'copyWithin',
  'pop',
  'push',
  'reverse',
  'set',
  'setLength',
  'shift',
  'sort',
  'splice',
  'unshift',
];

module('TrackedArray', function(hooks) {
  setupRenderingTest(hooks);

  module('methods', () => {
    test('isArray', assert => {
      let arr = new TrackedArray();

      assert.ok(Array.isArray(arr));
    });

    test('length', assert => {
      let arr = new TrackedArray();

      assert.equal(arr.length, 0);

      arr.set(100, 1);

      assert.equal(arr.length, 101);
    });

    test('concat', assert => {
      let arr = new TrackedArray();
      let arr2 = arr.concat([1], TrackedArray.from([2]));

      assert.deepEqual(arr2, [1, 2]);
      assert.ok(arr2 instanceof TrackedArray);
    });

    test('copyWithin', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      arr.copyWithin(1, 0, 1);

      assert.deepEqual(arr, [1, 1, 3]);
    });

    test('entries', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let iter = arr.entries();

      assert.deepEqual(iter.next().value, [0, 1]);
      assert.deepEqual(iter.next().value, [1, 2]);
      assert.deepEqual(iter.next().value, [2, 3]);
      assert.equal(iter.next().done, true);
    });

    test('every', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.ok(arr.every(v => typeof v === 'number'));
      assert.notOk(arr.every(v => v !== 2));
    });

    test('fill', assert => {
      let arr = new TrackedArray(100);
      arr.fill(123);

      let count = 0;
      let isCorrect = true;

      for (let value of arr) {
        count++;
        isCorrect = isCorrect && value === 123;
      }

      assert.equal(count, 100);
      assert.ok(isCorrect);
    });

    test('filter', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let arr2 = arr.filter(v => v > 1);

      assert.deepEqual(arr2, [2, 3]);
      assert.ok(arr2 instanceof TrackedArray);
    });

    test('find', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.find(v => v > 1), 2);
    });

    test('findIndex', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.findIndex(v => v > 1), 1);
    });

    test('flat', assert => {
      let arr = TrackedArray.of(1, 2, [3]);

      assert.deepEqual(arr.flat(), [1, 2, 3]);
      assert.deepEqual(arr, [1, 2, [3]]);
    });

    test('flatMap', assert => {
      let arr = TrackedArray.of(1, 2, [3]);

      assert.deepEqual(arr.flatMap(v => (typeof v === 'number' ? v + 1 : v)), [
        2,
        3,
        3,
      ]);
      assert.deepEqual(arr, [1, 2, [3]]);
    });

    test('forEach', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      arr.forEach((v, i) => assert.equal(v, i + 1));
    });

    test('get', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.get(0), 1);
      assert.equal(arr.get(1), 2);
    });

    test('getLength', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.getLength(), 3);
    });

    test('includes', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.includes(1), true);
      assert.equal(arr.includes(5), false);
    });

    test('indexOf', assert => {
      let arr = TrackedArray.of(1, 2, 1);

      assert.equal(arr.indexOf(1), 0);
      assert.equal(arr.indexOf(5), -1);
    });

    test('join', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.join(','), '1,2,3');
    });

    test('keys', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let iter = arr.keys();

      assert.equal(iter.next().value, 0);
      assert.equal(iter.next().value, 1);
      assert.equal(iter.next().value, 2);
      assert.equal(iter.next().done, true);
    });

    test('lastIndexOf', assert => {
      let arr = TrackedArray.of(3, 2, 3);

      assert.equal(arr.lastIndexOf(3), 2);
      assert.equal(arr.lastIndexOf(5), -1);
    });

    test('map', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let arr2 = arr.map(v => v + 1);

      assert.deepEqual(arr2, [2, 3, 4]);
      assert.ok(arr2 instanceof TrackedArray);
    });

    test('pop', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let val = arr.pop();

      assert.deepEqual(arr, [1, 2]);
      assert.equal(val, 3);
    });

    test('push', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let val = arr.push(4);

      assert.deepEqual(arr, [1, 2, 3, 4]);
      assert.equal(val, 4);
    });

    test('reduce', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.reduce((s, v) => s + v, ''), '123');
    });

    test('reduceRight', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.equal(arr.reduceRight((s, v) => s + v, ''), '321');
    });

    test('reverse', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      arr.reverse();

      assert.deepEqual(arr, [3, 2, 1]);
    });

    test('set', assert => {
      let arr = new TrackedArray();
      arr.set(0, 1);

      assert.deepEqual(arr, [1]);
    });

    test('setLength', assert => {
      let arr = new TrackedArray();
      arr.setLength(100);

      assert.equal(arr.length, 100);
    });

    test('shift', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let val = arr.shift();

      assert.deepEqual(arr, [2, 3]);
      assert.equal(val, 1);
    });

    test('slice', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let arr2 = arr.slice();

      assert.notEqual(arr, arr2);
      assert.ok(arr2 instanceof TrackedArray);
      assert.deepEqual(arr, arr2);
    });

    test('some', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.ok(arr.some(v => v > 1));
      assert.notOk(arr.some(v => v < 1));
    });

    test('sort', assert => {
      let arr = TrackedArray.of(3, 1, 2);
      let arr2 = arr.sort();

      assert.equal(arr, arr2);
      assert.deepEqual(arr, [1, 2, 3]);
    });

    test('sort (with method)', assert => {
      let arr = TrackedArray.of(3, 1, 2, 2);
      let arr2 = arr.sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

      assert.equal(arr, arr2);
      assert.deepEqual(arr, [3, 2, 2, 1]);
    });

    test('splice', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let arr2 = arr.splice(1, 1);

      assert.ok(arr2 instanceof TrackedArray);
      assert.deepEqual(arr, [1, 3]);
      assert.deepEqual(arr2, [2]);
    });

    test('unshift', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let val = arr.unshift(0);

      assert.deepEqual(arr, [0, 1, 2, 3]);
      assert.equal(val, 4);
    });

    test('values', assert => {
      let arr = TrackedArray.of(1, 2, 3);
      let iter = arr.values();

      assert.equal(iter.next().value, 1);
      assert.equal(iter.next().value, 2);
      assert.equal(iter.next().value, 3);
      assert.equal(iter.next().done, true);
    });

    test('of', assert => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.deepEqual(arr, [1, 2, 3]);
    });

    test('from', assert => {
      let arr = TrackedArray.from([1, 2, 3]);

      assert.deepEqual(arr, [1, 2, 3]);
    });
  });

  module('USE_PROXY: true', hooks => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));

    test('Can get values on array directly', assert => {
      let arr = TrackedArray.of('foo');

      assert.equal(arr[0], 'foo');
    });

    test('Can get length on array directly', assert => {
      let arr = TrackedArray.of('foo');

      assert.equal(arr.length, 1);
    });

    test('Can set values on array directly', assert => {
      let arr = new TrackedArray();
      arr[0] = 123;

      assert.equal(arr[0], 123);
    });

    test('Can set length on array directly', assert => {
      let arr = new TrackedArray();
      arr.length = 123;

      assert.equal(arr.length, 123);
    });

    ARRAY_GETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          arr = TrackedArray.from(['foo']);

          get value() {
            return this.arr[method](method === 'get' ? 0 : () => {});
          }

          update() {
            this.arr[0] = 'bar';
          }
        }
      );
    });

    ARRAY_SETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          arr = TrackedArray.of('foo');

          get value() {
            return this.arr[0];
          }

          update() {
            this.arr[method](method === 'setLength' ? 0 : undefined);
          }
        }
      );
    });
  });

  module('USE_PROXY: false', () => {
    test('Can get values on array directly', assert => {
      let arr = TrackedArray.of('foo');

      assert.equal(arr[0], 'foo');
    });

    test('Can get length on array directly', assert => {
      let arr = TrackedArray.of('foo');

      assert.equal(arr.length, 1);
    });

    test('Cannot set values on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => (arr[0] = 123),
        /You attempted to set a value in this TrackedArray directly via: 0/
      );
    });

    test('Cannot set length on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => (arr.length = 123),
        /You attempted to set a value in this TrackedArray directly via: length/
      );
    });

    ARRAY_GETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          @tracked arr = TrackedArray.from(['foo']);

          get value() {
            return this.arr[method](() => {});
          }

          update() {
            this.arr.set(0, 'bar');
          }
        }
      );
    });

    ARRAY_SETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          @tracked arr = TrackedArray.of('foo');

          get value() {
            return this.arr[0];
          }

          update() {
            this.arr[method](method === 'setLength' ? 0 : undefined);
          }
        }
      );
    });
  });

  module('STRICT_PROXY_ACCESS: true', hooks => {
    hooks.beforeEach(() =>
      setTrackedBuiltInsConfig({ STRICT_PROXY_ACCESS: true })
    );
    hooks.afterEach(() =>
      setTrackedBuiltInsConfig({ STRICT_PROXY_ACCESS: false })
    );

    test('Cannot get values on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => arr[0],
        /You attempted to access this TrackedArray directly via: 0/
      );
    });

    test('Cannot get length on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => arr.length,
        /You attempted to access this TrackedArray directly via: length/
      );
    });

    test('Cannot set values on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => (arr[0] = 123),
        /You attempted to set a value in this TrackedArray directly via: 0/
      );
    });

    test('Cannot set length on array directly', assert => {
      let arr = new TrackedArray();

      assert.throws(
        () => (arr.length = 123),
        /You attempted to set a value in this TrackedArray directly via: length/
      );
    });

    ARRAY_GETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          arr = TrackedArray.from(['foo']);

          get value() {
            return this.arr[method](() => {});
          }

          update() {
            this.arr.set(0, 'bar');
          }
        }
      );
    });

    ARRAY_SETTER_METHODS.forEach(method => {
      reactivityTest(
        method,
        class extends Component {
          @tracked arr = TrackedArray.of('foo');

          get value() {
            return this.arr.get(0);
          }

          update() {
            this.arr[method](method === 'setLength' ? 0 : undefined);
          }
        }
      );
    });
  });
});
