import { useRef } from "react";

/**
 * Glass card with a cursor-following spotlight and a glowing border on hover.
 * `glow` is an "R G B" triple (see ACCENTS in motion.js).
 */
export default function SpotlightCard({ children, className = "", glow = "34 211 238", ...props }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{ "--glow": glow }}
      className={
        "group/card relative overflow-hidden rounded-2xl border border-white/7 bg-ink-900/70 backdrop-blur-sm " +
        "transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-white/15 " +
        "hover:shadow-[0_30px_60px_-30px_rgb(var(--glow)/0.35)] " +
        className
      }
      {...props}
    >
      {/* fill spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(var(--glow) / 0.10), transparent 45%)",
        }}
      />
      {/* border spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgb(var(--glow) / 0.6), transparent 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
