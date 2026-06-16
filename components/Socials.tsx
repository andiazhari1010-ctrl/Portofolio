"use client";

import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "@/lib/content";

/**
 * Social row reused in the hero, contact, and footer. One icon family
 * (Phosphor), one weight, one hover language: icon brightens to the accent and
 * lifts slightly. Every link carries an explicit aria-label since the glyph is
 * the only visible content.
 */

const links = [
  { label: "GitHub profile", href: profile.github, Icon: GithubLogo, external: true },
  { label: "LinkedIn profile", href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: `Email ${profile.name}`, href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
];

export function Socials({ size = 22 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-2">
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className="group flex h-11 w-11 items-center justify-center rounded-btn border border-line bg-surface/50 text-muted transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink hover:shadow-glow-blue-sm"
          >
            <Icon size={size} weight="regular" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
