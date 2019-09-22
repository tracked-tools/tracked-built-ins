import { get, notifyPropertyChange } from '@ember/object';

let CURRENT_ID = 0;

const OBJECT_TAGS = new WeakMap();
const NON_OBJECT_TAGS = new Map();

export function toTrackableKey(key: unknown): string {
  let tag;

  if (typeof key === 'object' && key !== null) {
    tag = OBJECT_TAGS.get(key);

    if (tag === undefined) {
      tag = '__TAG__' + CURRENT_ID++;
      OBJECT_TAGS.set(key, tag);
    }
  } else {
    tag = NON_OBJECT_TAGS.get(key);

    if (tag === undefined) {
      tag = '__TAG__' + CURRENT_ID++;
      NON_OBJECT_TAGS.set(key, tag);
    }
  }

  return tag;
}

export function consume(obj: any, key: unknown = obj) {
  get(obj, toTrackableKey(key));
}

export function dirty(obj: any, key: unknown = obj) {
  notifyPropertyChange(obj, toTrackableKey(key));
}

export const SUPPORTS_PROXY = typeof Proxy === 'function';
