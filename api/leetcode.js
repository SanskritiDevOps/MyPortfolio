// GET /api/leetcode?username=<handle>
// Serverless function (Vercel) that proxies LeetCode's GraphQL API, which browsers can't
// call directly. Also mounted by vite.config.js so it works in `npm run dev` and `npm run preview`.
// Uses only plain Node req/res so it runs in both environments.

import { HANDLE_RE, send, usernameFrom } from "./_lib/send.js";

const QUERY = `
  query portfolioStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
    userContestRanking(username: $username) {
      rating
      attendedContestsCount
      topPercentage
      badge { name }
    }
    allQuestionsCount { difficulty count }
  }
`;

const pick = (list, difficulty) => list?.find((x) => x.difficulty === difficulty)?.count ?? null;

export default async function handler(req, res) {
  const username = usernameFrom(req);
  if (!HANDLE_RE.test(username)) return send(res, 400, { error: "Invalid username" });

  try {
    const upstream = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio-stats)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) return send(res, 502, { error: `LeetCode responded ${upstream.status}` });

    const { data } = await upstream.json();
    const user = data?.matchedUser;
    if (!user) return send(res, 404, { error: "User not found" });

    const ac = user.submitStatsGlobal?.acSubmissionNum;
    const all = data.allQuestionsCount;
    const contest = data.userContestRanking;

    // Cached at the edge for 30 min, served stale for up to a day while refreshing.
    return send(
      res,
      200,
      {
        username: user.username,
        ranking: user.profile?.ranking ?? null,
        solved: { all: pick(ac, "All"), easy: pick(ac, "Easy"), medium: pick(ac, "Medium"), hard: pick(ac, "Hard") },
        totals: all
          ? { all: pick(all, "All"), easy: pick(all, "Easy"), medium: pick(all, "Medium"), hard: pick(all, "Hard") }
          : null,
        contest: contest
          ? {
              rating: Math.round(contest.rating),
              attended: contest.attendedContestsCount,
              topPercentage: contest.topPercentage,
              badge: contest.badge?.name ?? null,
            }
          : null,
      },
      "public, s-maxage=1800, stale-while-revalidate=86400"
    );
  } catch {
    return send(res, 502, { error: "Could not reach LeetCode" });
  }
}
