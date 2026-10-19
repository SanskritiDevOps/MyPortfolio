// Shared JSON responder for the serverless functions (files under api/_lib aren't deployed as routes).
export function send(res, status, body, cacheControl) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (cacheControl) res.setHeader("Cache-Control", cacheControl);
  res.end(JSON.stringify(body));
}

export const HANDLE_RE = /^[A-Za-z0-9_.-]{1,40}$/;

export const usernameFrom = (req) => new URL(req.url, "http://localhost").searchParams.get("username") ?? "";
