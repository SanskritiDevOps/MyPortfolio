// Tiny localStorage cache. Every access is guarded: storage can be full, disabled or
// unavailable (private mode), and the site must still work without it.

const PREFIX = "portfolio:";

export function readCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    return entry && typeof entry.savedAt === "number" ? entry : null;
  } catch {
    return null;
  }
}

export function writeCache(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export const isFresh = (entry, ttlMinutes) => Boolean(entry) && Date.now() - entry.savedAt < ttlMinutes * 60_000;
