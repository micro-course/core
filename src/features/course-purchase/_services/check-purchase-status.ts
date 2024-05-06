import { injectable } from "inversify";
import { ProdamusService } from "./prodamus";
import { UserId } from "@/kernel/domain/user";
import { GetPaymentService } from "@/entities/payment/server";
import { TRPCError } from "@trpc/server";
import { GetCourseService } from "@/entities/course/server";

type Query = {
  orderId: string;
  userId: UserId;
};

@injectable()
export class CheckPurchaseStatusService {
  constructor(
    private prodamusService: ProdamusService,
    private getCourseService: GetCourseService,
    private getPaymentService: GetPaymentService,
  ) {}
  async exec(query: Query) {
    const paymentId = this.prodamusService.parseOrderId(query.orderId);

    const payment = await this.getPaymentService.exec({
      paymentId,
    });

    if (!payment) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment not found",
      });
    }

    return {
      state: payment.state,
      courseSlug: await this.getCourseService
        .exec({ id: payment.products[0].sku })
        .then((course) => course?.slug),
    };
  }
}
