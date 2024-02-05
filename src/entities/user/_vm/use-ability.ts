import { NeedAuthError } from "@/shared/lib/errors";
import { SessionEntity } from "../session";
import { useAppSession } from "./use-app-session";

export const useAbilityStrict = <T>(factory: (session: SessionEntity) => T) => {
  const session = useAppSession();

  if (session.status === "authenticated") {
    return factory(session.data);
  }

  throw new NeedAuthError();
};
