import { ArrowUpRight, BookOpen } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { GitHubIcon } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import SpotlightCard from "../ui/SpotlightCard";
import { ACCENTS } from "../ui/motion";
import { timeAgo } from "../../utils/format";
import ProjectVisual from "./ProjectVisual";
import { StarsForks, StatusBadge } from "./RepoMeta";

const TECH_PREVIEW = 8;

export function ProjectLinks({ project, size = "md" }) {
  return (
    <>
      {project.live && (
        <Button href={project.live} size={size} aria-label={`${project.title} live demo`}>
          Live demo
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      )}
      {project.github && (
        <Button href={project.github} size={size} variant="secondary" aria-label={`${project.title} source code on GitHub`}>
          <GitHubIcon className="h-4 w-4" /> Code
        </Button>
      )}
    </>
  );
}

/** Large two-column card for a flagship project. `repo` is its live GitHub data, if loaded. */
export default function FeaturedProjectCard({ project, repo, reverse = false, onOpen }) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.cyan;
  const extraTech = project.tech.length - TECH_PREVIEW;

  return (
    <Reveal>
      <SpotlightCard glow={accent.glow} className="p-5 sm:p-7 lg:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={reverse ? "lg:order-2" : ""}>
            <ProjectVisual project={project} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={project.accent}>{project.category}</Badge>
              {repo && <StatusBadge repo={repo} />}
            </div>

            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.title}</h3>
            <p className={`mt-1 font-display text-lg font-medium ${accent.text}`}>{project.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{project.oneLiner}</p>

            <dl className="mt-6 grid grid-cols-3 gap-2.5">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/6 bg-white/2 px-3 py-3">
                  <dd className="font-display text-xl font-bold text-white sm:text-2xl">{m.value}</dd>
                  <dt className="mt-0.5 text-[11px] leading-tight text-zinc-500">{m.label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.tech.slice(0, TECH_PREVIEW).map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
              {extraTech > 0 && (
                <li>
                  <Badge className="text-zinc-500">+{extraTech} more</Badge>
                </li>
              )}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ProjectLinks project={project} />
              <Button variant="ghost" onClick={() => onOpen(project)} aria-label={`Read the ${project.title} case study`}>
                <BookOpen size={15} /> Case study
              </Button>
            </div>

            {repo && (
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-500">
                <StarsForks repo={repo} />
                <span>updated {timeAgo(repo.pushedAt)}</span>
              </p>
            )}
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}
