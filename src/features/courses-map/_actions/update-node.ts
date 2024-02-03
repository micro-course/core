"use server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import {
  mapNodeDimensionsSchema,
  mapNodeSettingsSchema,
  mapNodePositionSchema,
} from "@/entities/map/map-node";
import { updateNodeUseCase } from "../_use-cases/update-node";

const params = z
  .object({
    id: z.string(),
  })
  .merge(mapNodeDimensionsSchema.partial())
  .merge(mapNodePositionSchema.partial())
  .merge(mapNodeSettingsSchema.partial());

export const updateNodeAction = serverAction(
  {
    paramsSchema: params,
  },
  async (data) => {
    const session = await getAppSessionStrictServer();
    return updateNodeUseCase.exec({ session }, data);
  },
);
