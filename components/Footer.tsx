import { profile } from "@/lib/content";

/**
 * Quiet footer: attribution and a back-to-top link, nothing more. No version
 * stamps, no time or weather strips, no decorative meta. The social row lives
 * directly above in the contact section.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          Designed and built by{" "}
          <span className="text-ink">{profile.name}</span>. {year}.
        </p>
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
