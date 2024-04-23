export const allSuccess = async <T>(
  promises: Promise<T>[],
  log?: (item: PromiseSettledResult<Awaited<T>>, index: number) => void,
) => {
  return await Promise.allSettled(promises).then((r) => {
    r.forEach((res, index) => log?.(res, index));
    return r
      .filter(
        (courseResult): courseResult is PromiseFulfilledResult<Awaited<T>> =>
          courseResult.status === "fulfilled",
      )
      .map((course) => {
        return course.value;
      });
  });
};
