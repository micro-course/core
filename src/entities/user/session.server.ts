import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./next-auth-config";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);
