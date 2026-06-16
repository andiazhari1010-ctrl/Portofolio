import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";
import { Tilt } from "./Tilt";

/**
 * Asymmetric project composition, never three equal cards. The featured build
 * gets a wide panel with a gradient cover; the other two share a 2-column grid
 * below. Hover is where card glow is allowed: the panel lifts and its border
 * gradient warms toward electric blue (see .panel-interactive in globals.css).
 *
 * Phosphor's /dist/ssr entry renders icons in this server component without a
 * client boundary.
 */

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-tag border border-line bg-surface-2/70 px-2.5 py-1 font-mono text-[12px] text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent-bright"
        >
          {link.label}
          <ArrowUpRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      ))}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <SpotlightCard className="panel panel-interactive group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-glow-blue-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* text */}
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-9 lg:col-span-7">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-bright">
            Featured
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <div className="space-y-5">
          <Tags tags={project.tags} />
          <ProjectLinks links={project.links} />
        </div>
      </div>

      {/* gradient cover: a designed surface, not a faux screenshot */}
      <div className="relative min-h-[200px] overflow-hidden border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
        <div
          className="absolute inset-0 opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          style={{
            background:
              "radial-gradient(120% 120% at 80% 10%, rgba(0,170,255,0.30), transparent 55%), radial-gradient(120% 120% at 10% 90%, rgba(0,255,65,0.16), transparent 55%), #0b0b12",
          }}
        />
        <div className="relative flex h-full items-end p-7 sm:p-9">
          <span className="font-display text-2xl font-medium leading-snug tracking-tight text-ink/90">
            {project.blurb}
          </span>
        </div>
      </div>
      </div>
    </SpotlightCard>
  );
}

function SecondaryProject({ project }: { project: Project }) {
  return (
    <SpotlightCard className="panel panel-interactive group h-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-glow-blue-sm">
      <div className="flex h-full flex-col justify-between gap-8 p-7">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <div className="space-y-5">
          <Tags tags={project.tags} />
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          id="projects"
          index="05"
          title="Projects"
          lead="A few things I have built across coursework, the web, and mobile."
        />

        <div className="mt-14 space-y-6">
          <Reveal>
            <Tilt max={4}>
              <FeaturedProject project={featured} />
            </Tilt>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <RevealItem key={project.title} className="h-full">
                <Tilt className="h-full">
                  <SecondaryProject project={project} />
                </Tilt>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
