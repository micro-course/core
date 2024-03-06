export type NotUndefined<T> = T extends undefined ? never : T;
export type NotNull<T> = T extends null ? never : T;
