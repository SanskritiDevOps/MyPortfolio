import { motion } from "framer-motion";
import { Brain, Trophy } from "lucide-react";
import { profileConfig } from "../../config/profileConfig";
import { competitiveProgramming as cp } from "../../data/portfolioData";
import useLiveData from "../../hooks/useLiveData";
import { fetchCodeChefStats } from "../../services/codechef";
import { fetchLeetCodeStats } from "../../services/leetcode";
import CodeChefCard from "../coding/CodeChefCard";
import CodeforcesCard from "../coding/CodeforcesCard";
import LeetCodeCard from "../coding/LeetCodeCard";
import CountUp from "../ui/CountUp";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { fadeUp, stagger, viewportOnce } from "../ui/motion";

const { leetcode, codeforces, codechef, dsa } = profileConfig;

export default function CompetitiveProgramming() {
  // Fetched here because both feed the headline counter as well as their own cards.
  const lc = useLiveData(`leetcode:${leetcode.username}`, fetchLeetCodeStats, {
    ttlMinutes: leetcode.cacheMinutes,
    enabled: Boolean(leetcode.username),
  });
  const cc = useLiveData(`codechef:${codechef.handle}`, fetchCodeChefStats, {
    ttlMinutes: codechef.cacheMinutes,
    enabled: Boolean(codechef.handle),
  });

  // Headline grows on its own: LeetCode + CodeChef solved, never below the configured floor.
  const lcSolved = leetcode.username ? ((lc.data ?? leetcode.fallback)?.solved?.all ?? 0) : 0;
  const ccSolved = codechef.handle ? ((cc.data?.solved ?? codechef.fallback?.solved) || 0) : 0;
  const headline = Math.floor(Math.max(dsa.totalSolved, lcSolved + ccSolved) / dsa.roundTo) * dsa.roundTo;

  const showLeetCode = Boolean(leetcode.username);
  const sideCards = [codeforces.handle && "codeforces", codechef.handle && "codechef"].filter(Boolean);
  const hasProfiles = showLeetCode || sideCards.length > 0;

  return (
    <section id="coding" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Competitive Programming"
          title="Problem solving, every day."
          description="Data structures and algorithms practice that shapes how I approach real-world code — stats below update live."
        />

        <div className={`mt-14 grid gap-5 ${hasProfiles ? "lg:grid-cols-[0.85fr_1.15fr]" : ""}`}>
          {/* headline stat */}
          <Reveal className="h-full">
            <SpotlightCard className="relative flex h-full flex-col p-7 sm:p-9">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

              <div className="relative flex items-center gap-2 font-mono text-xs text-cyan-300">
                <Brain size={15} /> DSA
              </div>
              <p className="relative mt-6 font-display text-7xl font-bold leading-none tracking-tight sm:text-8xl">
                <CountUp key={headline} to={headline} suffix="+" className="text-gradient" />
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
          {hasProfiles && (
            <motion.div
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-5"
            >
              {showLeetCode && (
                <motion.div variants={fadeUp}>
                  <LeetCodeCard state={lc} />
                </motion.div>
              )}
              {sideCards.length > 0 && (
                <div className={`grid gap-5 ${sideCards.length === 2 ? "md:grid-cols-2" : ""}`}>
                  {sideCards.includes("codeforces") && (
                    <motion.div variants={fadeUp}>
                      <CodeforcesCard />
                    </motion.div>
                  )}
                  {sideCards.includes("codechef") && (
                    <motion.div variants={fadeUp}>
                      <CodeChefCard state={cc} />
                    </motion.div>
                  )}
                </div>
              )}
              {cp.note && (
                <motion.p variants={fadeUp} className="flex items-center gap-2 px-1 font-mono text-xs text-zinc-500">
                  <Trophy size={13} className="text-amber-300" />
                  {cp.note}
                </motion.p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
