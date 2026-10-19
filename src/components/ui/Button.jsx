const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  primary:
    "bg-cyan-400 text-ink-950 shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_10px_30px_-8px_rgba(34,211,238,0.6)] " +
    "hover:bg-cyan-300 hover:shadow-[0_0_0_1px_rgba(103,232,249,0.7),0_14px_40px_-6px_rgba(34,211,238,0.75)]",
  secondary:
    "border border-white/10 bg-white/4 text-zinc-100 backdrop-blur-md " +
    "hover:border-cyan-400/40 hover:bg-white/7 hover:text-white",
  ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
  icon: "h-10 w-10",
};

/** Renders an <a> when given `href`, otherwise a <button>. */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
