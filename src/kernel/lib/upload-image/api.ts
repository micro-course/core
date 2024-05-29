import { createApi } from "@/kernel/lib/trpc/client";
import type { UploadImageRouter } from "./router";

export const uploadImageApi = createApi<UploadImageRouter>();
