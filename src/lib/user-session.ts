import { getCookieDomain, safeDecodeURIComponent } from "./session";

/**
 * BikinKilat Centralized User & Guest Session Helper
 * Synchronized across *.bikinkilat.web.id via cross-subdomain cookies
 */

const STORAGE_KEY_USER_ID = "bikinkilat_client_uid";
const STORAGE_KEY_TOKENS = "bikinkilat_token_balance";

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? safeDecodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === "undefined") return;
  const domain = getCookieDomain();
  const domainStr = domain ? `; Domain=${domain}` : "";
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secureStr = isSecure ? "; Secure" : "";
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${domainStr}${secureStr}`;
}

export function getOrCreateGuestId(): string {
  if (typeof window === "undefined") {
    return generateUUID();
  }

  // 1. Check cross-subdomain cookie first
  let uid = getCookie(STORAGE_KEY_USER_ID);

  // 2. Fallback to localStorage
  if (!uid) {
    try {
      uid = localStorage.getItem(STORAGE_KEY_USER_ID);
    } catch (e) {}
  }

  // 3. Generate new if invalid or missing
  if (!uid || uid.includes("11111111") || uid === "demo") {
    uid = generateUUID();
  }

  // 4. Save to both cookie and localStorage
  setCookie(STORAGE_KEY_USER_ID, uid, 365);
  try {
    localStorage.setItem(STORAGE_KEY_USER_ID, uid);
  } catch (e) {}

  return uid;
}

export function getCachedTokenBalance(): number {
  if (typeof window === "undefined") return 5;

  // 1. Check cross-subdomain cookie first
  const cookieVal = getCookie(STORAGE_KEY_TOKENS);
  if (cookieVal !== null) {
    const parsed = parseInt(cookieVal, 10);
    if (!isNaN(parsed)) return parsed;
  }

  // 2. Fallback to localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY_TOKENS);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) {
        setCookie(STORAGE_KEY_TOKENS, parsed.toString(), 365);
        return parsed;
      }
    }
  } catch (e) {}

  // Default initial guest balance: 5 free tokens
  setCookie(STORAGE_KEY_TOKENS, "5", 365);
  try {
    localStorage.setItem(STORAGE_KEY_TOKENS, "5");
  } catch (e) {}
  return 5;
}

export function setCachedTokenBalance(tokens: number): void {
  if (typeof window !== "undefined") {
    const val = Math.max(0, tokens).toString();
    setCookie(STORAGE_KEY_TOKENS, val, 365);
    try {
      localStorage.setItem(STORAGE_KEY_TOKENS, val);
    } catch (e) {}
  }
}
