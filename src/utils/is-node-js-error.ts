export function isNodeJsError(e: unknown): e is NodeJS.ErrnoException {
  return e instanceof Error;
}
