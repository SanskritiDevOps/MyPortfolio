import { profileConfig } from "../../config/profileConfig";
import { STAR_COLORS } from "../../services/codechef";
import { PlatformCard, StatGrid, StatGridSkeleton } from "./PlatformCard";

const { handle, fallback } = profileConfig.codechef;

/** `state` comes from useLiveData in the parent section (shared with the headline counter). */
export default function CodeChefCard({ state }) {
  const { data: live, loading, error, updatedAt } = state;
  const usingFallback = !live && !loading;
  // merge so any field the scraper couldn't read still has a value
  const data = live ? { ...fallback, ...Object.fromEntries(Object.entries(live).filter(([, v]) => v !== null)) } : usingFallback ? fallback : null;
  const starColor = data?.stars ? STAR_COLORS[data.stars - 1] : undefined;

  return (
    <PlatformCard
      platform="CodeChef"
      short="CC"
      accent="violet"
      handle={handle}
      url={`https://www.codechef.com/users/${handle}`}
      live={data ? { updatedAt, error, fallback: usingFallback } : null}
    >
      {!data ? (
        <StatGridSkeleton count={4} />
      ) : (
        <>
          <StatGrid
            accent="violet"
            stats={[
              { label: "Rating", value: data.rating, sub: data.division ? `Div ${data.division}` : null },
              { label: "Stars", value: data.stars ? `${data.stars}★` : null, style: { color: starColor } },
              { label: "Solved", value: data.solved },
              { label: "Contests", value: data.contests, className: "text-zinc-100" },
            ]}
          />
          {data.highestRating > data.rating && (
            <p className="mt-3 font-mono text-[11px] text-zinc-500">Highest rating: {data.highestRating}</p>
          )}
        </>
      )}
    </PlatformCard>
  );
}
