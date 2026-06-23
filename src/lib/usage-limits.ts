const FREE_LIMIT = 2;
const STORAGE_KEY = "aitools_usage";
const UNLOCKED_KEY = "aitools_unlocked";

export function getUsage(): number {
  if (typeof window === "undefined") return 0;
  if (isUnlocked()) return 0;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

export function incrementUsage(): number {
  if (typeof window === "undefined") return 0;
  if (isUnlocked()) return 0;
  const current = getUsage();
  const next = current + 1;
  localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

export function remainingFree(): number {
  return Math.max(0, FREE_LIMIT - getUsage());
}

export function hasFreeUses(): boolean {
  return remainingFree() > 0;
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(UNLOCKED_KEY) === "true";
}

export function unlock(): void {
  localStorage.setItem(UNLOCKED_KEY, "true");
}
