// copied from tracked-maps-and-sets until we have the publishing story for that
// sorted out
declare class Tag {
  private __tag_value__;
  static consumeTag(tag: Tag): void;
  static dirtyTag(tag: Tag): void;
}
export declare function createTag(): Tag;
export declare const consumeTag: typeof Tag.consumeTag;
export declare const dirtyTag: typeof Tag.dirtyTag;
export declare let consumeCollection: (obj: object) => void;
export declare let dirtyCollection: (obj: object) => void;
export declare function consumeKey(obj: object, key: unknown): void;
export declare function dirtyKey(obj: object, key: unknown): void;
export {};
