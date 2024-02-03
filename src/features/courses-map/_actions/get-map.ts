"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getMapUseCase } from "../_use-cases/get-map";

export const getMapAction = serverAction({}, async () => {
  const session = await getAppSessionStrictServer();
  return getMapUseCase.exec({ session });
});
