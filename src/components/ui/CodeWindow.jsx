import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile, skillGroups } from "../../data/portfolioData";

// Token colours
const K = "text-violet-400"; // keyword
const V = "text-cyan-300"; // variable
const P = "text-sky-300"; // property
const S = "text-emerald-300"; // string
const L = "text-amber-300"; // literal
const F = "text-yellow-200"; // function
const D = "text-zinc-500"; // punctuation

const str = (s) => [`'${s}'`, S];

function list(items) {
  return items.flatMap((item, i) => (i === 0 ? [str(item)] : [[", ", D], str(item)]));
}

const FILES = {
  "developer.js": [
    [["const ", K], ["developer", V], [" = {", D]],
    [["  name", P], [": ", D], str(profile.name), [",", D]],
    [["  role", P], [": ", D], str(profile.role), [",", D]],
    [["  stack", P], [": [", D], ...list(profile.codeStack), ["],", D]],
    [["  focus", P], [": ", D], str(profile.focus), [",", D]],
    [["  available", P], [": ", D], ["true", L], [",", D]],
    [["};", D]],
    [],
    [["developer", V], [".", D], ["build", F], ["(", D], str("something great"), [");", D]],
  ],
  "skills.json": [
    [["{", D]],
    ...skillGroups.slice(0, 3).map((g, i, arr) => [
      [`  "${g.title.toLowerCase().split(" ")[0]}"`, P],
      [": [", D],
      ...g.items.slice(0, 2).flatMap((s, j) => (j === 0 ? [[`"${s}"`, S]] : [[", ", D], [`"${s}"`, S]])),
      [i === arr.length - 1 ? "]" : "],", D],
    ]),
    [["  \"learning\"", P], [": ", D], ["true", L]],
    [["}", D]],
  ],
};

/** A faux editor window that tilts toward the cursor. */
export default function CodeWindow() {
  const [file, setFile] = useState("developer.js");
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${glareX} ${glareY}, rgba(255,255,255,0.07), transparent 45%)`;

  function handleMove(e) {
    if (reduce || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  const lines = FILES[file];

  return (
    <div className="perspective-[1200px]" onPointerMove={handleMove} onPointerLeave={reset}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/10 bg-ink-900/80 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: glare }} />

        {/* title bar */}
        <div className="flex items-center gap-4 border-b border-white/6 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/90" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/90" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/90" />
          </div>
          <div role="tablist" aria-label="Code files" className="flex gap-1">
            {Object.keys(FILES).map((name) => {
              const selected = name === file;
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFile(name)}
                  className={`relative rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    selected ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="code-tab"
                      className="absolute inset-0 rounded-md bg-white/7 ring-1 ring-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative">{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* code */}
        <div className="relative min-h-[260px] overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={file}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <code>
                {lines.map((tokens, i) => (
                  <div key={i} className="flex">
                    <span className="mr-5 w-4 shrink-0 select-none text-right text-zinc-700">{i + 1}</span>
                    <span>
                      {tokens.map(([text, color], j) => (
                        <span key={j} className={color}>
                          {text}
                        </span>
                      ))}
                      {i === lines.length - 1 && (
                        <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-blink bg-cyan-300" />
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between rounded-b-2xl border-t border-white/6 px-4 py-2 font-mono text-[10.5px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> main
          </span>
          <span>{file.endsWith(".js") ? "JavaScript" : "JSON"} · UTF-8</span>
        </div>
      </motion.div>
    </div>
  );
}
