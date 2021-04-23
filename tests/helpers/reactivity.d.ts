interface ReactiveObject<T> {
  new (...args: unknown[]): {
    value: T;
  };
}

export function reactivityTest<T>(
  desc: string,
  Klass: ReactiveObject<T>,
  shouldUpdate?: boolean
): void;
