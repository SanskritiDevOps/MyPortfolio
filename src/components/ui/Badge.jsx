const TONES = {
  neutral: "border-white/10 bg-white/4 text-zinc-300",
  cyan: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200 shadow-[0_0_14px_-4px_rgba(34,211,238,0.5)]",
  violet:
    "border-violet-400/25 bg-violet-400/10 text-violet-200 shadow-[0_0_14px_-4px_rgba(167,139,250,0.5)]",
  emerald:
    "border-emerald-400/25 bg-emerald-400/10 text-emerald-200 shadow-[0_0_14px_-4px_rgba(52,211,153,0.5)]",
};

export default function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
