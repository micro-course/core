import {
  SerialazableErrors,
  SerializableError,
  UnknownServerError,
} from "../errors";

type ErrorType = keyof typeof SerialazableErrors;
export type ServerActionError = InstanceType<
  (typeof SerialazableErrors)[keyof typeof SerialazableErrors]
>;

const getErrorType = (error: unknown): ErrorType => {
  const entry = Object.entries(SerialazableErrors).find(([key, errorClass]) => {
    if (error instanceof errorClass) {
      return key;
    }
  });
  return (entry?.[0] as ErrorType) ?? "UnknownServerError";
};

export type ServerActionErrorDto = {
  type: "error";
  errorType: ErrorType;
  error: string;
};

export const serializeServerActionError = (
  error: unknown,
): ServerActionErrorDto => {
  if (error instanceof SerializableError) {
    return {
      type: "error",
      errorType: getErrorType(error),
      error: error.toJSON(),
    };
  }
  if (error instanceof Error) {
    return {
      type: "error",
      errorType: "UnknownServerError",
      error: new UnknownServerError(error.stack).toJSON(),
    };
  }
  return {
    type: "error",
    errorType: "UnknownServerError",
    error: new UnknownServerError().toJSON(),
  };
};

export const parseServerActionError = (error: ServerActionErrorDto) => {
  const errorClass = SerialazableErrors[error.errorType];
  if (errorClass) {
    return errorClass.fromJSON(error.error);
  }
  return new UnknownServerError();
};
