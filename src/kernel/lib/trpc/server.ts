import { createModule } from "tiny-invert";
import { ContextFactoryProvider } from "./_context-factory";

export const ContextFactoryModule = createModule(ContextFactoryProvider);

export {
  authorizedProcedure,
  sharedRouter,
  createPublicServerApi,
  checkAbilityInputProcedure,
  checkAbilityProcedure,
  publicProcedure,
  router,
  t,
  type SharedRouter,
} from "./_procedure";
