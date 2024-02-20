import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "../_domain/types";

export type WithSession = {
  session: SessionEntity;
};

export const checkAbility = <T, A extends [WithSession, ...any[]]>({
  check,
  createAbility,
}: {
  createAbility: (session: SessionEntity) => T;
  check: (ability: T, ...args: A) => boolean;
}) => {
  return function checkAblityDecorator<This, Args extends A, Return>(
    target: (this: This, ...args: Args) => Return,
    _: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    function replacementMethod(this: This, ...args: Args): Return {
      const ability = createAbility(args[0].session);
      if (!check(ability, ...args)) {
        throw new AuthorizatoinError();
      }

      const result = target.call(this, ...args);
      return result;
    }
    return replacementMethod;
  };
};
