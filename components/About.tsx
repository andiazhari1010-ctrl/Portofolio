import { about } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Editorial two-column block: bio prose on the left, a quiet fact rail on the
 * right. The GPA is the one fact lit with the green accent, so the eye lands on
 * it without any decoration elsewhere. This layout family appears once.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading id="about" index="01" title="About" />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* bio */}
          <Reveal className="lg:col-span-7">
            <div className="space-y-6">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-lg leading-[1.7] text-muted [&>span]:text-ink"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* fact rail */}
          <RevealGroup tight className="lg:col-span-5">
            <dl className="divide-y divide-line border-t border-line">
              {about.facts.map((fact) => (
                <RevealItem key={fact.label}>
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                      {fact.label}
                    </dt>
                    <dd
                      className={
                        "highlight" in fact && fact.highlight
                          ? "text-right font-mono text-base text-accent-green [text-shadow:0_0_18px_rgba(0,255,65,0.45)]"
                          : `text-right text-base text-ink ${fact.mono ? "font-mono" : ""}`
                      }
                    >
                      {fact.value}
                    </dd>
                  </div>
                </RevealItem>
              ))}
            </dl>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
