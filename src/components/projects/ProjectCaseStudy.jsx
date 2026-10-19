import { Check } from "lucide-react";
import Badge from "../ui/Badge";
import { ACCENTS } from "../ui/motion";
import { ProjectLinks } from "./FeaturedProjectCard";
import ProjectVisual from "./ProjectVisual";

/** Full write-up shown inside the project modal. */
export default function ProjectCaseStudy({ project }) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.cyan;

  return (
    <div className="p-5 sm:p-8">
      <div className="pr-10">
        <Badge tone={project.accent}>{project.category}</Badge>
        <h3 id="project-dialog-title" className="mt-4 font-display text-3xl font-bold text-white">
          {project.title}
        </h3>
        <p className={`mt-1 font-display text-lg font-medium ${accent.text}`}>{project.tagline}</p>
      </div>

      <div className="mt-6">
        <ProjectVisual project={project} compact />
      </div>

      <p className="mt-6 leading-relaxed text-zinc-300">{project.description}</p>

      <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">What it does</h4>
      <ul className="mt-3 space-y-2.5">
        {project.features.map((f) => (
          <li key={f.title} className="flex gap-3 rounded-xl border border-white/6 bg-white/2 p-4">
            <Check size={16} className={`mt-0.5 shrink-0 ${accent.text}`} />
            <div>
              <p className="text-sm font-semibold text-white">{f.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Built with</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t}>
            <Badge tone={project.accent}>{t}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-white/6 pt-6">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}
