import { createUserService } from "@/entities/user/server";
import { cmsRouter } from "@/features/cms/router";
import { updateProfileRouter } from "@/features/update-profile/router";
import { ContextFactoryModule } from "@/kernel/lib/trpc/server";
import { uploadImageRouter } from "@/kernel/lib/upload-image/router";

export const appServerModule = {
  createContext: ContextFactoryModule.init({ nextAuth: { createUserService } }),
  routers: [updateProfileRouter, cmsRouter, uploadImageRouter],
};
