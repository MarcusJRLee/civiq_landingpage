/** Utility to get the current Unix timestamp in seconds. */
export function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}
