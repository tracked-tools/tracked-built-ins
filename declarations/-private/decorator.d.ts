import { TrackedMap, TrackedWeakMap } from './map.ts';
import { TrackedSet, TrackedWeakSet } from './set.ts';
import TrackedArray from './array.ts';
export default function tracked<T>(obj: T[] | typeof Array): TrackedArray<T>;
export default function tracked<T>(obj: Set<T> | typeof Set): TrackedSet<T>;
export default function tracked<T, U>(obj: Map<T, U> | typeof Map): TrackedMap<T, U>;
export default function tracked<T extends object>(obj: WeakSet<T> | typeof WeakSet): TrackedWeakSet<T>;
export default function tracked<T extends object, U>(obj: WeakMap<T, U> | typeof WeakMap): TrackedWeakMap<T, U>;
export default function tracked<T extends object>(obj: T | typeof Object): T;
export default function tracked(obj: object, key: string | symbol, desc?: PropertyDescriptor): void;
//# sourceMappingURL=decorator.d.ts.map