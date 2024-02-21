import { publicConfig } from "../config/public";

export class SerializableError extends Error {
  toJSON() {
    return JSON.stringify(
      {
        message: this.message,
        stack: this.stack,
      },
      null,
      2,
    );
  }

  static fromJSON(json: string) {
    const { message, stack } = JSON.parse(json);
    const error = new this(message);
    if (publicConfig.isDev) {
      error.stack = stack;
    }
    return error;
  }
}

export class UnknownServerError extends SerializableError {
  constructor(message = "UnknownServerError", stack?: string) {
    super(message);
    if (stack) {
      this.stack = stack;
    }
  }
}

export class AuthorizatoinError extends SerializableError {
  constructor(message = "AuthorizatoinError") {
    super(message);
  }
}

export class NeedAuthError extends SerializableError {
  constructor(message = "NeedAuthError") {
    super(message);
  }
}

export class NotFoundError extends SerializableError {
  constructor(message = "NotFoundError") {
    super(message);
  }
}

export class BadRequest extends SerializableError {
  constructor(
    message = "BadRequest",
    public errors = [] as unknown[],
  ) {
    super(message);
  }

  toJSON() {
    return JSON.stringify(
      {
        message: this.message,
        errors: this.errors,
      },
      null,
      2,
    );
  }

  static fromJSON(json: string) {
    const { message, errors } = JSON.parse(json);
    return new this(message, errors);
  }
}

export const SerialazableErrors = {
  AuthorizatoinError,
  UnknownServerError,
  BadRequest,
  NeedAuthError,
  NotFoundError,
};

export class ParsingError extends Error {
  constructor(
    public source: string,
    message = "ParsingError",
    cause?: unknown,
  ) {
    super(message, { cause });
  }
}

export class ValidationError extends Error {
  constructor(
    public errors: unknown[],
    message = "ValidationError",
  ) {
    super(message);
  }
}
