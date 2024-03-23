import "reflect-metadata";

import {
  Controller,
  createContext,
  sharedRouter,
  t,
} from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { init } from "@/app/_init";

const container = init();

const routers = container.getAll(Controller).map((c) => c.router);

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(sharedRouter, ...routers),
    createContext: createContext,
  });

export { handler as GET, handler as POST };
