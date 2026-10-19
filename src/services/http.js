/** fetch + JSON with a timeout. Throws on network errors, non-2xx and non-JSON responses. */
export async function getJson(url, { timeout = 10000, ...init } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
    if (!(res.headers.get("content-type") || "").includes("json")) {
      throw new Error(`Expected JSON from ${url}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
