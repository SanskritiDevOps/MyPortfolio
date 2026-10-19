/** Shimmering placeholder block shown while live data loads. */
export default function Skeleton({ className = "" }) {
  return (
    <span
      aria-hidden
      className={`relative block overflow-hidden rounded-md bg-white/6 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-linear-to-r before:from-transparent before:via-white/8 before:to-transparent ${className}`}
    />
  );
}
