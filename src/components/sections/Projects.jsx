import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Maximize2 } from "lucide-react";
import { projects } from "../../data/portfolioData";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { GitHubIcon } from "../ui/Icons";
import Modal from "../ui/Modal";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { ACCENTS, EASE } from "../ui/motion";

const ALL = "All";

function ProjectVisual({ project, tall = false }) {
  const accent = ACCENTS[project.accent];
  const initials = project.title
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`relative overflow-hidden border-b border-white/6 ${tall ? "h-56 sm:h-64" : "h-44"}`}>
      {project.image ? (
        <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
      ) : (
        <>
          <div className={`absolute inset-0 bg-linear-to-br ${accent.gradient}`} />
          <div className="bg-grid absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div
            aria-hidden
            className={`absolute inset-0 flex items-center justify-center font-display text-7xl font-bold tracking-tighter ${accent.text} opacity-25 transition-all duration-700 group-hover/card:scale-110 group-hover/card:opacity-40`}
          >
            {initials}
          </div>
        </>
      )}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Badge tone={project.accent}>{project.category}</Badge>
      </div>
      <span className="absolute right-4 top-4 font-mono text-[11px] text-zinc-400">{project.year}</span>
    </div>
  );
}

function ProjectLinks({ project, size = "sm" }) {
  return (
    <>
      {project.github && (
        <Button href={project.github} size={size} variant="secondary" aria-label={`${project.title} source code on GitHub`}>
          <GitHubIcon className="h-4 w-4" /> Code
        </Button>
      )}
      {project.live && (
        <Button href={project.live} size={size} aria-label={`${project.title} live demo`}>
          Live
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      )}
    </>
  );
}

function ProjectCard({ project, onOpen }) {
  const accent = ACCENTS[project.accent];

  return (
    <SpotlightCard glow={accent.glow} className="flex h-full flex-col">
      <ProjectVisual project={project} tall={project.featured} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Open details for ${project.title}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-all hover:border-white/25 hover:text-white"
          >
            <Maximize2 size={14} />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.desc}</p>

        <ul className={`mt-5 grid gap-2 ${project.featured ? "sm:grid-cols-3" : ""}`}>
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[13px] text-zinc-300">
              <Check size={14} className={accent.text} />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>

          {(project.github || project.live) && (
            <div className="mt-5 flex gap-2 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 md:group-focus-within/card:translate-y-0 md:group-focus-within/card:opacity-100">
              <ProjectLinks project={project} />
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

function ProjectDetails({ project }) {
  const accent = ACCENTS[project.accent];
  return (
    <>
      <ProjectVisual project={project} tall />
      <div className="p-6 sm:p-8">
        <h3 id="project-dialog-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-zinc-400">{project.longDesc || project.desc}</p>

        <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Highlights</h4>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/2 px-3.5 py-2.5 text-sm text-zinc-200">
              <Check size={15} className={accent.text} />
              {h}
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

        {(project.github || project.live) && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/6 pt-6">
            <ProjectLinks project={project} size="md" />
          </div>
        )}
      </div>
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState(ALL);
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const categories = useMemo(() => [ALL, ...new Set(projects.map((p) => p.category))], []);
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Selected Work"
            title="Things I've built."
            description="A selection of projects — from polished interfaces to the systems behind them."
          />

          <Reveal delay={0.1}>
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-1 rounded-2xl border border-white/6 bg-white/2 p-1">
              {categories.map((cat) => {
                const isActive = filter === cat;
                const count = cat === ALL ? projects.length : projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-pressed={isActive}
                    className={`relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      isActive ? "text-ink-950" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-xl bg-cyan-400 shadow-[0_0_20px_-4px_rgba(34,211,238,0.7)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">
                      {cat}
                      <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "text-ink-950/60" : "text-zinc-600"}`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                className={project.featured && filter === ALL ? "sm:col-span-2" : ""}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Modal open={Boolean(selected)} onClose={closeModal} labelledBy="project-dialog-title">
        {selected && <ProjectDetails project={selected} />}
      </Modal>
    </section>
  );
}
