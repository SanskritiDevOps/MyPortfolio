import Reveal from "./Reveal";

export default function SectionHeading({ index, eyebrow, title, description, align = "left" }) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/90 ${
          centered ? "justify-center" : ""
        }`}
      >
        {index && <span className="text-zinc-500">{index}</span>}
        <span className="h-px w-8 bg-linear-to-r from-cyan-400/70 to-transparent" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
