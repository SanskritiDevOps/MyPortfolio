/** Fixed, decorative backdrop: mesh-gradient orbs, a faded grid and film grain. */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute -left-40 -top-40 h-136 w-136 rounded-full bg-cyan-500/11 blur-[120px]" />
      <div className="absolute -right-40 top-[20%] h-120 w-120 rounded-full bg-violet-600/12 blur-[120px]" />
      <div className="absolute -bottom-40 left-[30%] h-112 w-112 rounded-full bg-emerald-500/7 blur-[120px]" />
      <div className="bg-grid fade-mask-radial absolute inset-0" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
