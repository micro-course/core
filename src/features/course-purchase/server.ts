import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CoursePurchaseController } from "./_controller";
import { CheckPurchaseStatusService } from "./_services/check-purchase-status";
import { CreatePurchaseService } from "./_services/create-purchase";
import { ReceivePurchaseCallbackService } from "./_services/receive-purchase-callback";
import { ReceivePurchaseWebhookService } from "./_services/receive-purchase-webhook";

export const CoursePurchaseModule = new ContainerModule((bind) => {
  bind(Controller).to(CoursePurchaseController);
  bind(CheckPurchaseStatusService).toSelf();
  bind(CreatePurchaseService).toSelf();
  bind(ReceivePurchaseCallbackService).toSelf();
  bind(ReceivePurchaseWebhookService).toSelf();
});
