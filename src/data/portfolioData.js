/* ================================================================
   PORTFOLIO CONTENT
   Everything the site displays lives here. Edit this file to update
   your portfolio. Lines marked TODO still hold placeholder content.
================================================================ */

import {
  Code2,
  Terminal,
  Wrench,
  Database,
  Layers,
  Gauge,
  Palette,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export const profile = {
  name: "Sanskriti Singh",
  shortName: "sanskriti",
  role: "Software Developer",
  // Rotates under the headline in the hero.
  roles: ["Software Developer", "Frontend Developer", "Java Programmer", "UI Enthusiast"],
  tagline:
    "Turning creativity into code to build products that scale, perform and make an impact.",
  status: "Available for internships & projects",
  email: "your.email@example.com", // TODO: your real email
  resumeUrl: "/resume.pdf", // TODO: put resume.pdf inside /public
  photo: "/sanskriti.webp", // transparent cutout, shown in the hero
  greeting: "Hi, There!",
  intro:
    "I'm a software developer who turns ideas into fast, responsive and thoughtfully designed web experiences — with React, Java and an eye for detail.",
  focus: "clean UI + solid logic",
};

export const about = {
  // TODO: personalise these paragraphs.
  bio: [
    "I'm a software developer who loves the space where design meets engineering. I enjoy taking an idea from a rough sketch to a polished, responsive product that people genuinely enjoy using.",
    "My toolkit centres on React, Tailwind CSS and Java. I care about readable code, accessible interfaces and the small details — the transitions, spacing and states that make software feel effortless.",
  ],
  highlights: [
    {
      icon: Layers,
      title: "Component-driven",
      text: "Modular, reusable building blocks that keep codebases easy to grow.",
    },
    {
      icon: Gauge,
      title: "Performance-minded",
      text: "Lean bundles, smooth interactions and fast first paints.",
    },
    {
      icon: Palette,
      title: "Design-literate",
      text: "Comfortable in Figma and fluent in turning mockups into pixels.",
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
  { id: "linkedin", label: "LinkedIn", href: "" }, // TODO: your LinkedIn URL (hidden while empty)
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    accent: "cyan",
    blurb: "Interfaces that are responsive, accessible and fast.",
    items: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    title: "Languages",
    icon: Terminal,
    accent: "violet",
    blurb: "The languages I think and build in.",
    items: ["Java", "JavaScript", "SQL"],
  },
  {
    title: "Backend & Data",
    icon: Database,
    accent: "emerald",
    blurb: "Storing, querying and shaping data.",
    items: ["SQL", "Relational Databases"], // TODO: add Node.js, Express, etc. if you use them
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    accent: "cyan",
    blurb: "Shipping, collaborating and designing.",
    items: ["Git & GitHub", "Figma", "Vercel", "Vite", "VS Code"],
  },
];

/* Project categories drive the filter tabs. `accent` ∈ cyan | violet | emerald.
   `featured: true` makes a card span two columns in the bento grid.
   Leave `github` or `live` empty to hide that link. */
export const projects = [
  {
    title: "Portfolio v2",
    category: "UI / Creative",
    year: "2026",
    accent: "violet",
    featured: true,
    desc: "This site — a modular, motion-rich developer portfolio built with React, Tailwind CSS v4 and Framer Motion.",
    longDesc:
      "A ground-up rebuild of my personal site. Content lives in a single data file, components are split into layout, section and UI layers, and every interaction respects reduced-motion preferences.",
    highlights: ["Data-driven content", "Bento project grid", "Spring-based micro-interactions"],
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/SanskritiDevOps/MyPortfolio",
    live: "",
  },
  // TODO: the projects below are sample entries — replace them with your own work.
  {
    title: "TaskFlow",
    category: "Full Stack",
    year: "2025",
    accent: "cyan",
    featured: false,
    desc: "A Kanban-style task manager with drag-and-drop boards, real-time sync and team workspaces.",
    longDesc:
      "TaskFlow lets small teams organise work across boards and columns. Changes sync instantly between collaborators and state is managed with a lightweight store.",
    highlights: ["Real-time sync", "Drag & drop boards", "Team workspaces"],
    tech: ["React", "Zustand", "Tailwind CSS", "Firebase"],
    github: "",
    live: "",
  },
  {
    title: "Library Manager",
    category: "Systems / Backend",
    year: "2025",
    accent: "emerald",
    featured: false,
    desc: "A Java application for managing books, members and loans backed by a relational database.",
    longDesc:
      "Models books, members and loans with clean object-oriented design and persists everything through SQL with input validation and search.",
    highlights: ["OOP domain model", "SQL persistence", "Search & reports"],
    tech: ["Java", "SQL", "JDBC"],
    github: "",
    live: "",
  },
  {
    title: "Weather Glance",
    category: "Frontend",
    year: "2024",
    accent: "cyan",
    featured: false,
    desc: "A clean weather dashboard with city search, 5-day forecast and adaptive theming.",
    longDesc:
      "Fetches live forecasts from a public weather API, caches recent searches and adapts its colour palette to current conditions.",
    highlights: ["Live API data", "Recent-search cache", "Fully responsive"],
    tech: ["JavaScript", "HTML", "CSS", "REST API"],
    github: "",
    live: "",
  },
];

/* Competitive Programming section.
   Any stat with an empty value is hidden, and the LeetCode difficulty bar only
   shows once all three numbers are filled in. `accent` ∈ amber | violet | cyan | emerald. */
export const competitiveProgramming = {
  totalSolved: 400, // displayed as "400+"
  summary:
    "Consistent DSA practice across LeetCode and CodeChef — sharpening problem-solving, complexity analysis and clean implementation under time pressure.",
  note: "", // optional one-liner under the cards, e.g. "Regularly competing in weekly contests"
  // TODO: adjust to the topics you're strongest in.
  topics: [
    "Arrays & Strings",
    "Hashing",
    "Two Pointers",
    "Binary Search",
    "Recursion & Backtracking",
    "Trees & Graphs",
    "Dynamic Programming",
    "Greedy",
  ],
  profiles: [
    {
      platform: "LeetCode",
      short: "LC",
      accent: "amber",
      handle: "", // TODO: your LeetCode username
      url: "", // TODO: https://leetcode.com/u/<username>/
      stats: [
        { label: "Problems solved", value: "" }, // TODO e.g. "300+"
        { label: "Contest rating", value: "" }, // TODO e.g. "1650"
        { label: "Max streak", value: "" }, // TODO e.g. "100 days"
      ],
      breakdown: { easy: null, medium: null, hard: null }, // TODO e.g. { easy: 150, medium: 130, hard: 20 }
    },
    {
      platform: "CodeChef",
      short: "CC",
      accent: "violet",
      handle: "", // TODO: your CodeChef username
      url: "", // TODO: https://www.codechef.com/users/<username>
      stats: [
        { label: "Rating", value: "" }, // TODO e.g. "1600"
        { label: "Stars", value: "" }, // TODO e.g. "3★"
        { label: "Problems solved", value: "" }, // TODO e.g. "100+"
      ],
    },
  ],
};

/* Timeline for the Journey section. `type` picks the icon. */
export const journey = [
  // TODO: replace with your real education and experience.
  {
    type: "education",
    title: "B.Tech — Computer Science",
    org: "Your University",
    period: "2023 — Present",
    desc: "Coursework in data structures, algorithms, DBMS and object-oriented programming in Java.",
    tags: ["DSA", "OOP", "DBMS"],
  },
  {
    type: "experience",
    title: "Independent Developer",
    org: "Personal & freelance projects",
    period: "2024 — Present",
    desc: "Designing and shipping web projects end to end — from Figma mockups to deployed React apps on Vercel.",
    tags: ["React", "Tailwind", "Vercel"],
  },
];

export const journeyIcons = {
  education: GraduationCap,
  experience: Briefcase,
};
