"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getLearnLessonUseCase } from "../_use-cases/get-learn-lesson";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string(),
  lessonSlug: z.string(),
});

export const getLearnLessonAction = serverAction(
  {
    name: "getLearnLesson",
    paramsSchema,
  },
  async (query) => {
    const session = await getAppSessionStrictServer();
    return getLearnLessonUseCase.exec({ session }, query);
  },
);
