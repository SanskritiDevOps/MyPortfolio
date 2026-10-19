import { socialLinks } from "../../data/portfolioData";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Magnetic from "./Magnetic";

const SOCIAL_ICONS = { github: GitHubIcon, linkedin: LinkedInIcon };

export default function SocialLinks({ size = "md", className = "" }) {
  const dims = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const icon = size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]";

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socialLinks
        .filter((s) => s.href)
        .map(({ id, label, href }) => {
          const Icon = SOCIAL_ICONS[id];
          return (
            <li key={id}>
              <Magnetic strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className={`flex ${dims} items-center justify-center rounded-xl border border-white/10 bg-white/3 text-zinc-300 backdrop-blur transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]`}
                >
                  {Icon && <Icon className={icon} />}
                </a>
              </Magnetic>
            </li>
          );
        })}
    </ul>
  );
}
