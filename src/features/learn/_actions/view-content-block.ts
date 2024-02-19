"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { viewContentBlockUseCase } from "../_use-cases/view-content-block";

const paramsSchema = z.object({
  courseSlug: z.string(),
  lessonSlug: z.string(),
  contentBlockId: z.string(),
});

export const viewContentBlockAction = serverAction(
  {
    name: "viewContentBlock",
    paramsSchema,
  },
  async (query) => {
    const session = await getAppSessionStrictServer();
    return viewContentBlockUseCase.exec({ session }, query);
  },
);
