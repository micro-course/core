import { z } from "zod";

export const createCoursePurchaseSchema = z.object({
  courseSlug: z.string(),
  urlReturn: z.string(),
});

export const webhookDataScehama = z
  .object({
    _param_user_id: z.string(),
    _param_payment_id: z.string(),
    _param_sign: z.string(),
  })
  .transform((data) => {
    return {
      userId: data._param_user_id,
      paymentId: data._param_payment_id,
      sign: data._param_sign,
    };
  });
