import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { ServerActionErrorDto, serializeServerActionError } from "./error";
import { logger } from "../logger";

type ServerActionSuccessDto<T> = {
  type: "success";
  data: T;
};

type ServerActionDto<T> = ServerActionSuccessDto<T> | ServerActionErrorDto;

type ServerActionOptions<Params> = {
  name: string;
  paramsSchema?: z.Schema<Params>;
};

export function serverAction<Params = void, Return = unknown>(
  { paramsSchema = z.any(), name }: ServerActionOptions<Params>,
  handler: (params: Params) => Promise<Return>,
) {
  return async function action(
    params: Params,
  ): Promise<ServerActionDto<Return>> {
    return paramsSchema
      .parseAsync(params)
      .then((parsedParams) => handler(parsedParams))
      .then((data) => {
        logger.info({
          msg: `[Success] ${name}`,
          params,
        });
        return {
          type: "success" as const,
          data,
        } as const;
      })
      .catch((error) => {
        const serializedError = serializeServerActionError(error);

        if (serializedError.errorType === "UnknownServerError") {
          Sentry.captureException(error);
        }
        logger.error({
          msg: `[Error] ${name}`,
          params,
          error,
        });

        return serializedError;
      });
  };
}
