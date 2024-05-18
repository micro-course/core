import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./next-auth-config";
import { NeedAuthError } from "@/shared/lib/errors";
export { checkAbility } from "./_lib/check-ability";
export type { WithSession } from "./_lib/check-ability";

/** @deprecated */
export const getAppSessionServer = () => getServerSession(nextAuthConfig);
/** @deprecated */
export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
