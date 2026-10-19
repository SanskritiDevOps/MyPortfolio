import { motion } from "framer-motion";
import { journey, journeyIcons } from "../../data/portfolioData";
import Badge from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { fadeUp, stagger, viewportOnce } from "../ui/motion";

export default function Experience() {
  return (
    <section id="journey" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="05"
          eyebrow="Journey"
          title="Education & experience."
          description="Where I've been learning and building along the way."
        />

        <div className="relative mt-14">
          {/* timeline rail */}
          <div aria-hidden className="absolute bottom-0 left-[19px] top-2 w-px bg-linear-to-b from-cyan-400/60 via-violet-400/30 to-transparent" />

          <motion.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-8"
          >
            {journey.map((item) => {
              const Icon = journeyIcons[item.type];
              return (
                <motion.li key={item.title + item.period} variants={fadeUp} className="relative pl-16">
                  <span className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-ink-900 text-cyan-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]">
                    {Icon && <Icon size={17} />}
                  </span>
                  <SpotlightCard className="p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                      <span className="font-mono text-xs text-cyan-300/80">{item.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500">{item.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
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
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
