/* ================================================================
   LIVE-DATA CONFIG
   Usernames for everything the site fetches automatically.
   Change a value here and the matching section updates itself.
   Leave a username empty ("") to hide that platform's card.
================================================================ */

export const profileConfig = {
  github: {
    username: "SanskritiDevOps",
    maxRepos: 6, // repo cards shown under "Latest from GitHub"
    cacheMinutes: 45, // GitHub allows 60 unauthenticated requests/hour per visitor
    exclude: ["SanskritiDevOps"], // repos to never list (profile README etc.)
  },

  leetcode: {
    username: "sanskriti_codes", // the handle in leetcode.com/u/<username>
    cacheMinutes: 60,
    // Shown if the live APIs are unreachable and nothing is cached yet.
    fallback: {
      solved: { all: 401, easy: 173, medium: 190, hard: 38 },
      contest: { rating: 1640, attended: 12, topPercentage: 19.59 },
    },
  },

  codeforces: {
    handle: "", // TODO: your Codeforces handle (official API, fetched live)
    cacheMinutes: 60,
  },

  codechef: {
    handle: "san_codez", // the name in codechef.com/users/<handle>
    cacheMinutes: 360,
    // No official API: stats are read from the public profile by /api/codechef.
    // These values are shown if that fails and nothing is cached yet.
    fallback: { rating: 1522, stars: 2, division: 3, highestRating: 1522, solved: 548, contests: 45 },
  },

  dsa: {
    // Headline = LeetCode solved + CodeChef solved (live), never lower than this floor.
    totalSolved: 400,
    roundTo: 50, // rounded down for display, e.g. 949 → "900+"
  },
};
