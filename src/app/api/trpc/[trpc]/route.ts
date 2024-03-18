import { createContext, sharedRouter, t } from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(sharedRouter),
    createContext: createContext,
  });

export { handler as GET, handler as POST };
