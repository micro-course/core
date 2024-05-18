import { TrpcContainer } from "./_container";
import { SessionServiceProvider } from "../next-auth/server";

export const ContextFactoryProvider = TrpcContainer.provider(
  (ctx) => async () => {
    const session = await ctx.innerDeps.sessionService.get();

    return {
      session,
    };
  },
  {
    sessionService: SessionServiceProvider,
  },
);
