import { profileConfig } from "../config/profileConfig";
import { getJson } from "./http";

/** CodeChef stats via this project's /api/codechef function (no public API / CORS). */
export async function fetchCodeChefStats() {
  const { handle } = profileConfig.codechef;
  return getJson(`/api/codechef?username=${encodeURIComponent(handle)}`, { timeout: 15000 });
}

/** CodeChef's star colours (1★ grey … 7★ red), lightened to stay readable on the dark theme. */
export const STAR_COLORS = ["#a1a1aa", "#4ade80", "#60a5fa", "#c084fc", "#fcd34d", "#fb923c", "#f87171"];
