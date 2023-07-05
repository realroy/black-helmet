export function isError(error: unknown): error is Error {
  if (error instanceof Error) {
    return true;
  }

  return false;
}
