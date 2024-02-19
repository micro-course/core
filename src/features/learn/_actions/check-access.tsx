"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { checkAccessUseCase } from "../_use-cases/check-access";

const paramsSchema = z.object({
  courseSlug: z.string(),
});

export const getCheckAccessAction = serverAction(
  {
    name: "getCheckAccess",
    paramsSchema,
  },
  async ({ courseSlug }) => {
    const session = await getAppSessionStrictServer();

    return checkAccessUseCase.exec({ session }, { courseSlug });
  },
);
