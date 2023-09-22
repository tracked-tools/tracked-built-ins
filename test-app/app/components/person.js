import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { TrackedMap } from 'tracked-built-ins';

export default class Person extends Component {
  friends = new TrackedMap();

  get friendNames() {
    return Array.from(this.friends).map(([f]) => f.name);
  }

  addFriend() {
    this.friends.set(
      {
        name: 'Liz',
      },
      true,
    );
  }
}
