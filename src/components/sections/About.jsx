import { motion } from "framer-motion";
import { about, profile } from "../../data/portfolioData";
import CodeWindow from "../ui/CodeWindow";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import StatusDot from "../ui/StatusDot";
import { fadeUp, stagger, viewportOnce } from "../ui/motion";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* interactive code card */}
        <Reveal className="relative mx-auto w-full max-w-lg">
          <div aria-hidden className="absolute -inset-8 -z-10 rounded-4xl bg-linear-to-tr from-cyan-500/20 via-violet-500/15 to-emerald-500/10 blur-3xl" />
          <CodeWindow />
          <div className="absolute -top-4 right-6 hidden items-center gap-2 rounded-full border border-white/10 bg-ink-900/85 px-3.5 py-2 font-mono text-[11px] text-zinc-300 shadow-xl backdrop-blur-md sm:flex">
            <StatusDot /> {profile.status}
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading index="01" eyebrow="About" title="Design-minded developer, detail-obsessed builder." />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {about.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {about.highlights.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fadeUp}>
                <SpotlightCard className="h-full p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                    <Icon size={17} />
                  </span>
                  <h3 className="mt-4 font-display text-[15px] font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{text}</p>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
