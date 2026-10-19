import { profileConfig } from "../config/profileConfig";
import { getJson } from "./http";

/** Official Codeforces API (CORS-enabled). */
export async function fetchCodeforcesStats() {
  const { handle } = profileConfig.codeforces;
  const res = await getJson(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`);
  if (res.status !== "OK" || !res.result?.length) throw new Error(res.comment || "Codeforces user not found");
  const u = res.result[0];
  return {
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null,
    rank: u.rank ?? "unrated",
    maxRank: u.maxRank ?? null,
  };
}

/** Codeforces rank colours. */
export function codeforcesRankColor(rank = "") {
  const r = rank.toLowerCase();
  if (r.includes("legendary") || r.includes("international grandmaster") || r === "grandmaster") return "text-red-400";
  if (r.includes("master")) return "text-orange-300";
  if (r.includes("candidate")) return "text-violet-300";
  if (r.includes("expert")) return "text-blue-300";
  if (r.includes("specialist")) return "text-cyan-300";
  if (r.includes("pupil")) return "text-green-300";
  return "text-zinc-300";
}
