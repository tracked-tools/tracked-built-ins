import hbs from 'htmlbars-inline-precompile';
import { render, settled } from '@ember/test-helpers';
import { test } from 'qunit';

export function reactivityTest(desc, Klass, shouldUpdate = true) {
  test(`${desc} reactivity`, async function (assert) {
    let instance;
    let count = 0;

    class TestComponent extends Klass {
      constructor() {
        super(...arguments);
        instance = this;
      }

      get value() {
        count++;

        return super.value;
      }
    }

    this.owner.register('component:test-component', TestComponent);
    this.owner.register(
      'template:components/test-component',
      hbs`<div class="test">{{this.value}}</div>`
    );

    await render(hbs`{{test-component}}`);

    assert.equal(count, 1);

    instance.update();

    await settled();

    assert.equal(count, shouldUpdate ? 2 : 1);
  });
}
