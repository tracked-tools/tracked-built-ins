interface Collection {
  new (...args: unknown[]): {
    collection: Array<unknown> | Record<PropertyKey, unknown>;
  };
}

export function eachReactivityTest(desc: string, Klass: Collection): void;

export function eachInReactivityTest(desc: string, Klass: Collection): void;
