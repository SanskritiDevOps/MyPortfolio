import { MotionConfig } from "framer-motion";
import { navLinks } from "./data/portfolioData";
import useActiveSection from "./hooks/useActiveSection";
import Background from "./components/layout/Background";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import About from "./components/sections/About";
import CompetitiveProgramming from "./components/sections/CompetitiveProgramming";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <Background />
        <ScrollProgress />
        <Navbar active={active} />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CompetitiveProgramming />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
