import hbs from 'htmlbars-inline-precompile';
import { render, settled } from '@ember/test-helpers';
import { test } from 'qunit';
import { setComponentTemplate } from '@ember/component';

export function reactivityTest(desc, Klass, shouldUpdate = true) {
  test(`${desc} reactivity`, async function (assert) {
    let instance;
    let count = 0;

    class TestComponent extends Klass {
      constructor() {
        super(...arguments);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        instance = this;
      }

      get value() {
        count++;

        return super.value;
      }
    }

    setComponentTemplate(
      hbs`<div class="test">{{this.value}}</div>`,
      TestComponent,
    );
    this.owner.register('component:test-component', TestComponent);

    await render(hbs`<TestComponent/>`);

    assert.equal(count, 1, 'The count is 1');

    instance.update();

    await settled();

    assert.equal(
      count,
      shouldUpdate ? 2 : 1,
      shouldUpdate ? `The count is updated` : `The could should not update`,
    );
  });
}
