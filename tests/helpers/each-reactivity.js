import hbs from 'htmlbars-inline-precompile';
import { render, settled } from '@ember/test-helpers';
import { test } from 'qunit';

export function eachReactivityTest(desc, Klass, shouldUpdate = true) {
  test(`${desc} #each reactivity`, async function(assert) {
    let instance;
    let count = 0;

    class TestComponent extends Klass {
      constructor() {
        super(...arguments);
        instance = this;
      }

      get collection() {
        throw new Error('did you forget to specify a collection?');
      }

      get count() {
        return count++;
      }
    }

    this.owner.register('component:test-component', TestComponent);
    this.owner.register(
      'template:components/test-component',
      hbs`<ul>
        {{#each this.collection as |value index|}}
          <li class="test">{{index}}. {{value}} ({{this.count}})</li>
        {{/each}}
      </ul>`
    );

    await render(hbs`{{test-component}}`);

    assert.equal(count, instance.collection.size);

    count = 0;

    instance.update();

    await settled();

    assert.equal(count, shouldUpdate ? 1 : 0);
  });
}
