import { profileConfig } from "../../config/profileConfig";
import useLiveData from "../../hooks/useLiveData";
import { codeforcesRankColor, fetchCodeforcesStats } from "../../services/codeforces";
import { PlatformCard, StatGrid, StatGridSkeleton } from "./PlatformCard";

const { handle, cacheMinutes } = profileConfig.codeforces;
const titleCase = (s) => s?.replace(/\b\w/g, (c) => c.toUpperCase());

/** Rendered only when a Codeforces handle is configured. */
export default function CodeforcesCard() {
  const { data, loading, error, updatedAt } = useLiveData(`codeforces:${handle}`, fetchCodeforcesStats, {
    ttlMinutes: cacheMinutes,
  });

  return (
    <PlatformCard
      platform="Codeforces"
      short="CF"
      accent="cyan"
      handle={handle}
      url={`https://codeforces.com/profile/${handle}`}
      live={data ? { updatedAt, error } : null}
    >
      {loading && !data ? (
        <StatGridSkeleton count={4} />
      ) : !data ? (
        <p className="mt-6 text-sm text-zinc-500">Live stats are unavailable right now — see the full profile on Codeforces.</p>
      ) : (
        <StatGrid
          accent="cyan"
          columns="sm:grid-cols-2"
          stats={[
            { label: "Rating", value: data.rating },
            { label: "Max rating", value: data.maxRating },
            { label: "Rank", value: titleCase(data.rank), className: `text-lg ${codeforcesRankColor(data.rank)}` },
            { label: "Max rank", value: titleCase(data.maxRank), className: `text-lg ${codeforcesRankColor(data.maxRank)}` },
          ]}
        />
      )}
    </PlatformCard>
  );
}
