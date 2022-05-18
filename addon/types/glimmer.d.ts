declare module '@glimmer/env' {
  export const DEBUG: boolean;
}

declare module '@glimmer/tracking' {
  export function tracked(
    target: object,
    key: string | symbol,
    desc: PropertyDescriptor
  ): PropertyDescriptor;
}
