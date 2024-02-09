"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getCourseLessonsUseCase } from "../_use-cases/get-course-lessons";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string(),
});

export const getCourseLessonsAction = serverAction(
  {
    paramsSchema,
  },
  async ({ courseSlug }) => {
    const session = await getAppSessionStrictServer();
    return getCourseLessonsUseCase.exec({ session }, { courseSlug });
  },
);
