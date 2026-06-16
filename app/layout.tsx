import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";
import "./globals.css";

/**
 * Self-hosted via next/font (no render-blocking <link> to Google). Three roles:
 * Space Grotesk for geometric display, Inter for body, JetBrains Mono for the
 * small technical labels and the section index. Each is exposed as a CSS
 * variable consumed by tailwind.config.ts.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // TODO: set to the real deployed origin before launch (used for OG/canonical).
  metadataBase: new URL("https://andy-azhari.vercel.app"),
  title: {
    default: `${profile.name} - Cybersecurity & Web`,
    template: `%s - ${profile.name}`,
  },
  description:
    "Andy Azhari Pane is an IT student and aspiring cybersecurity analyst in Bandung, focused on penetration testing and building secure, functional web and mobile applications.",
  keywords: [
    "Andy Azhari Pane",
    "cybersecurity analyst",
    "penetration testing",
    "web developer",
    "Telkom University",
    "Bandung",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} - Cybersecurity & Web`,
    description:
      "Securing systems, building the web. IT student focused on penetration testing and secure application development.",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - Cybersecurity & Web`,
    description: "Securing systems, building the web.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        {/* keyboard users land here first */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        {/* fixed, non-repainting grid + scanline texture at ~4% */}
        <div aria-hidden="true" className="texture-overlay pointer-events-none fixed inset-0 -z-10" />

        <ScrollProgress />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
