import { journey } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * The path from general IT to security, as a vertical timeline. This layout
 * family (a connected node rail) appears only here. Stages carry honest labels
 * instead of invented dates, so nothing claims a precision the record does not
 * have. Nodes use the blue accent with no glow: the neon budget is reserved for
 * the CTA, active nav, card hover, GPA, the certificate seal, and social hover.
 */
export function Journey() {
  const last = journey.length - 1;

  return (
    <section id="journey" aria-labelledby="journey-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          id="journey"
          index="03"
          title="Journey"
          lead="The route from general IT into security, marked by stage rather than by date."
        />

        <RevealGroup className="mt-14 max-w-3xl">
          <ol>
            {journey.map((entry, i) => (
              <RevealItem key={entry.title}>
                <li className="grid grid-cols-[auto_1fr] gap-x-6">
                  {/* marker rail: node plus the connector down to the next node */}
                  <div className="relative flex justify-center">
                    <span
                      aria-hidden="true"
                      className="z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-accent-bright/40 bg-accent-bright"
                    />
                    {i !== last && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-3 h-[calc(100%-0.25rem)] w-px -translate-x-1/2 bg-gradient-to-b from-line to-line/30"
                      />
                    )}
                  </div>

                  <div className={i !== last ? "pb-10" : ""}>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent-bright/80">
                      {entry.kicker}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-muted">
                      {entry.detail}
                    </p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
