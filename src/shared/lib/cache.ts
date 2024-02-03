export interface CacheStrategy {
  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T>;
}

export interface InvalidateonStrategy {
  invalidate(key: unknown[]): Promise<void>;
}

export const cachedAsyncMethod = <A extends any[] = any[]>(
  cacheStrategy: CacheStrategy,
  key: (...args: A) => unknown[],
) => {
  return function cachedAsycnMethodDecorator<
    This,
    Args extends A,
    Return extends Promise<unknown>,
  >(
    target: (this: This, ...args: Args) => Return,
    _: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    function replacementMethod(this: This, ...args: Args): Return {
      const result = cacheStrategy.fetch(key(...args), () =>
        target.call(this, ...args),
      );

      return result as Return;
    }

    return replacementMethod;
  };
};

export const invalidateCache = <A extends any[] = any[]>(
  strategy: InvalidateonStrategy,
  key: (...args: A) => unknown[],
) => {
  return function cachedAsycnMethodDecorator<
    This,
    Args extends A,
    Return extends Promise<unknown>,
  >(
    target: (this: This, ...args: Args) => Return,
    _: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    function replacementMethod(this: This, ...args: Args): Return {
      const result = target.call(this, ...args);

      return (
        Promise.resolve(result)
          // Invalidate on success
          .then(() => strategy.invalidate(key(...args)))
          // Invalidate on error
          .catch(() => strategy.invalidate(key(...args)))
          // Return value
          .then(() => result)
          // Avoid invalidate error
          .catch(() => result) as Return
      );
    }

    return replacementMethod;
  };
};
