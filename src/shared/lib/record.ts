export const arrayToRecord = <
  K extends string,
  T extends Record<K, string | number>,
>(
  key: K,
  array: T[],
) => {
  return array.reduce(
    (acc, item) => {
      acc[item[key]] = item;
      return acc;
    },
    {} as Record<T[K], T | undefined>,
  );
};
