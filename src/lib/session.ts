/**
 * Cross-Subdomain Session & Token Sync Helper for *.bikinkilat.web.id
 */

const SESSION_COOKIE_NAME = "bikinkilat_session";
const TOKEN_COOKIE_NAME = "bikinkilat_token_cache";

export function getCookieDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const hostname = window.location.hostname;
  if (hostname.endsWith("bikinkilat.web.id")) {
    return ".bikinkilat.web.id";
  }
  return undefined; // Localhost development
}

export function setSharedSessionCookie(userId: string, tokens: number): void {
  if (typeof document === "undefined") return;
  const domain = getCookieDomain();
  const domainStr = domain ? `; Domain=${domain}` : "";
  const maxAge = 60 * 60 * 24 * 30; // 30 days

  document.cookie = `${SESSION_COOKIE_NAME}=${encodeURIComponent(
    userId
  )}; Path=/${domainStr}; Max-Age=${maxAge}; SameSite=Lax`;

  document.cookie = `${TOKEN_COOKIE_NAME}=${tokens}; Path=/${domainStr}; Max-Age=${maxAge}; SameSite=Lax`;
}

export function clearSharedSessionCookie(): void {
  if (typeof document === "undefined") return;
  const domain = getCookieDomain();
  const domainStr = domain ? `; Domain=${domain}` : "";

  document.cookie = `${SESSION_COOKIE_NAME}=; Path=/${domainStr}; Max-Age=0; SameSite=Lax`;
  document.cookie = `${TOKEN_COOKIE_NAME}=; Path=/${domainStr}; Max-Age=0; SameSite=Lax`;
}

export function getSharedSessionCookie(): { userId: string | null; cachedTokens: number | null } {
  if (typeof document === "undefined") return { userId: null, cachedTokens: null };

  const cookies = document.cookie.split(";").reduce((acc, c) => {
    const [key, val] = c.trim().split("=");
    if (key && val) acc[key] = decodeURIComponent(val);
    return acc;
  }, {} as Record<string, string>);

  const userId = cookies[SESSION_COOKIE_NAME] || null;
  const cachedTokens = cookies[TOKEN_COOKIE_NAME] ? parseInt(cookies[TOKEN_COOKIE_NAME], 10) : null;

  return { userId, cachedTokens };
}
