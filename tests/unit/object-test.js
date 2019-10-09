import Component from '@glimmer/component';
import { TrackedObject, setTrackedBuiltInsConfig } from 'tracked-built-ins';

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { reactivityTest } from '../helpers/reactivity';

module('TrackedObject', function(hooks) {
  setupRenderingTest(hooks);

  module('USE_PROXY: false', () => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));

    test('from', assert => {
      let obj = new TrackedObject({ foo: 123 });

      assert.ok(obj instanceof TrackedObject);
      assert.deepEqual(Object.keys(obj), ['foo']);
    });

    reactivityTest(
      'it works',
      class extends Component {
        obj = new TrackedObject({foo: undefined});

        get value() {
          return this.obj.foo;
        }

        update() {
          this.obj.foo = 123;
        }
      },
      true
    );
  });

  
  module('USE_PROXY: false, with custom getters/setters on origin object', () => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: false }));

    test('from', assert => {
      let obj = new TrackedObject({ 
        foo: 123, 
        _name: undefined,
        get name() {
          return this._name ? this._name : 'Mike';
        },
        set age(value) {
          this.foo = value;
        },
        get bio() {
          return `${this.name} ${this.foo}`;
        },
        set bio(value) {
          const [name = this.name, age = this.foo] = value.split(' ');
          this.age = age;
          this._name = name;
        }
      });

      assert.ok(obj instanceof TrackedObject);
      assert.deepEqual(Object.keys(obj), ['foo','_name', 'name', 'age', 'bio']);
      assert.equal(obj.name, 'Mike');
      assert.equal(obj._name, undefined);
      assert.equal(obj.age, undefined);
      assert.equal(obj.foo, 123);
      obj.age = 42;
      assert.equal(obj.foo, 42);
      assert.equal(obj.bio, `Mike 42`);
      obj.bio = `James 121`;
      assert.equal(obj.bio, `James 121`);
      assert.equal(obj.foo, '121');
      assert.equal(obj.name, 'James');
      obj.bio = `Tim`;
      assert.equal(obj.name, 'Tim');
      assert.equal(obj.bio, `Tim 121`);
    });

    reactivityTest(
      'it works',
      class extends Component {
        obj = new TrackedObject({ 
          foo: 123, 
          _name: undefined,
          get name() {
            return this._name ? this._name : 'Mike';
          },
          set age(value) {
            this.foo = value;
          },
          get bio() {
            return `${this.name} ${this.foo}`;
          },
          set bio(value) {
            const [name = this.name, age = this.foo] = value.split(' ');
            this.age = age;
            this._name = name;
          }
        });

        get value() {
          return this.obj.bio;
        }

        update() {
          this.obj.bio = 'James 27';
        }
      },
      true
    );
  });

  module('USE_PROXY: true', hooks => {
    hooks.beforeEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));
    hooks.afterEach(() => setTrackedBuiltInsConfig({ USE_PROXY: true }));

    test('from', assert => {
      let obj = new TrackedObject({ foo: 123 });

      assert.ok(obj instanceof TrackedObject);
      assert.deepEqual(Object.keys(obj), ['foo']);
    });

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
      },
      true
    );
  });
});
