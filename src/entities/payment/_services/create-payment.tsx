import { UserId } from "@/kernel";
import { Product } from "../_domain/projections";
import { createId } from "@/shared/lib/id";
import { userPaymentsRepository } from "../_repository/user-payments";
import { userPaymentsProducer } from "../_domain/producer";

type Command = {
  userId: UserId;
  userEmail: string;
  products: Product[];
};

export class CreatePaymentService {
  constructor() {}

  async exec(command: Command) {
    const { userId, userEmail, products } = command;
    const id = createId();

    const userPayments = await userPaymentsRepository.getUserPayments(userId);

    const createPaymentEvent = userPaymentsRepository.createEvent(
      "PaymentInitiated",
      {
        paymentId: id,
        userId,
        userEmail,
        products,
      },
    );

    userPaymentsProducer.produce(userPayments, createPaymentEvent);

    const payment = userPayments.payments[id];

    if (!payment) {
      throw new Error("Create payment error");
    }

    await userPaymentsRepository.applyEvents(userId, [createPaymentEvent]);

    return { payment };
  }
}

export const createPaymentService = new CreatePaymentService();
