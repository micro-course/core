import { injectable } from "inversify";
import { PaymentRepository } from "../_repository/payment";
import { Payment, Product } from "../_domain/types";
import { UserId } from "@/kernel/domain/user";
import { createId } from "@/shared/lib/id";

export type Command = {
  userId: UserId;
  userEmail: string;
  products: Product[];
};

@injectable()
export class CreatePaymentService {
  constructor(private paymentRepository: PaymentRepository) {}
  async exec(command: Command) {
    const payment: Payment = {
      paymentId: createId(),
      userId: command.userId,
      userEmail: command.userEmail,
      products: command.products,
      state: {
        type: "pending",
      },
    };

    return this.paymentRepository.save(payment);
  }
}
