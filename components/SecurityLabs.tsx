import { ArrowUpRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { labs } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";
import { CountUp } from "./CountUp";
import { MatrixRain } from "./MatrixRain";

/**
 * Hands-on proof, the differentiator for a security portfolio. The digital rain
 * lives here and only here, behind a glass panel so it reads as atmosphere
 * showing through frosted glass rather than wallpaper. Count-up stat tiles on
 * the left, the actual completed rooms on the right. One-off layout family.
 */
export function SecurityLabs() {
  return (
    <section
      id="labs"
      aria-labelledby="labs-title"
      className="relative overflow-hidden py-[var(--section-y)]"
    >
      {/* contained matrix rain, faded at the edges so headings stay readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 32%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 32%, black 82%, transparent 100%)",
        }}
      >
        <MatrixRain className="h-full w-full" />
      </div>

      <div className="shell relative z-10">
        <SectionHeading
          id="labs"
          index="04"
          title="Security Labs"
          lead="Theory is cheap. This is where I practice the defensive work hands-on."
        />

        <Reveal className="mt-14">
          <SpotlightCard className="group relative overflow-hidden rounded-card border border-line bg-surface/55 shadow-card-rest backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-glow-blue-sm">
            <div className="grid grid-cols-1 gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
              {/* stat tiles */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-bright">
                  <ShieldCheck size={16} weight="fill" />
                  {labs.platform} / @{labs.username}
                </div>

                <dl className="mt-8 space-y-8">
                  {labs.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-display text-6xl font-semibold leading-none tracking-tightest text-gradient sm:text-7xl">
                        <CountUp value={stat.value} />
                      </dd>
                      <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* summary + completed rooms */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
                  {labs.summary}
                </p>

                <ul className="divide-y divide-line border-t border-line">
                  {labs.rooms.map((room) => (
                    <li key={room.name} className="flex items-center justify-between gap-4 py-3">
                      <span className="min-w-0 break-words text-[15px] text-ink">{room.name}</span>
                      <span
                        className={`shrink-0 rounded-tag border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${
                          room.track === "Offensive"
                            ? "border-accent-green/30 text-accent-green"
                            : "border-accent/30 text-accent-bright"
                        }`}
                      >
                        {room.track}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={labs.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-bright"
                >
                  View profile on {labs.platform}
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
