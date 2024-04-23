import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CoursesMapController } from "./_controller";

export const coursesMapApi = createApi<CoursesMapController["router"]>();

export const coursesMapHttpApi =
  createHttpApi<CoursesMapController["router"]>();
