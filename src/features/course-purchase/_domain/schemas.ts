import { z } from "zod";

export const createCoursePurchaseSchema = z.object({
  courseSlug: z.string(),
  urlReturn: z.string(),
});
