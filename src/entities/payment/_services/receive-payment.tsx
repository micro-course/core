import { PaymentId } from "@/kernel";
import { userPaymentsRepository } from "../_repository/user-payments";
import { userPaymentsProducer } from "../_domain/producer";
import { UserId } from "@/entities/user/user";

type Command = {
  userId: UserId;
  paymentId: PaymentId;
} & (
  | { type: "success" }
  | { type: "failure"; errorMessage: string; errorCode: string }
);

export class ReceivePaymentService {
  constructor() {}

  async exec(command: Command) {
    const userPayments = await userPaymentsRepository.getUserPayments(
      command.userId,
    );

    const paymentResultEvent =
      command.type === "success"
        ? userPaymentsRepository.createEvent("PaymentCompleted", {
            paymentId: command.paymentId,
          })
        : userPaymentsRepository.createEvent("PaymentFailed", {
            paymentId: command.paymentId,
            errorCode: command.errorCode,
            errorMessage: command.errorMessage,
          });

    userPaymentsProducer.produce(userPayments, paymentResultEvent);

    const payment = userPayments.payments[command.paymentId];

    if (!payment) {
      throw new Error("Receive payment error");
    }

    await userPaymentsRepository.applyEvents(command.userId, [
      paymentResultEvent,
    ]);

    return { payment };
  }
}

export const receivePaymentService = new ReceivePaymentService();
