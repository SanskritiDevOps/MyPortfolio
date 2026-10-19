import { useEffect, useState } from "react";
import { isFresh, readCache, writeCache } from "../services/cache";

/**
 * Stale-while-revalidate data hook backed by localStorage.
 *  - Cached data (even stale) renders immediately, so returning visitors never see a skeleton.
 *  - A network request is made only when the cache is missing or older than `ttlMinutes`.
 *  - If the request fails, the last good data is kept and `error` is set.
 *
 * `fetcher` must have a stable identity (define it at module level).
 */
export default function useLiveData(key, fetcher, { ttlMinutes = 60, enabled = true } = {}) {
  const [state, setState] = useState(() => {
    const cached = enabled ? readCache(key) : null;
    return {
      data: cached?.value ?? null,
      updatedAt: cached?.savedAt ?? null,
      loading: enabled && !cached,
      error: null,
    };
  });

  useEffect(() => {
    if (!enabled || isFresh(readCache(key), ttlMinutes)) return;
    let cancelled = false;

    fetcher()
      .then((value) => {
        if (cancelled) return;
        writeCache(key, value);
        setState({ data: value, updatedAt: Date.now(), loading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error }));
      });

    return () => {
      cancelled = true;
    };
  }, [key, fetcher, ttlMinutes, enabled]);

  return state;
}
