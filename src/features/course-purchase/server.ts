import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CoursePurchaseController } from "./_controller";
import { CheckPurchaseStatusService } from "./_services/check-purchase-status";
import { ReceivePurchaseWebhookService } from "./_services/receive-purchase-webhook";
import { StartCorusePurchaseService } from "./_services/start-course-purchase";
import { ProdamusService } from "./_services/prodamus";

export const CoursePurchaseModule = new ContainerModule((bind) => {
  bind(Controller).to(CoursePurchaseController);
  bind(CheckPurchaseStatusService).toSelf();
  bind(StartCorusePurchaseService).toSelf();
  bind(ReceivePurchaseWebhookService).toSelf();
  bind(ProdamusService).toSelf();
});

export { ReceivePurchaseWebhookService };
