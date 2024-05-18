import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { UpdateProfileRouter } from "./router";

export const updateProfileApi = createApi<UpdateProfileRouter>();

export const updateProfileHttpApi = createHttpApi<UpdateProfileRouter>();
