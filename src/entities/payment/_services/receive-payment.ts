import { injectable } from "inversify";
import { PaymentRepository } from "../_repository/payment";
import { UserId } from "@/kernel/domain/user";
import { PaymentId } from "@/kernel/domain/payment";
import { TRPCError } from "@trpc/server";
import { Payment } from "../_domain/types";

type Command = {
  userId: UserId;
  paymentId: PaymentId;
} & ({ type: "success" } | { type: "failure" });

@injectable()
export class ReceivePaymentService {
  constructor(private paymentRepository: PaymentRepository) {}
  async exec(command: Command) {
    const payment = await this.paymentRepository.findPaymentById(
      command.paymentId,
    );

    if (!payment) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment not found",
      });
    }

    const newPayment: Payment = {
      ...payment,
      state: {
        type: command.type === "success" ? "success" : "failed",
      },
    };

    return this.paymentRepository.save(newPayment);
  }
}
