export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewportOnce = { once: true, margin: "-80px" };

/** Tailwind class maps for the three accent colours. Kept literal so Tailwind can see them. */
export const ACCENTS = {
  cyan: {
    text: "text-cyan-300",
    icon: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
    glow: "34 211 238",
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
    dot: "bg-cyan-400",
  },
  violet: {
    text: "text-violet-300",
    icon: "border-violet-400/25 bg-violet-400/10 text-violet-300",
    glow: "167 139 250",
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-400",
  },
  amber: {
    text: "text-amber-300",
    icon: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    glow: "251 191 36",
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
    dot: "bg-amber-400",
  },
  emerald: {
    text: "text-emerald-300",
    icon: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    glow: "52 211 153",
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    dot: "bg-emerald-400",
  },
};
