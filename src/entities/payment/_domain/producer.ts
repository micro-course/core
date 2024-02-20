import { UserPayments } from "./projections";
import {
  PaymentCompletedEvent,
  PaymentEvent,
  PaymentFailedEvent,
  PaymentInitiatedEvent,
} from "./events";

export class PaymentError extends Error {
  constructor(
    public message: string,
    public payment: UserPayments,
    public event: PaymentEvent,
  ) {
    super(message);
  }
}

export class UserPaymentsProducer {
  constructor() {}

  produce(state: UserPayments, event: PaymentEvent) {
    const eventType = event.type;
    switch (event.type) {
      case "PaymentInitiated":
        this.handlePaymentInitiated(state, event);
        break;
      case "PaymentCompleted":
        this.handlePaymentCompleted(state, event);
        break;
      case "PaymentFailed":
        this.handlePaymentFailed(state, event);
        break;
      default:
        throw new Error(`Unhandled event type: ${eventType}`);
    }
    return state;
  }

  handlePaymentInitiated(state: UserPayments, event: PaymentInitiatedEvent) {
    if (state.payments[event.data.paymentId]) {
      throw new PaymentError("Course already exists", state, event);
    }

    state.payments[event.data.paymentId] = {
      paymentId: event.data.paymentId,
      userId: event.data.userId,
      userEmail: event.data.userEmail,
      products: event.data.products,
      data: {
        type: "pending",
      },
    };
  }

  handlePaymentCompleted(state: UserPayments, event: PaymentCompletedEvent) {
    const payment = state.payments[event.data.paymentId];
    if (!payment) {
      throw new PaymentError("Payment not found", state, event);
    }

    if (payment.data.type !== "pending") {
      throw new PaymentError("Payment already completed", state, event);
    }

    payment.data = {
      type: "success",
    };

    payment.products.forEach((product) => {
      state.successByProductId[product.sku] = payment.paymentId;
    });
  }

  handlePaymentFailed(state: UserPayments, event: PaymentFailedEvent) {
    const payment = state.payments[event.data.paymentId];
    if (!payment) {
      throw new PaymentError("Payment not found", state, event);
    }

    if (payment.data.type !== "pending") {
      throw new PaymentError("Payment already completed", state, event);
    }

    payment.data = {
      type: "failed",
      errorCode: event.data.errorCode,
      errorMessage: event.data.errorMessage,
    };
  }
}

export const userPaymentsProducer = new UserPaymentsProducer();
