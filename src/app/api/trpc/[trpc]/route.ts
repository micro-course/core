import { appServerModule } from "@/app/app-server";
import { t } from "@/kernel/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: t.mergeRouters(...appServerModule.routers),
    createContext: appServerModule.createContext,
  });

export { handler as GET, handler as POST };
