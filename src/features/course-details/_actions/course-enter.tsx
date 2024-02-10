"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { courseEnterUseCase } from "../_use-cases/course-enter";

const paramsSchema = z.object({
  courseSlug: z.string(),
});

export const courseEnterAction = serverAction(
  {
    paramsSchema,
  },
  async (params) => {
    const session = await getAppSessionStrictServer();
    const courseAction = await courseEnterUseCase.exec({ session }, params);

    return courseAction;
  },
);
