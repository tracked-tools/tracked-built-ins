interface ReactiveObject<T> {
  new (...args: any[]): {
    value: T;
  };
}

export function reactivityTest<T>(
  desc: string,
  Klass: ReactiveObject<T>,
  shouldUpdate?: boolean
): void;
