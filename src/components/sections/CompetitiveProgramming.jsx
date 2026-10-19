import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Trophy } from "lucide-react";
import { competitiveProgramming as cp } from "../../data/portfolioData";
import Button from "../ui/Button";
import CountUp from "../ui/CountUp";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { ACCENTS, EASE, fadeUp, stagger, viewportOnce } from "../ui/motion";

const DIFFICULTY = [
  { key: "easy", label: "Easy", bar: "bg-emerald-400", text: "text-emerald-300" },
  { key: "medium", label: "Medium", bar: "bg-amber-400", text: "text-amber-300" },
  { key: "hard", label: "Hard", bar: "bg-rose-400", text: "text-rose-300" },
];

function DifficultyBar({ breakdown }) {
  const total = DIFFICULTY.reduce((sum, d) => sum + breakdown[d.key], 0);
  return (
    <div className="mt-6">
      <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
        {DIFFICULTY.map((d, i) => (
          <motion.span
            key={d.key}
            className={`h-full ${d.bar}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${(breakdown[d.key] / total) * 100}%` }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: EASE }}
          />
        ))}
      </div>
      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
        {DIFFICULTY.map((d) => (
          <div key={d.key} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${d.bar}`} />
            <dt className="text-zinc-500">{d.label}</dt>
            <dd className={d.text}>{breakdown[d.key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProfileCard({ profile }) {
  const accent = ACCENTS[profile.accent] ?? ACCENTS.cyan;
  const stats = profile.stats.filter((s) => s.value);
  const b = profile.breakdown;
  const hasBreakdown = b && DIFFICULTY.every((d) => typeof b[d.key] === "number");

  return (
    <SpotlightCard glow={accent.glow} className="p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-sm font-semibold ${accent.icon}`}>
            {profile.short}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{profile.platform}</h3>
            {profile.handle && <p className="font-mono text-xs text-zinc-500">@{profile.handle}</p>}
          </div>
        </div>
        {profile.url && (
          <Button href={profile.url} size="sm" variant="secondary" aria-label={`${profile.platform} profile`}>
            View profile
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        )}
      </div>

      {stats.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/6 bg-white/2 px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">{s.label}</dt>
              <dd className={`mt-1 font-display text-2xl font-bold ${accent.text}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {hasBreakdown && <DifficultyBar breakdown={b} />}
    </SpotlightCard>
  );
}

export default function CompetitiveProgramming() {
  return (
    <section id="coding" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Competitive Programming"
          title="Problem solving, every day."
          description="Data structures and algorithms practice that shapes how I approach real-world code."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* headline stat */}
          <Reveal className="h-full">
            <SpotlightCard className="relative flex h-full flex-col p-7 sm:p-9">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

              <div className="relative flex items-center gap-2 font-mono text-xs text-cyan-300">
                <Brain size={15} /> DSA
              </div>
              <p className="relative mt-6 font-display text-7xl font-bold leading-none tracking-tight sm:text-8xl">
                <CountUp to={cp.totalSolved} suffix="+" className="text-gradient" />
              </p>
              <p className="relative mt-3 font-display text-xl font-semibold text-white">DSA problems solved</p>
              <p className="relative mt-4 max-w-md text-sm leading-relaxed text-zinc-400">{cp.summary}</p>

              <motion.ul
                variants={stagger(0.04, 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative mt-auto flex flex-wrap gap-2 pt-8"
                aria-label="Topics practised"
              >
                {cp.topics.map((t) => (
                  <motion.li
                    key={t}
                    variants={fadeUp}
                    className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </SpotlightCard>
          </Reveal>

          {/* platform profiles */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-5"
          >
            {cp.profiles.map((profile) => (
              <motion.div key={profile.platform} variants={fadeUp}>
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
            {cp.note && (
              <motion.p variants={fadeUp} className="flex items-center gap-2 px-1 font-mono text-xs text-zinc-500">
                <Trophy size={13} className="text-amber-300" />
                {cp.note}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
