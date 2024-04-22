import { ContextFactory } from "./_context-factory";
import { ContainerModule } from "inversify";

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

export { Controller } from "./_controller";

export const TrpcModule = new ContainerModule((bind) => {
  bind(ContextFactory).toSelf();
});

export { ContextFactory };
