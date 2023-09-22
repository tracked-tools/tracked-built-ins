interface ReactiveObject<T> {
  new (...args: never[]): {
    value: T;
  };
}

export function reactivityTest<T>(
  desc: string,
  Klass: ReactiveObject<T>,
  shouldUpdate?: boolean,
): void;
