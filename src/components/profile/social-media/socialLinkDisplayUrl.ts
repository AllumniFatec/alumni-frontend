/** Texto curto para exibir um link (hostname + path), para listagens públicas. */
export function socialLinkDisplayUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    const host = u.hostname.replace(/^www\./, "");
    return (host + path) || host;
  } catch {
    return url;
  }
}
