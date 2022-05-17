declare interface TrackedObject {
  fromEntries<T = unknown>(
    entries: Iterable<readonly [PropertyKey, T]>
  ): { [k: string]: T };

  new <T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>>(
    obj?: T
  ): T;
}

declare const TrackedObject: TrackedObject;

export default TrackedObject;
