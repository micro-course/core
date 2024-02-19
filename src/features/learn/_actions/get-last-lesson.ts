"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getLastLessonUseCase } from "../_use-cases/get-last-lesson";

export const getLastLessonAction = serverAction(
  {
    name: "getLastLesson",
  },
  async () => {
    const session = await getAppSessionStrictServer();
    return getLastLessonUseCase.exec({ session });
  },
);
