import { createApi } from "@/kernel/lib/trpc/client";
import { CoursesListController } from "./controller";

export const coursesListApi = createApi<CoursesListController>();
