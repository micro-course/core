"use server";
import { serverAction } from "@/shared/lib/server-action/server";
import { ProgressStatisticsQuery } from "../_domain/types/progress-statistics";
import { getProgressStatisticsUseCase } from "../_use-cases/get-progress-statistics";
import { getAppSessionStrictServer } from "@/entities/user/session.server";

export const getProgressStatisticsAction = serverAction(
  {
    name: "get-progress-statistics",
    paramsSchema: ProgressStatisticsQuery,
  },
  async (query) => {
    return getProgressStatisticsUseCase.exec(
      { session: await getAppSessionStrictServer() },
      query,
    );
  },
);
