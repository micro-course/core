import { createApi } from "@/kernel/lib/trpc/client";
import { CoursePurchaseController } from "./_controller";

export const coursePurchaseApi =
  createApi<CoursePurchaseController["router"]>();
