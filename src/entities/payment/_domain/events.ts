import { DateTimeISOString, PaymentId, UserId } from "@/kernel";
import { EventData, JSONEventType } from "@eventstore/db-client";
import { Product } from "./projections";

type MetaData = {
  version: 1;
  datetime: DateTimeISOString;
};

export type PaymentInitiatedEvent = JSONEventType<
  "PaymentInitiated",
  {
    paymentId: PaymentId;
    userId: UserId;
    userEmail: string;
    products: Product[];
  },
  MetaData
>;

export type PaymentCompletedEvent = JSONEventType<
  "PaymentCompleted",
  {
    paymentId: PaymentId;
  },
  MetaData
>;

export type PaymentFailedEvent = JSONEventType<
  "PaymentFailed",
  {
    paymentId: PaymentId;
    errorCode: string;
    errorMessage: string;
  },
  MetaData
>;

export type PaymentEvent =
  | PaymentInitiatedEvent
  | PaymentCompletedEvent
  | PaymentFailedEvent;

export type PaymentEventData = EventData<PaymentEvent>;
