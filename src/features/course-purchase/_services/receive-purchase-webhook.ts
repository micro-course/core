import { DataObject } from "@/shared/lib/hmac";
import { injectable } from "inversify";
import { ProdamusService } from "./prodamus";
import { webhookDataScehama } from "../_domain/schemas";
import { ReceivePaymentService } from "@/entities/payment/server";
import { GrandCourseAccessService } from "@/entities/user-access/server";

type Command = {
  data: DataObject;
};

type Result =
  | {
      type: "error";
      code: number;
      message: string;
    }
  | {
      type: "success";
    };

@injectable()
export class ReceivePurchaseWebhookService {
  constructor(
    private prodamsusService: ProdamusService,
    private receivePaymentService: ReceivePaymentService,
    private grantAccessService: GrandCourseAccessService,
  ) {}
  async exec(command: Command): Promise<Result> {
    const res = webhookDataScehama.safeParse(command.data);

    if (!res.success) {
      return {
        type: "error",
        code: 400,
        message: "Params invalid",
      };
    }

    const { paymentId, userId, sign } = res.data;

    if (
      !this.prodamsusService.checkSignature({
        data: {
          userId,
          paymentId,
        },
        sign,
      })
    ) {
      console.log("signature invalid");
      return {
        type: "error",
        code: 400,
        message: "Signature invalid",
      };
    }

    const payment = await this.receivePaymentService.exec({
      paymentId,
      userId,
      type: "success",
    });

    await this.grantAccessService.exec({
      courseId: payment.products[0].sku,
      reason: "paid",
      userId,
    });

    return {
      type: "success",
    };
  }
}
