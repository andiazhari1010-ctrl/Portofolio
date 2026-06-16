import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

/**
 * The structural index used across every section: a mono number plus the
 * section title. This is the page's ONE labelling system. There are no
 * additional uppercase eyebrows stacked on top, so the page never falls into
 * the "eyebrow on every section" rhythm. The number doubles as the nav anchor.
 */
export function SectionHeading({
  index,
  title,
  lead,
  id,
}: {
  index: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="font-mono text-sm text-accent-bright/80"
        >
          {index}
        </span>
        <span aria-hidden="true" className="h-px w-8 translate-y-[-3px] bg-line" />
        <span className="font-mono text-sm text-muted">/ {title}</span>
      </div>

      <h2
        id={`${id}-title`}
        aria-label={title}
        className="mt-5 max-w-[18ch] font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl"
      >
        <ScrambleText text={title} trigger="view" />
      </h2>

      {lead ? (
        <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
