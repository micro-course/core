import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { ServerActionErrorDto, serializeServerActionError } from "./error";

type ServerActionSuccessDto<T> = {
  type: "success";
  data: T;
};

type ServerActionDto<T> = ServerActionSuccessDto<T> | ServerActionErrorDto;

type ServerActionOptions<Params> = {
  paramsSchema?: z.Schema<Params>;
};

export function serverAction<Params = void, Return = unknown>(
  { paramsSchema = z.any() }: ServerActionOptions<Params>,
  handler: (params: Params) => Promise<Return>,
) {
  return async function action(
    params: Params,
  ): Promise<ServerActionDto<Return>> {
    return paramsSchema
      .parseAsync(params)
      .then((parsedParams) => handler(parsedParams))
      .then(
        (data) =>
          ({
            type: "success" as const,
            data,
          }) as const,
      )
      .catch((error) => {
        const serializedError = serializeServerActionError(error);

        if (serializedError.errorType === "UnknownServerError") {
          Sentry.captureException(error);
        }

        return serializedError;
      });
  };
}
