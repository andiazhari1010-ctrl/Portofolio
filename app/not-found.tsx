import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

/**
 * On-brand 404. Same dark field and accent as the rest of the site, so a wrong
 * URL never breaks the spell.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* faint accent glow, static (no animation needed on a dead-end page) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 opacity-[0.14]"
        style={{
          background: "radial-gradient(circle, #00aaff 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-bright">
        Error 404
      </p>

      <h1 className="mt-5 font-display text-7xl font-semibold tracking-tightest text-gradient sm:text-8xl">
        404
      </h1>

      <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted">
        This page got lost in the noise. The link is broken or the page has moved.
      </p>

      <Link
        href="/"
        className="group mt-9 inline-flex items-center gap-2 rounded-btn bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-glow-blue-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-glow-blue"
      >
        <ArrowLeft size={18} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </main>
  );
}
