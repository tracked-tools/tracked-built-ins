export declare class TrackedSet<T = unknown> implements Set<T> {
    private collection;
    private storages;
    private vals;
    private storageFor;
    private dirtyStorageFor;
    constructor();
    constructor(values: readonly T[] | null);
    constructor(iterable: Iterable<T>);
    has(value: T): boolean;
    entries(): SetIterator<[T, T]>;
    keys(): SetIterator<T>;
    values(): SetIterator<T>;
    union<U>(other: ReadonlySetLike<U>): Set<T | U>;
    intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
    difference<U>(other: ReadonlySetLike<U>): Set<T>;
    symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
    isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
    isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
    isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
    forEach(fn: (value1: T, value2: T, set: Set<T>) => void): void;
    get size(): number;
    [Symbol.iterator](): SetIterator<T>;
    get [Symbol.toStringTag](): string;
    add(value: T): this;
    delete(value: T): boolean;
    clear(): void;
}
export declare class TrackedWeakSet<T extends object = object> implements WeakSet<T> {
    private storages;
    private vals;
    private storageFor;
    private dirtyStorageFor;
    constructor(values?: readonly T[] | null);
    has(value: T): boolean;
    add(value: T): this;
    delete(value: T): boolean;
    get [Symbol.toStringTag](): string;
}