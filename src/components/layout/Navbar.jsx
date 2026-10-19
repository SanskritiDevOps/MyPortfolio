import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "../../data/portfolioData";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";

export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2 font-display text-[17px] font-bold tracking-tight text-white">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-linear-to-br from-cyan-400/20 to-violet-500/20 font-mono text-sm text-cyan-200 transition-transform duration-300 group-hover:rotate-[-8deg]">
        {profile.name.charAt(0)}
      </span>
      <span>
        {profile.shortName}
        <span className="text-cyan-400">.</span>dev
      </span>
    </a>
  );
}

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-3 transition-all duration-500 sm:px-4 ${
          scrolled || open
            ? "border-white/10 bg-ink-950/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-0.5 rounded-full border border-white/6 bg-white/2 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button href={profile.resumeUrl} size="sm" variant="secondary" download>
            <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
            Resume
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-200 hover:bg-white/5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <MobileNav open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  );
}
