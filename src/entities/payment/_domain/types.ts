import { PaymentId } from "@/kernel/domain/payment";
import { UserId } from "@/kernel/domain/user";

export type ProductType = "course";

export type Product = {
  type: ProductType;
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

export interface PendingPaymentState {
  type: "pending";
}

export interface SuccessPaymentState {
  type: "success";
}

export interface FailedPaymentState {
  type: "failed";
}

export type PaymentState =
  | PendingPaymentState
  | SuccessPaymentState
  | FailedPaymentState;

export type Payment = {
  paymentId: PaymentId;
  userId: UserId;
  userEmail: string;
  products: Product[];
  state: PaymentState;
};
