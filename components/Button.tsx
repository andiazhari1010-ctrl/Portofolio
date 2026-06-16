import Link from "next/link";

/**
 * Two button intents only. Primary is the one place a solid accent fill + neon
 * glow is allowed; the glow intensifies on hover and the button presses down on
 * :active for tactile feedback. White on #0066FF clears WCAG AA (4.83:1), and
 * the brighter cyan is kept to the glow, never under the label. Secondary is a
 * faint-bordered ghost.
 *
 * CSS-only interactions, so this stays a server component.
 */

type Variant = "primary" | "secondary";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-[15px] font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px focus-visible:outline-offset-4";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-glow-blue-sm hover:-translate-y-0.5 hover:shadow-glow-blue",
  secondary:
    "border border-line bg-surface/60 text-ink hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface",
};

export function Button({
  href,
  variant = "primary",
  children,
  external = false,
  download = false,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = `${base} ${styles[variant]} ${className}`;

  // external / download links use a plain anchor; in-page anchors use Link
  if (external || download || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: true } : {})}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
