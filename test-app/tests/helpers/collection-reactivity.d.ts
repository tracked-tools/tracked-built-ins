interface Collection<
  T extends
    | Array<unknown>
    | Record<PropertyKey, unknown>
    | Set<unknown>
    | WeakSet<object>
    | Map<unknown, unknown>
    | WeakMap<object, unknown>,
> {
  new (...args: never[]): {
    collection: T;
  };
}

export function eachReactivityTest(desc: string, Klass: Collection): void;

export function eachInReactivityTest(desc: string, Klass: Collection): void;
