import Component from '@glimmer/component';
import { TrackedArray } from 'tracked-built-ins';
import { expectTypeOf } from 'expect-type';
import { getSpliceMutatedIndexes } from 'tracked-built-ins/-private/array';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';
import {
  eachReactivityTest,
  eachInReactivityTest,
} from '../helpers/collection-reactivity';

const ARRAY_GETTER_METHODS = [
  'concat',
  'entries',
  'every',
  'filter',
  'find',
  'findIndex',
  'flat',
  'flatMap',
  'forEach',
  'includes',
  'indexOf',
  'join',
  'keys',
  'lastIndexOf',
  'map',
  'reduce',
  'reduceRight',
  'slice',
  'some',
  'values',
];

const ARRAY_SETTER_METHODS = [
  'copyWithin',
  'fill',
  'pop',
  'push',
  'reverse',
  'shift',
  'sort',
  'splice',
  'unshift',
];

const SPLICE_MUTATED_INDEXES = [
  { array: [0, 1, 2], start: 0, deleteCount: undefined, expected: [] },
  { array: [0, 1, 2], start: 0, deleteCount: 0, expected: [] },
  { array: [0, 1, 2], start: 0, deleteCount: 1, expected: [0] },
  { array: [0, 1, 2], start: 1, deleteCount: 1, expected: [1] },
  { array: [0, 1, 2], start: -1, deleteCount: 1, expected: [2] },
];

// We can use a `TrackedArray<T>` anywhere we can use an `Array<T>` (but not
// vice versa).
expectTypeOf<TrackedArray<unknown>>().toMatchTypeOf<Array<unknown>>();

module('TrackedArray', function (hooks) {
  setupRenderingTest(hooks);

  test('Can get values on array directly', (assert) => {
    let arr = new TrackedArray(['foo']);

    assert.equal(arr[0], 'foo');
  });

  test('Can get length on array directly', (assert) => {
    let arr = new TrackedArray(['foo']);

    assert.equal(arr.length, 1);
  });

  test('Can set values on array directly', (assert) => {
    let arr = new TrackedArray();
    arr[0] = 123;

    assert.equal(arr[0], 123);
  });

  test('Can set length on array directly', (assert) => {
    let arr = new TrackedArray();
    arr.length = 123;

    assert.equal(arr.length, 123);
  });

  test('Can clear array by setting length to 0', (assert) => {
    let arr = new TrackedArray([123]);
    arr.length = 0;

    assert.equal(arr.length, 0);
    assert.equal(arr[0], undefined);
  });

  test('Can perform well compared to native array', (assert) => {
    const itemsCount = 10000;
    const initialData = Array(itemsCount).fill(null);

    const array1 = Array.from(initialData);
    const t1 = performance.now();
    array1.splice(0, 1);
    const t2 = performance.now();
    let controlWindow = t2 - t1;
    if (controlWindow < 1) {
      controlWindow = 1;
    }

    const array2 = new TrackedArray(initialData);
    const t3 = performance.now();
    array2.splice(0, 1);
    const t4 = performance.now();
    const experimentWindow = t4 - t3;

    const deviation = 1.2; // 20%
    assert.ok(
      experimentWindow < controlWindow * deviation,
      `${experimentWindow} < ${controlWindow} * ${deviation}`,
    );

    assert.equal(initialData.length, itemsCount);
    assert.equal(array1.length, itemsCount - 1);
    assert.equal(array2.length, itemsCount - 1);
  });

  module('getSpliceMutatedIndexes', () => {
    SPLICE_MUTATED_INDEXES.forEach((check) => {
      test(`splice mutated indexes ${check.start}, ${check.deleteCount}, ${check.array.length}`, (assert) => {
        const actual = getSpliceMutatedIndexes(
          check.array,
          check.start,
          check.deleteCount,
        );
        assert.deepEqual(actual, check.expected);
      });
    });
  });

  module('methods', () => {
    test('isArray', (assert) => {
      let arr = new TrackedArray();

      assert.ok(Array.isArray(arr));
    });

    test('length', (assert) => {
      let arr = new TrackedArray();

      assert.equal(arr.length, 0);

      arr[100] = 1;

      assert.equal(arr.length, 101);
    });

    test('concat', (assert) => {
      let arr = new TrackedArray();
      let arr2 = arr.concat([1], new TrackedArray([2]));

      assert.deepEqual(arr2, [1, 2]);
      assert.notOk(arr2 instanceof TrackedArray);
    });

    test('copyWithin', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      arr.copyWithin(1, 0, 1);

      assert.deepEqual(arr, [1, 1, 3]);
    });

    test('entries', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let iter = arr.entries();

      assert.deepEqual(iter.next().value, [0, 1]);
      assert.deepEqual(iter.next().value, [1, 2]);
      assert.deepEqual(iter.next().value, [2, 3]);
      assert.equal(iter.next().done, true);
    });

    test('every', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.ok(arr.every((v) => typeof v === 'number'));
      assert.notOk(arr.every((v) => v !== 2));
    });

    test('fill', (assert) => {
      let arr = new TrackedArray();
      arr.length = 100;
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

    test('filter', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let arr2 = arr.filter((v) => v > 1);

      assert.deepEqual(arr2, [2, 3]);
      assert.notOk(arr2 instanceof TrackedArray);
    });

    test('find', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(
        arr.find((v) => v > 1),
        2,
      );
    });

    test('findIndex', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(
        arr.findIndex((v) => v > 1),
        1,
      );
    });

    test('flat', (assert) => {
      let arr = new TrackedArray([1, 2, [3]]);

      assert.deepEqual(arr.flat(), [1, 2, 3]);
      assert.deepEqual(arr, [1, 2, [3]]);
    });

    test('flatMap', (assert) => {
      let arr = new TrackedArray([1, 2, [3]]);

      assert.deepEqual(
        arr.flatMap((v) => (typeof v === 'number' ? v + 1 : v)),
        [2, 3, 3],
      );
      assert.deepEqual(arr, [1, 2, [3]]);
    });

    test('forEach', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      arr.forEach((v, i) => assert.equal(v, i + 1));
    });

    test('includes', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(arr.includes(1), true);
      assert.equal(arr.includes(5), false);
    });

    test('indexOf', (assert) => {
      let arr = new TrackedArray([1, 2, 1]);

      assert.equal(arr.indexOf(1), 0);
      assert.equal(arr.indexOf(5), -1);
    });

    test('join', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(arr.join(','), '1,2,3');
    });

    test('keys', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let iter = arr.keys();

      assert.equal(iter.next().value, 0);
      assert.equal(iter.next().value, 1);
      assert.equal(iter.next().value, 2);
      assert.equal(iter.next().done, true);
    });

    test('lastIndexOf', (assert) => {
      let arr = new TrackedArray([3, 2, 3]);

      assert.equal(arr.lastIndexOf(3), 2);
      assert.equal(arr.lastIndexOf(5), -1);
    });

    test('map', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let arr2 = arr.map((v) => v + 1);

      assert.deepEqual(arr2, [2, 3, 4]);
      assert.notOk(arr2 instanceof TrackedArray);
    });

    test('pop', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let val = arr.pop();

      assert.deepEqual(arr, [1, 2]);
      assert.equal(val, 3);
    });

    test('push', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let val = arr.push(4);

      assert.deepEqual(arr, [1, 2, 3, 4]);
      assert.equal(val, 4);
    });

    test('reduce', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(
        arr.reduce((s, v) => s + v, ''),
        '123',
      );
    });

    test('reduceRight', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.equal(
        arr.reduceRight((s, v) => s + v, ''),
        '321',
      );
    });

    test('reverse', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      arr.reverse();

      assert.deepEqual(arr, [3, 2, 1]);
    });

    test('shift', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let val = arr.shift();

      assert.deepEqual(arr, [2, 3]);
      assert.equal(val, 1);
    });

    test('slice', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let arr2 = arr.slice();

      assert.notEqual(arr, arr2);
      assert.notOk(arr2 instanceof TrackedArray);
      assert.deepEqual(arr, arr2);
    });

    test('some', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);

      assert.ok(arr.some((v) => v > 1));
      assert.notOk(arr.some((v) => v < 1));
    });

    test('sort', (assert) => {
      let arr = new TrackedArray([3, 1, 2]);
      let arr2 = arr.sort();

      assert.equal(arr, arr2);
      assert.deepEqual(arr, [1, 2, 3]);
    });

    test('sort (with method)', (assert) => {
      let arr = new TrackedArray([3, 1, 2, 2]);
      let arr2 = arr.sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

      assert.equal(arr, arr2);
      assert.deepEqual(arr, [3, 2, 2, 1]);
    });

    test('splice', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let arr2 = arr.splice(1, 1);

      assert.notOk(arr2 instanceof TrackedArray);
      assert.deepEqual(arr, [1, 3]);
      assert.deepEqual(arr2, [2]);
    });

    test('unshift', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let val = arr.unshift(0);

      assert.deepEqual(arr, [0, 1, 2, 3]);
      assert.equal(val, 4);
    });

    test('values', (assert) => {
      let arr = new TrackedArray([1, 2, 3]);
      let iter = arr.values();

      assert.equal(iter.next().value, 1);
      assert.equal(iter.next().value, 2);
      assert.equal(iter.next().value, 3);
      assert.equal(iter.next().done, true);
    });

    test('of', (assert) => {
      let arr = TrackedArray.of(1, 2, 3);

      assert.deepEqual(arr, [1, 2, 3]);
    });

    test('from', (assert) => {
      let arr = TrackedArray.from([1, 2, 3]);

      assert.deepEqual(arr, [1, 2, 3]);
    });
  });

  module('reactivity', () => {
    reactivityTest(
      'getting and setting an index',
      class extends Component {
        arr = new TrackedArray(['foo']);

        get value() {
          return this.arr[0];
        }

        update() {
          this.arr[0] = 'bar';
        }
      },
    );

    reactivityTest(
      'calling splice',
      class extends Component {
        arr = new TrackedArray(['foo', 'bar', 'baz']);

        get value() {
          return this.arr[0];
        }

        update() {
          this.arr.splice(0, 1);
        }
      },
    );

    reactivityTest(
      'Can push into a newly created TrackedArray during construction',
      class extends Component {
        arr = new TrackedArray<string>();

        // eslint-disable-next-line @typescript-eslint/ban-types
        constructor(owner: unknown, args: {}) {
          super(owner, args);
          this.arr.push('hello');
        }

        get value() {
          return this.arr[0];
        }

        update() {
          this.arr[0] = 'goodbye';
        }
      },
    );

    reactivityTest(
      'Can unshift into a newly created TrackedArray during construction',
      class extends Component {
        arr = new TrackedArray<string>();

        // eslint-disable-next-line @typescript-eslint/ban-types
        constructor(owner: unknown, args: {}) {
          super(owner, args);
          this.arr.unshift('hello');
        }

        get value() {
          return this.arr[0];
        }

        update() {
          this.arr[0] = 'goodbye';
        }
      },
    );

    eachReactivityTest(
      '{{each}} works with new items',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection.push(4);
        }
      },
    );

    eachReactivityTest(
      '{{each}} works when updating old items',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection[2] = 5;
        }
      },
    );

    eachReactivityTest(
      '{{each}} works when calling splice',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection.splice(0, 1);
        }
      },
    );

    eachInReactivityTest(
      '{{each-in}} works with new items',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection.push(4);
        }
      },
    );

    eachInReactivityTest(
      '{{each-in}} works when updating old items',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection[2] = 5;
        }
      },
    );

    eachInReactivityTest(
      '{{each-in}} works when calling splice',
      class extends Component {
        collection = new TrackedArray([1, 2, 3]);

        update() {
          this.collection.splice(0, 1);
        }
      },
    );

    module('getter methods', () => {
      ARRAY_GETTER_METHODS.forEach((method) => {
        reactivityTest(
          `${method} individual index`,
          class extends Component {
            arr = new TrackedArray(['foo', 'bar']);

            get value() {
              // @ts-ignore -- this can't be represented easily in TS, and we
              // don't actually care that it is; we're *just* testing reactivity.
              return this.arr[method](() => {
                /* no op */
              });
            }

            update() {
              this.arr[0] = 'baz';
            }
          },
        );

        reactivityTest(
          `${method} collection tag`,
          class extends Component {
            arr = new TrackedArray(['foo', 'bar']);

            get value() {
              // @ts-ignore -- this can't be represented easily in TS, and we
              // don't actually care that it is; we're *just* testing reactivity.
              return this.arr[method](() => {
                /* no op */
              });
            }

            update() {
              this.arr.sort();
            }
          },
        );
      });
    });

    module('setter methods', () => {
      ARRAY_SETTER_METHODS.forEach((method) => {
        reactivityTest(
          `${method} individual index`,
          class extends Component {
            arr = new TrackedArray(['foo', 'bar']);

            get value() {
              return this.arr[0];
            }

            update() {
              // @ts-ignore -- this can't be represented easily in TS, and we
              // don't actually care that it is; we're *just* testing reactivity.
              this.arr[method](undefined);
            }
          },
        );

        reactivityTest(
          `${method} collection tag`,
          class extends Component {
            arr = new TrackedArray(['foo', 'bar']);

            get value() {
              return this.arr.forEach(() => {
                /* no op */
              });
            }

            update() {
              // @ts-ignore -- this can't be represented easily in TS, and we
              // don't actually care that it is; we're *just* testing reactivity.
              this.arr[method](undefined);
            }
          },
        );
      });
    });
  });
});
