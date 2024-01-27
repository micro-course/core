import Pino from "pino";

export const logger = Pino();

export const loggedMethod = <A extends any[] = any[], R = any>({
  msg,
  logRes,
  logArgs,
}: {
  msg?: string;
  logArgs?: (...args: A) => unknown;
  logRes?: (res: R, ...args: A) => unknown;
}) => {
  return function loggedMethodDecorator<
    This,
    Args extends A,
    Return extends R | Promise<R>,
  >(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
      logger.info({
        methodName,
        args: logArgs?.(...args),
        msg: `Call ${methodName}: ${msg ?? ""}`,
      });
      const result = target.call(this, ...args);

      Promise.resolve(result)
        .then((awaited) => {
          logger.info({
            methodName,
            data: logRes?.(awaited, ...args),
            msg: `Result ${methodName}: ${msg ?? ""}`,
          });
        })
        .catch((error) => {
          logger.error({
            methodName,
            error,
            msg: `Error ${methodName}: ${msg ?? ""}`,
          });
        });

      return result;
    }

    return replacementMethod;
  };
};
