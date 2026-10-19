import { Archive, CheckCircle2, GitFork, Star } from "lucide-react";
import { LANGUAGE_COLORS, repoStatus } from "../../services/github";

const STATUS = {
  "in-progress": {
    label: "In Progress",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    dot: true,
  },
  completed: {
    label: "Completed",
    className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    icon: CheckCircle2,
  },
  archived: {
    label: "Archived",
    className: "border-white/10 bg-white/4 text-zinc-400",
    icon: Archive,
  },
};

export function StatusBadge({ repo }) {
  const s = STATUS[repoStatus(repo)];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${s.className}`}>
      {s.dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
        </span>
      )}
      {Icon && <Icon size={11} />}
      {s.label}
    </span>
  );
}

export function LanguageDot({ language }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANGUAGE_COLORS[language] ?? "#8b949e" }} />
      {language}
    </span>
  );
}

export function StarsForks({ repo }) {
  return (
    <>
      <span className="inline-flex items-center gap-1" title="Stars">
        <Star size={12} /> {repo.stars}
      </span>
      <span className="inline-flex items-center gap-1" title="Forks">
        <GitFork size={12} /> {repo.forks}
      </span>
    </>
  );
}
