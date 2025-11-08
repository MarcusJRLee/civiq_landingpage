import crypto from "crypto";

/** SHA256 Hashing. */
export function hash256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}
