import { CreateTRPCReact, createTRPCReact } from "@trpc/react-query";
import { SharedRouter } from "./server";
import { AnyRouter } from "@trpc/server";

export const sharedApi = createTRPCReact<SharedRouter>();

export const createApi = <T extends AnyRouter>() =>
  sharedApi as CreateTRPCReact<T, unknown>;
