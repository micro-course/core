"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { addCourseNodeUseCase } from "../_use-cases/add-course-node";
import { mapNodeBaseSchema } from "@/entities/map/map-node";

const params = z
  .object({
    courseId: z.string(),
  })
  .merge(mapNodeBaseSchema);

export const addCourseNodeAction = serverAction(
  {
    paramsSchema: params,
  },
  async (data) => {
    const session = await getAppSessionStrictServer();
    return addCourseNodeUseCase.exec({ session }, data);
  },
);
