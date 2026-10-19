import { profileConfig } from "../config/profileConfig";
import { getJson } from "./http";

const DAY = 86_400_000;

/** Latest public repos for the configured user, trimmed to the fields the UI needs (keeps the cache small). */
export async function fetchGitHubRepos() {
  const { username } = profileConfig.github;
  const repos = await getJson(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
    { headers: { Accept: "application/vnd.github+json" } }
  );

  return repos.map((r) => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    homepage: r.homepage || "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    topics: r.topics ?? [],
    pushedAt: r.pushed_at,
    archived: r.archived,
    fork: r.fork,
  }));
}

/** "in-progress" if pushed within 30 days and not archived, otherwise "completed" / "archived". */
export function repoStatus(repo, now = Date.now()) {
  if (repo.archived) return "archived";
  return now - Date.parse(repo.pushedAt) < 30 * DAY ? "in-progress" : "completed";
}

/** GitHub's own language colours for the languages likely to appear. */
export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#663399",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Go: "#00ADD8",
  Dockerfile: "#384d54",
};
