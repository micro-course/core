import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { UpdateProfileController } from "./_controller";

export const updateProfileApi = createApi<UpdateProfileController["router"]>();

export const updateProfileHttpApi =
  createHttpApi<UpdateProfileController["router"]>();
