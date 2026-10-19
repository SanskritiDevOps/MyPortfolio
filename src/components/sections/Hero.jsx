import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { profile } from "../../data/portfolioData";
import Button from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import SocialLinks from "../ui/SocialLinks";
import StatusDot from "../ui/StatusDot";
import { EASE, fadeUp, stagger } from "../ui/motion";

/** Types `text` out once with a blinking bar cursor. Space is reserved up front so nothing reflows. */
function TypedName({ text }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 700 : 85);
    return () => clearTimeout(id);
  }, [count, text, reduce]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span className="inline-grid align-bottom">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1 pr-4">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        <span className="text-gradient">{shown}</span>
        <span className="ml-1.5 inline-block h-[0.9em] w-[0.11em] translate-y-[0.1em] animate-blink rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
      </span>
    </span>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="font-semibold text-zinc-100"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const FLOATING_CHIPS = [
  { label: profile.heroChips[0], className: "left-0 top-[22%] text-cyan-200 border-cyan-400/30", delay: 0 },
  { label: profile.heroChips[1], className: "right-0 top-[38%] text-violet-200 border-violet-400/30", delay: 1.2 },
  { label: profile.heroChips[2], className: "left-[6%] top-[58%] text-emerald-200 border-emerald-400/30", delay: 0.6 },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden px-5 pt-28 sm:px-8 lg:pt-20">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* copy */}
        <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10 pt-6 lg:pb-16 lg:pt-0">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/7 py-1.5 pl-3 pr-4 text-xs font-medium text-emerald-200 shadow-[0_0_30px_-10px_rgba(52,211,153,0.6)] backdrop-blur">
              <StatusDot />
              {profile.status}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-display text-xl font-semibold text-white sm:text-2xl">
            {profile.greeting}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-2 font-display text-[2.7rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            I'm <TypedName text={profile.name} />
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400 sm:text-xl">
            <RotatingRole />
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7">
            <SocialLinks />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#contact" size="lg">
                Hire Me
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={profile.resumeUrl} size="lg" variant="secondary" download>
                <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* portrait — anchored to the bottom of the hero and faded into the page */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="relative mx-auto h-[480px] w-full max-w-md self-end sm:h-[580px] lg:h-[min(calc(100svh-6rem),760px)] lg:max-w-none"
        >
          {/* glow + ring behind the photo */}
          <div aria-hidden className="absolute left-1/2 top-[14%] aspect-square w-[78%] -translate-x-1/2 rounded-full bg-linear-to-br from-cyan-500/35 via-violet-500/25 to-emerald-500/20 blur-3xl" />
          <div aria-hidden className="absolute left-1/2 top-[10%] aspect-square w-[72%] -translate-x-1/2 rounded-full border border-white/10" />
          <div aria-hidden className="absolute left-1/2 top-[4%] aspect-square w-[86%] -translate-x-1/2 rounded-full border border-dashed border-white/6" />

          {/* wider than the column so the portrait's sides are never clipped; bottom fades into the page */}
          <div className="absolute inset-y-0 -inset-x-[25%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
            {/* head-to-waist portrait, shown uncropped; width/height set the aspect ratio before it loads.
                The left fade softens where the original photo's hair was cropped straight. */}
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={profile.photoSize.width}
              height={profile.photoSize.height}
              fetchPriority="high"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none [mask-image:linear-gradient(to_right,transparent,black_9%)]"
              draggable="false"
            />
          </div>

          {FLOATING_CHIPS.map((chip) => (
            <motion.span
              key={chip.label}
              aria-hidden
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
              className={`absolute hidden rounded-full border bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] shadow-xl backdrop-blur-md sm:block ${chip.className}`}
            >
              {chip.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-zinc-200 lg:flex"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </a>
    </section>
  );
}
