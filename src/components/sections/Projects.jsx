import { useCallback, useMemo, useState } from "react";
import { profileConfig } from "../../config/profileConfig";
import { featuredProjects } from "../../data/portfolioData";
import useLiveData from "../../hooks/useLiveData";
import { fetchGitHubRepos } from "../../services/github";
import FeaturedProjectCard from "../projects/FeaturedProjectCard";
import GitHubRepos from "../projects/GitHubRepos";
import ProjectCaseStudy from "../projects/ProjectCaseStudy";
import Modal from "../ui/Modal";
import SectionHeading from "../ui/SectionHeading";

const { username, cacheMinutes } = profileConfig.github;
const FEATURED_REPOS = featuredProjects.map((p) => p.repo).filter(Boolean);

export default function Projects() {
  // Fetched once here and shared: live stars/status on the flagship cards + the repo grid.
  const github = useLiveData(`github:${username}`, fetchGitHubRepos, { ttlMinutes: cacheMinutes });
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const repoByName = useMemo(
    () => Object.fromEntries((github.data ?? []).map((r) => [r.name.toLowerCase(), r])),
    [github.data]
  );

  return (
    <section id="projects" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Things I've built."
          description="Flagship projects end to end — real-time collaboration, AI integration and resilient backend infrastructure."
        />

        <div className="mt-14 space-y-8">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              repo={repoByName[project.repo?.toLowerCase()]}
              reverse={i % 2 === 1}
              onOpen={setSelected}
            />
          ))}
        </div>

        <GitHubRepos state={github} hide={FEATURED_REPOS} />
      </div>

      <Modal open={Boolean(selected)} onClose={closeModal} labelledBy="project-dialog-title">
        {selected && <ProjectCaseStudy project={selected} />}
      </Modal>
    </section>
  );
}
