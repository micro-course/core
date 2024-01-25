import Pino from "pino";

export const logger = Pino();

export type Logger = Pino.Logger;

export const logFunction = <T extends (...any: any[]) => any>(
  { msg, logData }: { msg: string; logData?: (res: Awaited<T>) => unknown },
  fn: T,
): T => {
  const resultFn = (...args: any[]) => {
    try {
      logger.info({
        msg: `Call ${msg}`,
        params: args,
      });
      const result = fn.apply(this, args);

      if (result instanceof Promise) {
        result
          .then((awaited) => {
            logger.info({
              msg: `Result ${msg}`,
              data: logData?.(awaited),
            });
          })
          .catch((error) => {
            logger.error({
              msg: `Error: ${msg}`,
              error,
            });
          });
      }

      logger.info({
        msg: `Result ${msg}`,
        data: logData?.(result),
      });

      return result;
    } catch (error) {
      logger.error({
        msg: `Error: ${msg}`,
        error,
      });
      throw error;
    }
  };

  return resultFn as T;
};
