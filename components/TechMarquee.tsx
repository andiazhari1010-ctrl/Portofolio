/**
 * A single, slow logo marquee (the page's only marquee, per the skill's
 * one-per-page rule). Real brand marks from Simple Icons rendered in a muted
 * tone, no labels (logos only). Edges fade into the background. The CSS
 * animation freezes under prefers-reduced-motion via the global reduced-motion
 * block, so it degrades to a static row.
 *
 * Server component: no JS needed, the loop is pure CSS.
 */

const tools: { name: string; slug: string }[] = [
  { name: "Laravel", slug: "laravel" },
  { name: "React", slug: "react" },
  { name: "Flutter", slug: "flutter" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "PHP", slug: "php" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Firebase", slug: "firebase" },
  { name: "Git", slug: "git" },
];

export function TechMarquee() {
  // duplicated so the -50% translate loops seamlessly
  const row = [...tools, ...tools];

  return (
    <section aria-label="Tools and technologies" className="border-y border-line/60 py-10">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {row.map((tool, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${tool.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${tool.slug}/8A8A99`}
              alt={i < tools.length ? tool.name : ""}
              aria-hidden={i >= tools.length}
              width={36}
              height={36}
              loading="lazy"
              className="h-7 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
