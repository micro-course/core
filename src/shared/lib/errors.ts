export class ActionError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class AuthorisationError extends ActionError {
  constructor(message?: string) {
    super(message);
  }
}
