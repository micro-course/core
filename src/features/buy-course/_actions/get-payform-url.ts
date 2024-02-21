"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getPayformUrlUseCase } from "../_use-cases/get-payform-url";
import { z } from "zod";

const paramsSchema = z.object({
  buyCourse: z
    .object({
      courseSlug: z.string(),
      urlReturn: z.string(),
    })
    .optional(),
});

export const getPayformUrlAction = serverAction(
  { name: "getPayformUrl", paramsSchema },
  async (params) => {
    const session = await getAppSessionStrictServer();
    return getPayformUrlUseCase.exec({ session }, params);
  },
);
