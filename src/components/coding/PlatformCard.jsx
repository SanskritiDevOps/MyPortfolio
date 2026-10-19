import { ArrowUpRight } from "lucide-react";
import { timeAgo } from "../../utils/format";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import SpotlightCard from "../ui/SpotlightCard";
import { ACCENTS } from "../ui/motion";

/** Shared shell for a coding-platform card: header, live/cached indicator and profile link. */
export function PlatformCard({ platform, short, accent = "cyan", handle, url, live, children }) {
  const a = ACCENTS[accent] ?? ACCENTS.cyan;

  return (
    <SpotlightCard glow={a.glow} className="h-full p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-sm font-semibold ${a.icon}`}>
            {short}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{platform}</h3>
            {handle && <p className="font-mono text-xs text-zinc-500">@{handle}</p>}
          </div>
        </div>
        {url && (
          <Button href={url} size="sm" variant="secondary" aria-label={`${platform} profile`}>
            View profile
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        )}
      </div>
      {children}
      {live && <LiveIndicator {...live} />}
    </SpotlightCard>
  );
}

/** "Live · updated 5 minutes ago", or a note when showing cached / fallback data. */
function LiveIndicator({ updatedAt, error, fallback, manual }) {
  const label = manual
    ? "Updated manually"
    : fallback
      ? "Live stats unavailable · showing last known values"
      : error
        ? `Cached · updated ${timeAgo(updatedAt)}`
        : updatedAt
          ? `Live · updated ${timeAgo(updatedAt)}`
          : "Live";
  const ok = !manual && !fallback && !error;

  return (
    <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
      <span className="relative flex h-1.5 w-1.5">
        {ok && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-400" : "bg-zinc-500"}`} />
      </span>
      {label}
    </p>
  );
}

export function StatGrid({ stats, accent = "cyan", columns = "sm:grid-cols-4" }) {
  const a = ACCENTS[accent] ?? ACCENTS.cyan;
  const shown = stats.filter((s) => s.value !== null && s.value !== undefined && s.value !== "");
  if (!shown.length) return null;

  return (
    <dl className={`mt-6 grid grid-cols-2 gap-3 ${columns}`}>
      {shown.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/6 bg-white/2 px-4 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">{s.label}</dt>
          <dd className={`mt-1 font-display text-2xl font-bold ${s.className ?? a.text}`} style={s.style}>
            {s.value}
            {s.sub && <span className="ml-1 text-xs font-medium text-zinc-500">{s.sub}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StatGridSkeleton({ count = 4 }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-busy="true" aria-label="Loading stats">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-xl border border-white/6 bg-white/2 px-4 py-3">
          <Skeleton className="h-2.5 w-2/3" />
          <Skeleton className="mt-3 h-6 w-1/2" />
        </div>
      ))}
    </div>
  );
}
