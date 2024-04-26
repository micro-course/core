import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CourseDetailsController } from "./_controller";

export const courseDetailsApi = createApi<CourseDetailsController["router"]>();

export const courseDetailsHttpApi =
  createHttpApi<CourseDetailsController["router"]>();
