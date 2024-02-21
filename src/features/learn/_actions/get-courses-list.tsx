"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getCoursesListUseCase } from "../_use-cases/get-courses-list";

export const getCoursesListAction = serverAction(
  {
    name: "getCoursesList",
  },
  async () => {
    const session = await getAppSessionStrictServer();
    return getCoursesListUseCase.exec({ session });
  },
);
