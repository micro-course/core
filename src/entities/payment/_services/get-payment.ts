import { injectable } from "inversify";
import { PaymentRepository } from "../_repository/payment";
import { Payment, Product } from "../_domain/types";
import { createId } from "@/shared/lib/id";
import { PaymentId } from "@/kernel/domain/payment";

export type Query = {
  paymentId: PaymentId;
};

@injectable()
export class GetPaymentService {
  constructor(private paymentRepository: PaymentRepository) {}
  async exec(query: Query) {
    return this.paymentRepository.findPaymentById(query.paymentId);
  }
}
