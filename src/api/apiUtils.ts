export function handleError(error: Error): void {
  // eslint-disable-next-line no-console
  console.error('API call failed. ' + error);
  throw error;
}
