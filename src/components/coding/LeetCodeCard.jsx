import { motion } from "framer-motion";
import { Award, Flame, Medal, Target, Trophy } from "lucide-react";
import { profileConfig } from "../../config/profileConfig";
import { formatNumber } from "../../utils/format";
import Skeleton from "../ui/Skeleton";
import { EASE, viewportOnce } from "../ui/motion";
import { PlatformCard, StatGrid, StatGridSkeleton } from "./PlatformCard";

const { username, fallback } = profileConfig.leetcode;

const DIFFICULTY = [
  { key: "easy", label: "Easy", bar: "bg-emerald-400", text: "text-emerald-300" },
  { key: "medium", label: "Medium", bar: "bg-amber-400", text: "text-amber-300" },
  { key: "hard", label: "Hard", bar: "bg-rose-400", text: "text-rose-300" },
];

function DifficultyBars({ solved, totals }) {
  const max = Math.max(...DIFFICULTY.map((d) => solved[d.key] ?? 0), 1);
  return (
    <ul className="mt-6 space-y-3">
      {DIFFICULTY.map((d, i) => {
        const count = solved[d.key] ?? 0;
        const total = totals?.[d.key];
        // vs. total questions when known, otherwise relative to the largest bucket
        const pct = total ? (count / total) * 100 : (count / max) * 100;
        return (
          <li key={d.key}>
            <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
              <span className={d.text}>{d.label}</span>
              <span className="text-zinc-400">
                <span className="text-zinc-100">{count}</span>
                {total ? <span className="text-zinc-600"> / {total}</span> : null}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
              <motion.div
                className={`h-full rounded-full ${d.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(pct, 2)}%` }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Badges derived from the real numbers — nothing hard-coded. */
function achievementBadges({ solved, contest }) {
  const badges = [];
  if (solved?.all >= 100) badges.push({ icon: Flame, label: `${Math.floor(solved.all / 100) * 100}+ problems solved` });
  if (solved?.hard >= 10) badges.push({ icon: Target, label: `${solved.hard} hard problems` });
  if (contest?.topPercentage) badges.push({ icon: Medal, label: `Top ${contest.topPercentage}% in contests` });
  if (contest?.attended) badges.push({ icon: Trophy, label: `${contest.attended} contests attended` });
  if (contest?.badge) badges.push({ icon: Award, label: contest.badge });
  return badges;
}

/** `state` comes from useLiveData in the parent section (shared with the headline counter). */
export default function LeetCodeCard({ state }) {
  const { data: live, loading, error, updatedAt } = state;
  const usingFallback = !live && !loading;
  const data = live ?? (usingFallback ? { ...fallback, username } : null);

  return (
    <PlatformCard
      platform="LeetCode"
      short="LC"
      accent="amber"
      handle={username}
      url={`https://leetcode.com/u/${username}/`}
      live={data ? { updatedAt, error, fallback: usingFallback } : null}
    >
      {!data ? (
        <>
          <StatGridSkeleton />
          <div className="mt-6 space-y-4">
            {DIFFICULTY.map((d) => (
              <Skeleton key={d.key} className="h-1.5 w-full" />
            ))}
          </div>
        </>
      ) : (
        <>
          <StatGrid
            accent="amber"
            stats={[
              { label: "Solved", value: data.solved?.all, sub: data.totals?.all ? `/ ${formatNumber(data.totals.all)}` : null },
              { label: "Contest rating", value: data.contest?.rating ? Math.round(data.contest.rating) : null },
              { label: "Global rank", value: data.ranking ? `#${formatNumber(data.ranking)}` : null, className: "text-zinc-100" },
              { label: "Top", value: data.contest?.topPercentage ? `${data.contest.topPercentage}%` : null, className: "text-zinc-100" },
            ]}
          />
          <DifficultyBars solved={data.solved} totals={data.totals} />
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Achievements">
            {achievementBadges(data).map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/8 px-2.5 py-1 font-mono text-[11px] text-amber-100 shadow-[0_0_14px_-6px_rgba(251,191,36,0.6)]"
              >
                <Icon size={12} className="text-amber-300" /> {label}
              </li>
            ))}
          </ul>
        </>
      )}
    </PlatformCard>
  );
}
