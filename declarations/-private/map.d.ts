export declare class TrackedMap<K = unknown, V = unknown> implements Map<K, V> {
    private collection;
    private storages;
    private vals;
    private readStorageFor;
    private dirtyStorageFor;
    constructor();
    constructor(entries: readonly (readonly [K, V])[] | null);
    constructor(iterable: Iterable<readonly [K, V]>);
    get(key: K): V | undefined;
    has(key: K): boolean;
    entries(): MapIterator<[K, V]>;
    keys(): MapIterator<K>;
    values(): MapIterator<V>;
    forEach(fn: (value: V, key: K, map: Map<K, V>) => void): void;
    get size(): number;
    [Symbol.iterator](): MapIterator<[K, V]>;
    get [Symbol.toStringTag](): string;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
}
export declare class TrackedWeakMap<K extends object = object, V = unknown> implements WeakMap<K, V> {
    private storages;
    private vals;
    private readStorageFor;
    private dirtyStorageFor;
    constructor();
    constructor(iterable: Iterable<readonly [K, V]>);
    constructor(entries: readonly [K, V][] | null);
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=map.d.ts.map