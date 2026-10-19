import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { journey, journeyGroups, journeyIcons } from "../../data/portfolioData";
import Badge from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { fadeUp, stagger, viewportOnce } from "../ui/motion";

function JourneyItem({ item }) {
  const Icon = journeyIcons[item.type];
  return (
    <motion.li variants={fadeUp} className="relative pl-16">
      <span className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-ink-900 text-cyan-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]">
        {Icon && <Icon size={17} />}
      </span>
      <SpotlightCard className="p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h4 className="font-display text-lg font-semibold text-white">{item.title}</h4>
          <span className="shrink-0 font-mono text-xs text-cyan-300/80">{item.period}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-sm text-zinc-500">{item.org}</p>
          {item.grade && (
            <Badge tone="emerald">
              <Award size={11} /> {item.grade}
            </Badge>
          )}
        </div>
        {item.desc && <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.desc}</p>}
        {item.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        )}
      </SpotlightCard>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="journey" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="05"
          eyebrow="Journey"
          title="Experience & education."
          description="Where I've been leading, learning and building along the way."
        />

        {journeyGroups.map(({ type, label }) => {
          const items = journey.filter((item) => item.type === type);
          if (!items.length) return null;
          const Icon = journeyIcons[type];
          return (
            <div key={type} className="mt-14">
              <h3 className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                <Icon size={15} className="text-cyan-300" />
                {label}
                <span className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
              </h3>

              <div className="relative">
                {/* timeline rail */}
                <div aria-hidden className="absolute bottom-0 left-[19px] top-2 w-px bg-linear-to-b from-cyan-400/60 via-violet-400/30 to-transparent" />
                <motion.ol
                  variants={stagger(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="space-y-6"
                >
                  {items.map((item) => (
                    <JourneyItem key={item.title + item.period} item={item} />
                  ))}
                </motion.ol>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
