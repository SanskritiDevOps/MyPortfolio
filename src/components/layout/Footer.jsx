import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "../../data/portfolioData";
import Magnetic from "../ui/Magnetic";
import SocialLinks from "../ui/SocialLinks";
import { Logo } from "./Navbar";

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/6 px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">{profile.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm text-zinc-400 transition-colors hover:text-cyan-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <SocialLinks />
          <Magnetic strength={0.5}>
            <button
              type="button"
              onClick={backToTop}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/3 py-2 pl-4 pr-2 text-sm text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-white"
            >
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-ink-950 transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp size={14} strokeWidth={2.5} />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/6 pt-6 font-mono text-[11px] text-zinc-600 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with React, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
