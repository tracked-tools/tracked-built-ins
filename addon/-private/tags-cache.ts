import {
  dirtyTag,
  consumeTag,
  createTag,
} from "tracked-maps-and-sets/-private/util";

export function createTagsCache() {
  const cache = new Map();

  return Object.freeze({
    dirty(key: PropertyKey): void {
      const tag = cache.get(key);
      if (tag) dirtyTag(tag);
    },

    track(key: PropertyKey): void {
      let tag = cache.get(key);

      if (tag) {
        consumeTag(tag);
        return;
      }

      tag = createTag();
      cache.set(key, tag);
      consumeTag(tag);
    },
  });
}
