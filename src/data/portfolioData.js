/* ================================================================
   PORTFOLIO CONTENT
   Everything the site displays lives here. Edit this file to update
   your portfolio. Lines marked TODO still hold placeholder content.
   Live-data usernames (GitHub, LeetCode, Codeforces…) live in
   src/config/profileConfig.js.
================================================================ */

import {
  Code2,
  Terminal,
  Server,
  Database,
  Cloud,
  FlaskConical,
  Puzzle,
  ShieldCheck,
  Shuffle,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export const profile = {
  name: "Sanskriti Singh",
  shortName: "Sanskriti",
  role: "Software Developer",
  // Rotates under the headline in the hero.
  roles: ["Software Developer", "Full-Stack Developer", "Real-time Systems Builder", "Competitive Programmer"],
  tagline:
    "Turning creativity into code to build products that scale, perform and make an impact.",
  status: "Available for internships & projects",
  email: "sanskritichandel2005@gmail.com",
  resumeUrl: "/resume.pdf", // TODO: put resume.pdf inside /public
  photo: "/sanskriti-portrait.webp", // transparent cutout, shown in the hero
  photoSize: { width: 864, height: 1126 }, // intrinsic size of the file above
  greeting: "Hi, There!",
  intro:
    "I’m a software developer who adapts to any stack and turns ideas into fast, responsive, scaled and thoughtfully designed products.",
  focus: "Think + Build + Optimize",
  heroChips: ["React", "Node.js", "PostgreSQL"], // floating tags around the hero photo
  codeStack: ["React", "Node.js", "Socket.IO"], // `stack` line in the About code window
};

export const about = {
  bio: [
    "I'm a software developer driven by problems worth solving. I dig into the challenge, design the approach, and build solutions that hold up in the real world.",
    "I build across the stack — React on the front end, Node.js, PostgreSQL and Redis behind it — and use Java and C++ for problem solving, adapting quickly to whatever a project needs. Clean code, sound logic and careful attention to detail are how I make sure what I build stays reliable.",
  ],
  highlights: [
    {
      icon: Puzzle,
      title: "Problem Solver",
      text: "Breaks complex challenges into clear, logical steps and finds the right fix.",
    },
    {
      icon: ShieldCheck,
      title: "Reliability-focused",
      text: "Clean, tested code that handles edge cases and holds up in production.",
    },
    {
      icon: Shuffle,
      title: "Stack-flexible",
      text: "Adapts quickly to new languages, frameworks and tools as projects demand.",
    },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "coding", label: "Coding" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const socialLinks = [
  { id: "github", label: "GitHub", href: "https://github.com/SanskritiDevOps" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sanskriti-singh-810389325/" },
];

/* "Tech I know" — `accent` ∈ cyan | violet | emerald. */
export const skillGroups = [
  {
    title: "Languages",
    icon: Terminal,
    accent: "violet",
    blurb: "The languages I think and build in.",
    items: ["JavaScript", "C++", "Java", "SQL"],
  },
  {
    title: "Frontend",
    icon: Code2,
    accent: "cyan",
    blurb: "Fast, responsive and accessible interfaces.",
    items: ["React", "Vite", "Tailwind CSS", "Context API", "Zustand", "TanStack Query"],
  },
  {
    title: "Backend & Realtime",
    icon: Server,
    accent: "emerald",
    blurb: "APIs and live, event-driven systems.",
    items: ["Node.js", "Express", "Socket.IO", "WebSockets", "Zod", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases & Caching",
    icon: Database,
    accent: "cyan",
    blurb: "Modelling, querying and caching data.",
    items: ["PostgreSQL", "Prisma ORM", "Redis"],
  },
  {
    title: "AI & Cloud / DevOps",
    icon: Cloud,
    accent: "violet",
    blurb: "Shipping, automating and integrating AI.",
    items: ["Google Gemini API", "Ollama", "Docker", "GitHub Actions", "Vercel", "Render", "Neon"],
  },
  {
    title: "Testing & Tools",
    icon: FlaskConical,
    accent: "emerald",
    blurb: "Keeping code correct and the workflow smooth.",
    items: ["Vitest", "Git", "GitHub", "VS Code", "Postman"],
  },
];

/* Flagship projects. `repo` matches the GitHub repo name, used to show live stars and to
   keep it out of the "Latest from GitHub" list. Cover: `image`, or `snippet` for a code card. */
export const featuredProjects = [
  {
    slug: "tripzy",
    repo: "Tripzy",
    title: "Tripzy",
    tagline: "Real-time group trip planner",
    category: "Full Stack · Real-time · AI",
    accent: "cyan",
    image: "/projects/tripzy.webp",
    oneLiner:
      "A real-time collaborative trip planner where groups vote on places, plan days with AI and split expenses, built with React, Node.js, Socket.IO, PostgreSQL and Gemini.",
    description:
      "Tripzy is a full-stack web app where friends plan a trip together in one shared workspace: collecting places on a map, voting on them, building a day-by-day itinerary, splitting expenses and sharing a packing list. Every change appears instantly on everyone's screen.",
    metrics: [
      { value: "~180", label: "automated tests" },
      { value: "Live", label: "Socket.IO sync" },
      { value: "AI", label: "Gemini itineraries" },
    ],
    features: [
      {
        title: "Live collaboration",
        text: "Socket.IO rooms tell each member's app which part of the trip changed, so data stays consistent without page reloads, and \"who's online\" indicators show who's there.",
      },
      {
        title: "AI itinerary planning",
        text: "The server groups places by distance and estimates travel times, then Google Gemini decides the order, meal timing and tips. Every AI answer is validated and repaired on the server, with a route-based fallback, so planning always works.",
      },
      {
        title: "Expense splitting",
        text: "Equal, exact or percentage splits calculated in whole paise, plus a \"settle up\" that clears all debts in the fewest payments.",
      },
      {
        title: "Roles & security",
        text: "Team leader and member permissions enforced on the server, rotating refresh tokens, email invites with expiring links, and Google sign-in.",
      },
      {
        title: "Quality",
        text: "About 180 automated tests, including API tests against a real PostgreSQL database. Deployed on free hosting: Vercel, Render and Neon.",
      },
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Zustand", "Node.js", "Express", "Socket.IO", "PostgreSQL", "Prisma", "Gemini API", "OpenStreetMap", "Vitest"],
    live: "https://tripzy-lovat.vercel.app",
    github: "https://github.com/SanskritiDevOps/Tripzy",
  },
  {
    slug: "llmux",
    repo: "LLMux",
    title: "LLMux",
    tagline: "One API for every LLM",
    category: "Backend · AI Infrastructure",
    accent: "violet",
    snippet: [
      ["$ ", "curl -X POST /v1/chat \\"],
      ["  ", "-H \"Authorization: Bearer llmux_••••\" \\"],
      ["  ", "-d '{ \"model\": \"fast\", \"stream\": true,"],
      ["  ", "      \"messages\": [{ \"role\": \"user\", … }] }'"],
      ["", ""],
      ["← ", "event: start  { provider: \"gemini\" }"],
      ["← ", "event: delta  { text: \"Hello\" }"],
      ["← ", "event: end    { tokens: 128, costMicros: 42 }"],
    ],
    oneLiner:
      "A self-hosted LLM gateway that gives apps one request format, one API key and one dashboard for every AI model.",
    description:
      "Every LLM provider has its own API: different request shapes, different streaming formats, different errors. Teams end up writing separate code for each one, rewriting it whenever they switch models, and going down whenever a provider does. LLMux sits between apps and the providers and removes that problem. An app sends one standard request, changes only the model field, and LLMux handles everything else.",
    metrics: [
      { value: "4", label: "LLM providers" },
      { value: "1", label: "unified endpoint" },
      { value: "SSE + WS", label: "live streaming" },
    ],
    features: [
      {
        title: "One API, four providers",
        text: "OpenAI, Anthropic, Google Gemini and local Ollama models, all behind a single POST /v1/chat endpoint.",
      },
      {
        title: "Model aliases",
        text: "Clients ask for \"fast\" or \"smart\", and the server decides which real model answers, so models can be swapped without any client change.",
      },
      {
        title: "Live streaming",
        text: "Server-Sent Events and WebSocket. Every provider's stream format is turned into the same start, delta and end events, and cancelling the stream also stops the provider request.",
      },
      {
        title: "Built to survive outages",
        text: "Retries with exponential backoff and jitter, automatic fallback to backup models only before the first token is sent, and a circuit breaker for each provider.",
      },
      {
        title: "Cost control & tracking",
        text: "A Redis response cache and per-key token-bucket rate limiting run as an atomic Lua script. Every request is logged with tokens, latency, cost in exact integer micro-dollars and the money the cache saved.",
      },
      {
        title: "Secure by design",
        text: "Gateway keys are stored only as hashes and shown once, provider keys never leave the server, credentials are hidden in all logs and prompts aren't stored.",
      },
      {
        title: "React dashboard",
        text: "Usage, cost and latency charts (p50 and p95), a request log, key management, provider health, and a playground that streams two models side by side with latency and cost under each.",
      },
    ],
    tech: ["Node.js", "Express", "WebSocket", "Zod", "PostgreSQL", "Prisma", "Redis", "React", "Vite", "Tailwind CSS", "TanStack Query", "Recharts", "Vitest", "Docker", "GitHub Actions"],
    live: "",
    github: "https://github.com/SanskritiDevOps/LLMux",
  },
];

/* Static copy for the Competitive Programming section (live stats come from profileConfig). */
export const competitiveProgramming = {
  summary:
    "Consistent DSA practice across LeetCode and CodeChef — sharpening problem-solving, complexity analysis and clean implementation under time pressure.",
  note: "", // optional one-liner under the cards, e.g. "Regularly competing in weekly contests"
  topics: [
    "Arrays & Strings",
    "Hashing",
    "Two Pointers",
    "Binary Search",
    "Greedy",
    "Recursion & Backtracking",
    "Trees",
    "Graphs",
    "Dynamic Programming",
  ],
};

/* Timeline for the Journey section. `type` picks the icon. */
/* Journey section. Items are grouped by `type` (experience / education) and shown
   in the order listed here — newest first. `grade` and `desc` are optional. */
export const journey = [
  // ── Experience ───────────────────────────────────────────
  {
    type: "experience",
    title: "Head of Operations",
    org: "Coders and Developers Club · MMMUT",
    period: "2024 — Present",
    desc: "Lead the club's operations — planning and running coding events, workshops and hackathons, coordinating the core team and volunteers, and keeping every event on schedule from first announcement to final wrap-up.",
    tags: ["Leadership", "Event operations", "Team coordination"],
  },
  {
    type: "experience",
    title: "Club, Hackathon & Personal Projects",
    org: "University clubs · Hackathons · Independent work",
    period: "2024 — Present",
    desc: "Building with teams in university clubs and at hackathons, and on my own — taking ideas from a rough plan to deployed, tested apps like Tripzy and LLMux.",
    tags: ["Hackathons", "Team projects", "Full-stack"],
  },

  // ── Education ────────────────────────────────────────────
  {
    type: "education",
    title: "B.Tech — Computer Science and Engineering",
    org: "Madan Mohan Malaviya University of Technology, Gorakhpur",
    period: "2024 — Present",
    desc: "Coursework in Data Structures and Algorithms, DBMS, Object-Oriented Programming in Java, Computer Networks and Operating Systems.",
    tags: ["DSA", "OOP", "DBMS", "CN", "OS"],
  },
  {
    type: "education",
    title: "Class 12 — Senior Secondary",
    org: "Maharana Pratap Education Centre, Kanpur",
    period: "2022 — 2023",
    grade: "94.6%",
  },
  {
    type: "education",
    title: "Class 10 — Secondary",
    org: "Maharana Pratap Education Centre, Kanpur",
    period: "2020 — 2021",
    grade: "93%",
  },
];

export const journeyGroups = [
  { type: "experience", label: "Experience" },
  { type: "education", label: "Education" },
];

export const journeyIcons = {
  education: GraduationCap,
  experience: Briefcase,
};
