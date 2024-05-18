import { getServerSession } from "next-auth";
import { NextAuthConfigProvider } from "./_next-auth-config";
import { NextAuthContainer } from "./_container";

export const SessionServiceProvider = NextAuthContainer.provider(
  (ctx) => {
    return {
      get() {
        return getServerSession(ctx.innerDeps.nextAuthConfig);
      },
    };
  },
  { nextAuthConfig: NextAuthConfigProvider },
);
