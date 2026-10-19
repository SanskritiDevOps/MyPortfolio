// GET /api/codechef?username=<handle>
// CodeChef has no public API, so this reads the public profile page and extracts the stats.
// If CodeChef changes its markup the fields come back null and the site uses its fallback values.

import { HANDLE_RE, send, usernameFrom } from "./_lib/send.js";

const num = (html, re) => {
  const m = html.match(re);
  return m ? Number(m[1]) : null;
};

export function parseProfile(html) {
  const starBlock = html.match(/<div class="rating-star">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const stars = (starBlock.match(/&#9733;|★/g) || []).length;
  return {
    rating: num(html, /class="rating-number">\s*(\d+)/),
    stars: stars || null,
    division: num(html, /<div>\(Div (\d)\)<\/div>/),
    highestRating: num(html, /Highest Rating (\d+)/),
    solved: num(html, /Total Problems Solved:\s*(\d+)/),
    contests: num(html, /No\. of Contests Participated:\s*<b>(\d+)/),
  };
}

export default async function handler(req, res) {
  const username = usernameFrom(req);
  if (!HANDLE_RE.test(username)) return send(res, 400, { error: "Invalid username" });

  try {
    const upstream = await fetch(`https://www.codechef.com/users/${encodeURIComponent(username)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio-stats)" },
      redirect: "manual", // unknown users redirect away from /users/<name>
      signal: AbortSignal.timeout(10000),
    });
    if (upstream.status >= 300 && upstream.status < 400) return send(res, 404, { error: "User not found" });
    if (!upstream.ok) return send(res, 502, { error: `CodeChef responded ${upstream.status}` });

    const stats = parseProfile(await upstream.text());
    if (stats.rating === null && stats.solved === null) {
      return send(res, 502, { error: "Could not read CodeChef profile" });
    }
    // Profile pages are slow to fetch; cache at the edge for 6 h, serve stale for a day.
    return send(res, 200, { username, ...stats }, "public, s-maxage=21600, stale-while-revalidate=86400");
  } catch {
    return send(res, 502, { error: "Could not reach CodeChef" });
  }
}
