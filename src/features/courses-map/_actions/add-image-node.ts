"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { mapNodeBaseSchema } from "@/entities/map/map-node";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { addImageNodeUseCase } from "../_use-cases/add-image-node";

const params = z
  .object({
    src: z.string(),
  })
  .merge(mapNodeBaseSchema);

export const addImageNodeAction = serverAction(
  {
    paramsSchema: params,
  },
  async (data) => {
    const session = await getAppSessionStrictServer();
    const result = await addImageNodeUseCase.exec({ session }, data);
    return result;
  },
);
