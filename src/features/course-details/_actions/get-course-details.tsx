"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getCourseDetailsUseCase } from "../_use-cases/get-course-details";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string(),
});

export const getCourseDetailsAction = serverAction(
  {
    paramsSchema,
  },
  async (params) => {
    const session = await getAppSessionStrictServer();
    return getCourseDetailsUseCase.exec({ session }, params);
  },
);
