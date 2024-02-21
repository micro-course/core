"use server";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { serverAction } from "@/shared/lib/server-action/server";
import { z } from "zod";
import { handlePayformResultUseCase } from "../_use-cases/handle-payform-result";

const paramsSchema = z.object({
  payformId: z.string(),
  payformOrderId: z.string(),
  payformSign: z.string(),
  payformStatus: z.string(),
});

export const handlePayformResultAction = serverAction(
  { name: "handlePayformResult", paramsSchema },
  async (params) => {
    const session = await getAppSessionStrictServer();
    return handlePayformResultUseCase.exec({ session }, params);
  },
);
