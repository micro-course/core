import { server } from "@/app/server";
import {
  ContextFactory,
  Controller,
  sharedRouter,
  t,
} from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const routers = server.getAll(Controller).map((c) => c.router);

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(sharedRouter, ...routers),
    createContext: server.get(ContextFactory).createContext,
  });

export { handler as GET, handler as POST };
