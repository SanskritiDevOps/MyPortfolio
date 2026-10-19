import { ACCENTS } from "../ui/motion";

/** Cover for a featured project: a screenshot in a browser frame, or a terminal-style code card. */
export default function ProjectVisual({ project, compact = false }) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.cyan;
  const host = project.live ? new URL(project.live).host : `github.com/${project.github?.split("github.com/")[1] ?? ""}`;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-950/80 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/6 bg-white/2 px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="truncate rounded-md bg-white/4 px-2.5 py-0.5 font-mono text-[10.5px] text-zinc-500">{host}</span>
      </div>

      {project.image ? (
        <div className={`overflow-hidden ${compact ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
          />
        </div>
      ) : (
        <div className={`relative overflow-hidden ${compact ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
          <div aria-hidden className={`absolute inset-0 bg-linear-to-br ${accent.gradient}`} />
          <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
          <pre className="relative h-full overflow-hidden p-5 font-mono text-[11.5px] leading-6 sm:text-[12.5px]">
            {project.snippet?.map(([prefix, line], i) => (
              <div key={i} className="whitespace-pre">
                <span className={prefix.startsWith("←") ? "text-emerald-300" : accent.text}>{prefix}</span>
                <span className={prefix.startsWith("←") ? "text-zinc-400" : "text-zinc-200"}>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
