import { motion } from "framer-motion";
import { skillGroups } from "../../data/portfolioData";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { ACCENTS, fadeUp, stagger, viewportOnce } from "../ui/motion";

const ALL_SKILLS = [
  ...new Map(
    skillGroups.flatMap((g) => g.items.map((item) => [item, g.accent]))
  ).entries(),
];

function MarqueeRow({ items, reverse = false }) {
  // Content is rendered twice so the -50% translate loops seamlessly.
  return (
    <div className="fade-mask-x group flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 gap-3 pr-3 ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } group-hover:[animation-play-state:paused]`}
        >
          {items.map(([skill, accent], i) => (
            <li
              key={`${skill}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/8 bg-white/3 px-4 py-2 font-mono text-[13px] text-zinc-300"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${ACCENTS[accent].dot}`} />
              {skill}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function Skills() {
  const half = Math.ceil(ALL_SKILLS.length / 2);

  return (
    <section id="skills" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Skills & Stack"
          title="Tech I know."
          description="The languages, frameworks and infrastructure I use to build full-stack, real-time and AI-powered products."
        />
      </div>

      <div className="mt-14 space-y-3">
        <MarqueeRow items={[...ALL_SKILLS.slice(0, half), ...ALL_SKILLS.slice(0, half)]} />
        <MarqueeRow items={[...ALL_SKILLS.slice(half), ...ALL_SKILLS.slice(half)]} reverse />
      </div>

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-14 grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const accent = ACCENTS[group.accent];
          const Icon = group.icon;
          return (
            <motion.li key={group.title} variants={fadeUp}>
              <SpotlightCard glow={accent.glow} className="h-full p-6">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accent.icon}`}>
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{group.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-md border border-white/8 bg-white/3 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/7 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
