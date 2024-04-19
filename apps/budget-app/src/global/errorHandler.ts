export function customError(error: unknown, message?: string) {
  if (error instanceof Error) {
    return new Error(message + " " + error.message);
  }
  return new Error(message + " " + String(error));
}
