"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { profile } from "@/lib/content";

/**
 * The page's single contact action: the email as a focal link. Sized to sit
 * below the section heading in the hierarchy (heading stays dominant), and set
 * to break/wrap so a long address never overflows its column into the form.
 * The copy button gives real feedback and resets after a couple of seconds.
 */
export function ContactEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (insecure context / permissions): the mailto link still works
    }
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="group block w-full max-w-full break-all font-display text-2xl font-semibold leading-tight tracking-tight text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent-bright sm:text-3xl"
      >
        <span className="group-hover:text-gradient">{profile.email}</span>
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="inline-flex shrink-0 items-center gap-2 rounded-btn border border-line bg-surface px-3.5 py-2 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/60 hover:text-ink"
      >
        {copied ? (
          <>
            <Check size={15} weight="bold" className="text-accent-green" />
            Copied
          </>
        ) : (
          <>
            <Copy size={15} weight="regular" />
            Copy email
          </>
        )}
      </button>
    </div>
  );
}
