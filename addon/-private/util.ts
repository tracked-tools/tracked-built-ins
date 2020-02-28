import { tracked } from '@glimmer/tracking';

export class Tag {
  @tracked private tag: undefined;

  consume() {
    // read the tag value
    this.tag;
  }

  dirty() {
    // write the tag value
    this.tag = this.tag;
  }
}

const OBJECT_TAGS = new WeakMap();
const SELF = {};

function getOrCreateTag(obj: object, key: unknown) {
  let tags = OBJECT_TAGS.get(obj);

  if (tags === undefined) {
    tags = new Map();
    OBJECT_TAGS.set(obj, tags);
  }

  let tag = tags.get(key);

  if (tag === undefined) {
    tag = new Tag();
    tags.set(key, tag);
  }

  return tag;
}

export function consume(obj: object, key: unknown = SELF) {
  getOrCreateTag(obj, key).consume();
}

export function dirty(obj: object, key: unknown = SELF) {
  getOrCreateTag(obj, key).dirty();
}
