"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { addImageNodeUseCase } from "../_use-cases/add-image-node";
import {
  mapNodeDimensionsSchema,
  mapNodeSettingsSchema,
  mapNodePositionSchema,
} from "@/entities/map/map-node";

const params = z
  .object({
    src: z.string(),
  })
  .merge(mapNodeDimensionsSchema)
  .merge(mapNodePositionSchema)
  .merge(mapNodeSettingsSchema);

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
