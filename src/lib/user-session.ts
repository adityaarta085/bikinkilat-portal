/**
 * BikinKilat Centralized User & Guest Session Helper
 * Zero-demo compliance: All users have real unique UUIDs
 */

const STORAGE_KEY_USER_ID = 'bikinkilat_client_uid';
const STORAGE_KEY_TOKENS = 'bikinkilat_token_balance';

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4 UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') {
    return generateUUID();
  }
  let uid = localStorage.getItem(STORAGE_KEY_USER_ID);
  if (!uid || uid.includes('11111111') || uid === 'demo') {
    uid = generateUUID();
    localStorage.setItem(STORAGE_KEY_USER_ID, uid);
  }
  return uid;
}

export function getCachedTokenBalance(): number {
  if (typeof window === 'undefined') return 5;
  const stored = localStorage.getItem(STORAGE_KEY_TOKENS);
  if (stored !== null) {
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? 5 : parsed;
  }
  localStorage.setItem(STORAGE_KEY_TOKENS, '5');
  return 5;
}

export function setCachedTokenBalance(tokens: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_TOKENS, tokens.toString());
  }
}
