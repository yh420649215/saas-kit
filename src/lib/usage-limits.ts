const FREE_LIMIT = 2;
const STORAGE_KEY = "aitools_usage";
const UNLOCKED_KEY = "aitools_unlocked";

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage full or private browsing — silently ignore
  }
}

export function getUsage(): number {
  const raw = safeGet(STORAGE_KEY);
  if (!raw) return 0;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

export function incrementUsage(): number {
  if (isUnlocked()) return 0;
  const next = getUsage() + 1;
  safeSet(STORAGE_KEY, String(next));
  return next;
}

export function remainingFree(): number {
  return Math.max(0, FREE_LIMIT - getUsage());
}

export function isUnlocked(): boolean {
  return safeGet(UNLOCKED_KEY) === "true";
}
