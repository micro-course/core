"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { mapNodeBaseSchema } from "@/entities/map/map-node";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { deleteNodeUseCase } from "../_use-cases/delete-node";

const params = z
  .object({
    id: z.string(),
  })
  .merge(mapNodeBaseSchema);

export const deleteNodeAction = serverAction(
  {
    paramsSchema: params,
  },
  async (data) => {
    const session = await getAppSessionStrictServer();
    return deleteNodeUseCase.exec({ session }, data);
  },
);
