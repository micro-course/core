"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { updateBaseNodeUseCase } from "../_use-cases/update-base-node";
import { mapNodeBaseSchema } from "@/entities/map/map-node";

const params = z
  .object({
    id: z.string(),
  })
  .merge(mapNodeBaseSchema.partial());

export const updateBaseNodeAction = serverAction(
  {
    paramsSchema: params,
  },
  async (data) => {
    const session = await getAppSessionStrictServer();
    return updateBaseNodeUseCase.exec({ session }, data);
  },
);
