"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, DownloadSimple, MapPin } from "@phosphor-icons/react";
import { profile } from "@/lib/content";
import { Button } from "./Button";
import { Socials } from "./Socials";
import { Aurora } from "./Aurora";
import { ScrambleText } from "./ScrambleText";
import { Magnetic } from "./Magnetic";
import { CountUp } from "./CountUp";
import { EASE_OUT } from "@/lib/motion";

/**
 * Asymmetric, left-aligned hero (anti-center, per DESIGN_VARIANCE 7). Four text
 * elements only: a compact mono role label, the name, one subtext line, and the
 * CTAs. The right column is the hero's real visual: an honest "current status"
 * identity panel (not a faux product screenshot), with the single page aurora
 * drifting behind it.
 *
 * Motion: a one-time staggered fade-up on load. Reduced motion renders it static.
 */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <Aurora />

      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* left: the message */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="lg:col-span-7"
        >
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.2em] text-accent-bright"
          >
            IT Student · Cybersecurity Analyst in training
          </motion.p>

          <motion.h1
            variants={item}
            aria-label="Andy Azhari Pane."
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
          >
            <ScrambleText text="Andy Azhari" trigger="load" />
            <br />
            <span className="text-gradient">
              <ScrambleText text="Pane." trigger="load" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl"
          >
            <span className="text-ink">{profile.tagline}</span> An IT student in
            Bandung focused on penetration testing and secure-by-default apps.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#projects" variant="primary">
                View Projects
                <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            <Button href={profile.cv} variant="secondary" download>
              Download CV
              <DownloadSimple size={18} weight="bold" />
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <Socials />
          </motion.div>
        </motion.div>

        {/* right: real status panel (the hero's visual) */}
        <motion.div
          variants={item}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="lg:col-span-5"
        >
          <div className="panel relative overflow-hidden p-6 sm:p-7">
            {/* contained liquid glass: the morphism motif flows behind the
                frosted panel content, clipped to the card and kept faint so
                the text stays crisp. This is the hero's one real visual. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
              <div
                className="absolute -right-16 -top-24 h-[26rem] w-[26rem] animate-aurora opacity-[0.09] will-change-transform"
                style={{
                  animationDuration: "24s",
                  background:
                    "repeating-radial-gradient(circle at 50% 50%, #00aaff 0px, #00ff41 26px, #0066ff 54px, #00aaff 82px)",
                  filter: "blur(22px)",
                  borderRadius: "54% 46% 38% 62% / 49% 57% 43% 51%",
                  mixBlendMode: "screen",
                }}
              />
            </div>

            <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Current
              </span>
              {/* genuine availability state, the one allowed semantic indicator */}
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent-green">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                Open to roles
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-ink">
              Looking for internships and entry-level roles in security analysis
              and secure web development.
            </p>

            <div className="mt-6 h-px hairline" />

            <dl className="mt-6 grid grid-cols-2 gap-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Location
                </dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-ink">
                  <MapPin size={15} weight="fill" className="text-accent-bright" />
                  {profile.location}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  GPA
                </dt>
                <dd className="mt-1.5 font-mono text-sm text-accent-green">
                  <CountUp value={Number(profile.gpa)} decimals={2} /> / {profile.gpaScale}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Studying
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  {profile.program}, {profile.university}
                </dd>
              </div>
            </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
