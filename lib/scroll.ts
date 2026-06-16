/**
 * Deterministic scroll-to-section. Instead of relying on native anchor jumps +
 * scroll-padding (which can land inconsistently across browsers during a smooth
 * scroll), we compute the exact target: the element's top minus the navbar
 * height plus breathing room. The navbar height is read from the same --nav-h
 * CSS variable used everywhere else, so it never drifts out of sync.
 */
const BREATHING = 28;

export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const navH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 68;

  const top = el.getBoundingClientRect().top + window.scrollY - (navH + BREATHING);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  // keep the URL shareable without triggering a second native jump
  history.replaceState(null, "", `#${id}`);
}
