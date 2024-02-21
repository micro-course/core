"use server";

import { getAppSessionServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { getMapUseCase } from "../_use-cases/get-map";

export const getMapAction = serverAction(
  {
    name: "getMap",
  },
  async () => {
    const session = (await getAppSessionServer()) ?? undefined;
    return getMapUseCase.exec({ session });
  },
);
