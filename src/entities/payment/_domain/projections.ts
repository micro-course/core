import { UserId } from "@/kernel";
import { record, z } from "zod";
import { USER_PAYMENTS_VERSION } from "../_const";
import { START } from "@eventstore/db-client";

export const productSchema = z.object({
  type: z.literal("course"),
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type Product = z.infer<typeof productSchema>;

const paymentData = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("pending"),
  }),
  z.object({
    type: z.literal("success"),
  }),
  z.object({
    type: z.literal("failed"),
    errorMessage: z.string(),
    errorCode: z.string(),
  }),
]);

export const paymentSchema = z.object({
  paymentId: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  products: z.array(productSchema),
  data: paymentData,
});

export type Payment = z.infer<typeof paymentSchema>;

export const userPaymentsSchema = z.object({
  userId: z.string(),
  meta: z.object({
    version: z.string(),
    revision: z.string(),
  }),
  payments: record(paymentSchema.optional()),
  successByProductId: record(z.string()),
});

export type UserPayments = z.infer<typeof userPaymentsSchema>;

export const createUserPayments = (userId: UserId): UserPayments => {
  return {
    userId,
    meta: {
      version: USER_PAYMENTS_VERSION,
      revision: START,
    },
    payments: {},
    successByProductId: {},
  };
};
