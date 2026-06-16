import { SealCheck, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { certifications, training } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Credentials in two honest tiers: a verifiable certification gets the wide
 * highlight panel; completed courses (no saved certificate file) sit below as a
 * two-column grid clearly labelled as training, not credentials. Distinct
 * layout from the stat-panel above it.
 */
export function Certifications() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="py-[var(--section-y)]"
    >
      <div className="shell">
        <SectionHeading id="credentials" index="06" title="Certifications & Training" />

        {/* certification: wide highlight */}
        <RevealGroup className="mt-14 space-y-5">
          {certifications.map((cert) => (
            <RevealItem key={cert.title}>
              <article className="panel flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-btn border border-line bg-surface-2 text-accent-bright shadow-glow-blue-sm">
                  <SealCheck size={28} weight="duotone" />
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {cert.issuer}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                    {cert.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-muted">
                    {cert.detail}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* training: completed courses */}
        <Reveal className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Courses completed
          </p>
        </Reveal>

        <RevealGroup className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {training.map((course) => (
            <RevealItem key={course.title} className="h-full">
              <article className="panel flex h-full items-start gap-4 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn border border-line bg-surface-2 text-muted">
                  <GraduationCap size={20} weight="duotone" />
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent-bright/80">
                    {course.issuer}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {course.detail}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
