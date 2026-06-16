import { now } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * A short present-tense beat between the bio and the skills. Not a numbered
 * section and not in the nav: it is a single statement that says what the work
 * looks like right now, kept about the craft so it never echoes the hero's
 * availability panel. One small "Now" label marks it; the statement itself is
 * the headline. Three bare text threads below (no cards) keep the density low.
 */
export function Currently() {
  return (
    <section id="now" aria-label="What I am focused on now" className="py-[var(--section-y)]">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-bright">
            Now
          </p>
          <p className="mt-6 max-w-[24ch] font-display text-3xl font-medium leading-[1.18] tracking-tight text-ink sm:text-4xl sm:max-w-[30ch]">
            {now.lead}
          </p>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
            {now.body}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-3">
          {now.threads.map((thread) => (
            <RevealItem key={thread.kicker}>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-bright/80">
                  {thread.kicker}
                </p>
                <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-muted">
                  {thread.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
