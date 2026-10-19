import { profileConfig } from "../config/profileConfig";
import { getJson } from "./http";

/*
 * LeetCode's GraphQL API can't be called from a browser (no CORS), so:
 *   1. /api/leetcode — this project's own serverless function (Vercel), also served by
 *      `npm run dev` / `npm run preview` through a Vite middleware (see vite.config.js).
 *   2. alfa-leetcode-api — a public community proxy, used if (1) isn't deployed.
 * Both are normalised to the same shape:
 *   { username, ranking, solved: {all,easy,medium,hard}, totals: {…}|null, contest: {…}|null }
 */

const ALFA = "https://alfa-leetcode-api.onrender.com";

async function fromOwnApi(username) {
  return getJson(`/api/leetcode?username=${encodeURIComponent(username)}`, { timeout: 12000 });
}

async function fromAlfa(username) {
  const u = encodeURIComponent(username);
  // onrender free instances cold-start slowly, hence the generous timeout
  const [solved, contest, profile] = await Promise.allSettled([
    getJson(`${ALFA}/${u}/solved`, { timeout: 25000 }),
    getJson(`${ALFA}/${u}/contest`, { timeout: 25000 }),
    getJson(`${ALFA}/${u}`, { timeout: 25000 }),
  ]);
  if (solved.status !== "fulfilled" || typeof solved.value.solvedProblem !== "number") {
    throw solved.reason ?? new Error("LeetCode stats unavailable");
  }
  const s = solved.value;
  const c = contest.status === "fulfilled" ? contest.value : null;
  return {
    username,
    ranking: profile.status === "fulfilled" ? profile.value.ranking ?? null : null,
    solved: { all: s.solvedProblem, easy: s.easySolved, medium: s.mediumSolved, hard: s.hardSolved },
    totals: null,
    contest:
      c && c.contestRating
        ? {
            rating: c.contestRating,
            attended: c.contestAttend ?? null,
            topPercentage: c.contestTopPercentage ?? null,
            badge: c.contestBadges?.name ?? null,
          }
        : null,
  };
}

export async function fetchLeetCodeStats() {
  const { username } = profileConfig.leetcode;
  try {
    return await fromOwnApi(username);
  } catch {
    return fromAlfa(username);
  }
}
