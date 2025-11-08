import { BrowserData } from "@/types/types";

/** Gets the IP Address of the current user. */
export async function getIpAddress(): Promise<string | undefined> {
  return await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => data.ip as string)
    .catch(() => undefined);
}

/** Creates a BrowserData object for event payloads. */
export async function getBrowserData(): Promise<BrowserData> {
  const client_ip_address = await getIpAddress();
  const client_user_agent =
    typeof navigator !== "undefined" ? navigator.userAgent : undefined;
  const fbp =
    typeof document !== "undefined"
      ? document.cookie.match(/(?:^|;\s*)_fbp=([^;]*)/)?.[1]
      : undefined;
  const fbc =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("fbclid") || undefined
      : undefined;
  return {
    client_ip_address,
    client_user_agent,
    fbp,
    fbc,
  };
}
