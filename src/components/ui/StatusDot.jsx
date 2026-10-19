export default function StatusDot({ className = "" }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
    </span>
  );
}
