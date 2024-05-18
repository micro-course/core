import { createUserService } from "@/entities/user/server";
import { updateProfileRouter } from "@/features/update-profile/router";
import { ContextFactoryModule } from "@/kernel/lib/trpc/server";

export const appServerModule = {
  createContext: ContextFactoryModule.init({ nextAuth: { createUserService } }),
  routers: [updateProfileRouter],
};
