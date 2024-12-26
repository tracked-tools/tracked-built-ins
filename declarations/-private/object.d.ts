export interface TrackedObject {
    fromEntries<T = unknown>(entries: Iterable<readonly [PropertyKey, T]>): {
        [k: string]: T;
    };
    new <T extends Record<PropertyKey, unknown>>(...args: Record<PropertyKey, never> extends T ? [] | [T] : [T]): T;
}
export declare const TrackedObject: TrackedObject;
export default TrackedObject;
//# sourceMappingURL=object.d.ts.map