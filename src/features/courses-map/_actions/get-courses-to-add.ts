"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getCoursesToAddUseCase } from "../_use-cases/get-courses-to-add";

export const getCoursesToAddAction = serverAction(
  {
    name: "getCoursesToAdd",
  },
  async () => {
    const session = await getAppSessionStrictServer();
    return getCoursesToAddUseCase.exec({ session });
  },
);
