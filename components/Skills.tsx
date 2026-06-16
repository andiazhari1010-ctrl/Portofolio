import { skillGroups } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Skills as divided rows rather than three equal cards (the banned default).
 * Each category is one row: title and one-line note on the left, monospace
 * capability tags on the right. Hairline dividers keep it airy. This layout
 * family appears once on the page.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          id="skills"
          index="02"
          title="Skills"
          lead="The tools I reach for across breaking into systems, building them, and running them."
        />

        <RevealGroup className="mt-14 border-t border-line">
          {skillGroups.map((group) => (
            <RevealItem key={group.title}>
              <div className="grid grid-cols-1 gap-5 border-b border-line py-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                    {group.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted">
                    {group.note}
                  </p>
                </div>

                <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-tag border border-line bg-surface/60 px-3 py-1.5 font-mono text-[13px] text-ink/90 transition-colors duration-300 hover:border-accent/50 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
