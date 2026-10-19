import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookMarked, ExternalLink } from "lucide-react";
import { profileConfig } from "../../config/profileConfig";
import { timeAgo } from "../../utils/format";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { GitHubIcon } from "../ui/Icons";
import Skeleton from "../ui/Skeleton";
import SpotlightCard from "../ui/SpotlightCard";
import { EASE } from "../ui/motion";
import { LanguageDot, StarsForks, StatusBadge } from "./RepoMeta";

const ALL = "All";
const { username, maxRepos } = profileConfig.github;
const profileUrl = `https://github.com/${username}`;

function RepoCard({ repo }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <BookMarked size={16} className="shrink-0 text-cyan-300" />
          {/* stretched link: the whole card opens the repo */}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="truncate font-display text-[15px] font-semibold text-white after:absolute after:inset-0 hover:text-cyan-200"
          >
            {repo.name}
          </a>
        </div>
        <StatusBadge repo={repo} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
        {repo.description || <span className="italic text-zinc-600">No description yet.</span>}
      </p>

      {repo.topics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <li key={t}>
              <Badge tone="cyan">{t}</Badge>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 font-mono text-[11px] text-zinc-500">
        <LanguageDot language={repo.language} />
        <StarsForks repo={repo} />
        <span>{timeAgo(repo.pushedAt)}</span>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${repo.name} live site`}
            className="relative z-10 ml-auto text-zinc-400 transition-colors hover:text-cyan-300"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

function RepoSkeleton() {
  return (
    <div className="rounded-2xl border border-white/7 bg-ink-900/70 p-5">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
      <Skeleton className="mt-6 h-3 w-2/3" />
    </div>
  );
}

/** "Latest from GitHub" grid. Receives the shared useLiveData state from the Projects section. */
export default function GitHubRepos({ state, hide = [] }) {
  const { data, loading, error, updatedAt } = state;
  const [language, setLanguage] = useState(ALL);

  const repos = useMemo(() => {
    const hidden = new Set([...hide, ...profileConfig.github.exclude].map((n) => n.toLowerCase()));
    return (data ?? []).filter((r) => !r.fork && !hidden.has(r.name.toLowerCase()));
  }, [data, hide]);

  const languages = useMemo(() => [ALL, ...new Set(repos.map((r) => r.language).filter(Boolean))], [repos]);
  const visible = (language === ALL ? repos : repos.filter((r) => r.language === language)).slice(0, maxRepos);

  return (
    <div className="mt-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-white">
            <GitHubIcon className="h-6 w-6" /> Latest from GitHub
          </h3>
          <p className="mt-2 flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="relative flex h-2 w-2">
              {!error && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${error ? "bg-amber-400" : "bg-emerald-400"}`} />
            </span>
            {loading ? "Syncing…" : error ? (data ? "Showing cached data" : "Couldn't reach GitHub") : "Synced live"}
            {updatedAt && <span>· updated {timeAgo(updatedAt)}</span>}
          </p>
        </div>

        {languages.length > 2 && (
          <div role="group" aria-label="Filter repositories by language" className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                  language === lang
                    ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-100"
                    : "border-white/8 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && !data ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading repositories">
          {Array.from({ length: maxRepos }, (_, i) => (
            <RepoSkeleton key={i} />
          ))}
        </div>
      ) : !data ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-white/8 bg-white/2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            GitHub isn't responding right now (it limits how often a browser can ask). My repositories are one click away.
          </p>
          <Button href={profileUrl} size="sm" variant="secondary">
            Open GitHub <ArrowUpRight size={14} />
          </Button>
        </div>
      ) : (
        <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((repo, i) => (
              <motion.li
                key={repo.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
              >
                <RepoCard repo={repo} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {data && visible.length === 0 && (
        <p className="mt-8 text-sm text-zinc-500">No other public repositories to show yet.</p>
      )}

      <div className="mt-8">
        <Button href={profileUrl} variant="secondary" size="sm">
          View all repositories <ArrowUpRight size={14} />
        </Button>
      </div>
    </div>
  );
}
