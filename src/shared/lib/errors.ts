export class AuthorizatoinError extends Error {
  constructor(message = "AuthorizatoinError") {
    super(message);
  }
}

export class NeedAuthError extends Error {
  constructor(message = "NeedAuthError") {
    super(message);
  }
}

export class BadRequest extends Error {
  constructor(message = "BadRequest") {
    super(message);
  }
}

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
