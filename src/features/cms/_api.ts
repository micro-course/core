import { createApi } from "@/kernel/lib/trpc/client";
import { CmsRouter } from "./router";

export const crmApi = createApi<CmsRouter>();
