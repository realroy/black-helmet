export class UnauthenticatedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

export class GetCurrentUserError extends Error {}
