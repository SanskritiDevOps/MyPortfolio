import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  ExternalLink,
  Menu,
  X,
  Download,
  Code2,
  Terminal,
  Wrench,
  Trophy,
  Award,
  Star,
  Sparkles,
  UserRound,
} from "lucide-react";

const GitHubIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "FrameWork & Libraries",
    icon: Code2,
    items: ["React.js", "Tailwind CSS"],
  },
  {
    title: "Languages",
    icon: Terminal,
    items: ["Java","JavaScript", "HTML","CSS" ,"SQL"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    items: ["Git & GitHub", "Figma", "Vercel"],
  },
];

const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "Winner — National Frontend Hackathon",
    desc: "Led a 3-person team building an accessibility-first dashboard, placing 1st out of 80 teams.",
    icon: Trophy,
  },
  {
    year: "2024",
    title: "Meta Front-End Developer Certificate",
    desc: "Completed the professional certification covering React, UX principles, and version control.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Top 5% — Global Coding Contest Rating",
    desc: "Ranked in the top 5% of competitive programmers on a leading coding platform.",
    icon: Star,
  },
  {
    year: "2023",
    title: "Freelance Milestone — 10+ Shipped Projects",
    desc: "Delivered production-ready web apps for startups across e-commerce, fintech, and health-tech.",
    icon: Sparkles,
  },
];

const PROJECTS = [
  {
    title: "TaskFlow",
    desc: "A Kanban-style task manager with drag-and-drop boards, real-time sync, and team workspaces.",
    tech: ["React", "Zustand", "Tailwind CSS", "Firebase"],
    github: "#",
    live: "#",
  },
];

const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: "GitHub", href: "#", accent: "dark" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "#", accent: "cyan" },
];

/* ----------------------------------------------------------------
   HOOKS & SHARED PRIMITIVES
---------------------------------------------------------------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={
        "transition-all duration-700 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="fd-mono text-xs tracking-widest uppercase text-cyan-400 mb-3">
      {children}
    </p>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

function SocialIcons({ size = "md" }) {
  const isLg = size === "lg";
  const dims = isLg ? "h-12 w-12" : "h-10 w-10";
  const iconClasses = isLg ? "w-6 h-6" : "w-5 h-5";

  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ icon: Icon, label, href, accent }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={
            `flex items-center justify-center ${dims} rounded-xl border transition-all duration-200 hover:-translate-y-1 ` +
            (accent === "cyan"
              ? "bg-cyan-950 border-cyan-700 text-cyan-300 hover:bg-cyan-400 hover:text-black"
              : "bg-zinc-800 border-zinc-700 text-white hover:bg-white hover:text-black")
          }
        >
          <Icon className={iconClasses} />
        </a>
      ))}
    </div>
  );
}
function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-zinc-800">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToId("home")}
          className="fd-display text-lg font-bold text-white tracking-tight"
        >
          riya<span className="text-cyan-400">.</span>dev
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToId(link.id)}
                className={
                  "text-sm font-medium transition-colors " +
                  (active === link.id
                    ? "text-cyan-400"
                    : "text-zinc-400 hover:text-zinc-100")
                }
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs fd-mono text-emerald-400">
            <StatusDot />
            Open to work
          </span>
          <button className="inline-flex items-center gap-2 rounded-full bg-cyan-400 text-black text-sm font-semibold px-4 py-2 hover:bg-cyan-300 transition-colors">
            <Download size={15} strokeWidth={2.5} />
            Resume
          </button>
        </div>

        <button
          className="md:hidden text-zinc-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-black px-5 pb-5 pt-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    scrollToId(link.id);
                    setOpen(false);
                  }}
                  className={
                    "block w-full text-left py-2.5 text-sm font-medium " +
                    (active === link.id ? "text-cyan-400" : "text-zinc-300")
                  }
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 text-black text-sm font-semibold px-4 py-2.5">
            <Download size={15} strokeWidth={2.5} />
            Download Resume
          </button>
        </div>
      )}
    </header>
  );
}

/* ----------------------------------------------------------------
   HERO
---------------------------------------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative px-5 sm:px-8 pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-cyan-500 opacity-10 blur-3xl fd-blob-anim" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-emerald-500 opacity-10 blur-3xl fd-blob-anim-rev" />
      </div>

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="grid md:grid-cols-2 items-stretch rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* left — content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <Eyebrow>Hi, there!</Eyebrow>
              <h1 className="fd-display text-4xl sm:text-4xl font-bold text-white leading-tight">
                I'm <span className="text-cyan-400">Sanskriti Singh</span>
              </h1>
              <p className="mt-2 flex items-center text-lg sm:text-xl font-semibold text-yellow-400">
                Software Developer
                <span className="ml-1 inline-block w-0.5 h-6 bg-cyan-400 animate-pulse" />
              </p>

              <p className="mt-5 text-zinc-400 text-base leading-relaxed max-w-md">
              Turning creativity into code to build products that scale, perform and make an impact. 
              </p>

              <div className="mt-6">
                <SocialIcons />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToId("contact")}
                  className="rounded-full bg-cyan-400 text-black font-semibold px-6 py-3 text-sm hover:bg-cyan-300 transition-colors"
                >
                  Hire Me
                </button>
                <button className="rounded-full border border-zinc-700 text-zinc-200 font-semibold px-6 py-3 text-sm hover:border-cyan-400 hover:text-cyan-300 transition-colors">
                  Download CV
                </button>
              </div>
            </div>

            {/* right — full-bleed photo panel */}
            <div className="relative h-72 sm:h-96 md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
              <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-emerald-500 opacity-20 blur-3xl" />
              <div className="absolute inset-0 flex items-end justify-center">
              <img 
                    src="/Portfoliophoto.png" // Apni photo ka path yahan dalein (e.g., public folder me se)
                   alt="My Profile"
                    className="w-full h-full object-contain object-bottom" 
                      />
              </div>
              <div className="absolute inset-y-0 left-0 w-20 md:w-28 bg-gradient-to-r from-zinc-900 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black border border-zinc-700 px-3 py-1.5">
                <StatusDot />
                <span className="text-xs fd-mono text-zinc-300 whitespace-nowrap">
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   SKILLS
---------------------------------------------------------------- */

function SkillCard({ group, delay }) {
  const Icon = group.icon;
  return (
    <Reveal delay={delay} className="h-full">
      <div className="fd-card-hover h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-cyan-800 transition-colors duration-300">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-cyan-800 bg-cyan-950 text-cyan-400">
          <Icon size={19} />
        </div>
        <h3 className="mt-4 fd-display text-lg font-semibold text-white">
          {group.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="fd-mono text-xs px-2.5 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 px-5 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>What I work with</Eyebrow>
          <h2 className="fd-display text-3xl sm:text-4xl font-bold text-white">
            Skills &amp; Stack
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Tools and technologies I reach for when turning a design or idea
            into a working product.
          </p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.title} group={group} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   ACHIEVEMENTS
---------------------------------------------------------------- */

function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="scroll-mt-20 px-5 sm:px-8 py-24 border-t border-zinc-800"
    >
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <Eyebrow>Milestones</Eyebrow>
          <h2 className="fd-display text-3xl sm:text-4xl font-bold text-white">
            Achievements
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            A few moments along the way that I'm proud of.
          </p>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-zinc-800" />
          <ul className="space-y-10">
            {ACHIEVEMENTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <li className="relative pl-14">
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-cyan-800 text-cyan-400">
                      <Icon size={17} />
                    </span>
                    <p className="fd-mono text-xs text-cyan-400">{item.year}</p>
                    <h3 className="mt-1 text-white font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-zinc-400 text-sm leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   PROJECTS
---------------------------------------------------------------- */

function ProjectCard({ project, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="fd-card-hover group h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-800">
        <div className="flex items-start justify-between gap-3">
          <h3 className="fd-display text-lg font-semibold text-white">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={project.github}
              aria-label={project.title + " GitHub repository"}
              className="text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              <GitHubIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href={project.live}
              aria-label={project.title + " live site"}
              className="text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed flex-1">
          {project.desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="fd-mono text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 px-5 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="fd-display text-3xl sm:text-4xl font-bold text-white">
            Projects
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            A handful of things I've built recently, end to end.
          </p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={(i % 3) * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   CONTACT / FOOTER
---------------------------------------------------------------- */

function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 px-5 sm:px-8 py-24 border-t border-zinc-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="fd-display text-3xl sm:text-4xl font-bold text-white">
            Let's connect!
          </h2>
          <p className="mt-4 text-zinc-400 max-w-md mx-auto">
            Have a project in mind or just want to talk shop? My inbox is
            always open.
          </p>
          <a
            href="mailto:hello@riyasharma.dev"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 text-black font-semibold px-7 py-3.5 text-sm hover:bg-cyan-300 transition-colors"
          >
            <Mail size={16} strokeWidth={2.5} />
            hello@riyasharma.dev
          </a>
          <div className="mt-10 flex items-center justify-center">
            <SocialIcons size="lg" />
          </div>
        </Reveal>
      </div>
      <p className="mt-20 text-center text-xs text-zinc-600 fd-mono">
        © {new Date().getFullYear()} Riya Sharma. Built with React &amp; Tailwind CSS.
      </p>
    </section>
  );
}

/* ----------------------------------------------------------------
   APP
---------------------------------------------------------------- */

export default function Portfolio() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fd-body bg-black min-h-screen antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
        .fd-body { font-family: 'Inter', ui-sans-serif, sans-serif; }
        .fd-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        @keyframes fd-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -24px) scale(1.06); }
        }
        .fd-blob-anim { animation: fd-float 12s ease-in-out infinite; }
        .fd-blob-anim-rev { animation: fd-float 16s ease-in-out infinite reverse; }

        .fd-card-hover:hover {
          box-shadow: 0 25px 60px -25px rgba(34, 211, 238, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .fd-blob-anim, .fd-blob-anim-rev {
            animation: none !important;
          }
        }
      `}</style>

      <Navbar active={active} />
      <main>
        <Hero />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}