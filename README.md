# Andy Azhari Pane - Portfolio

A dark, premium personal portfolio built around a restrained "neon liquid morphism"
aesthetic: near-black surfaces, electric-blue accent, acid-green used only for
active and highlight states, and a single slow aurora behind the hero.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (v3.4) with a CSS-variable token system
- **Framer Motion** for load stagger, scroll reveal, and hover physics
- **@phosphor-icons/react** for all iconography (one family, no hand-rolled SVG)
- Fonts via `next/font`: Space Grotesk (display), Inter (body), JetBrains Mono (labels)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Before you deploy

Everything you need to personalise lives in **`lib/content.ts`**:

1. **Social links** - confirm `github` and `linkedin` point at your real profiles.
2. **CV** - `public/cv.pdf` ships as a valid placeholder. Replace it with your real
   resume (keep the same filename, or update `profile.cv`).
3. **`metadataBase`** in `app/layout.tsx` - set it to your real deployed origin so
   Open Graph and canonical URLs are correct.
4. **Projects** - swap the placeholder `Source` links for real repo / demo URLs.

## Deploy (Vercel)

Push to a Git provider and import the repo in Vercel. No configuration needed; the
defaults detect Next.js. Or use the CLI:

```bash
npm i -g vercel
vercel
```

## Design notes

- **One theme** (dark), **one accent** (electric blue; green reserved for active /
  highlight), **one radius scale** (tags 6px, buttons 12px, cards 16px).
- **Neon is rationed**: glow appears only on the primary CTA, the active nav item,
  project-card hover, and the GPA stat. Nothing else glows.
- **Motion is calm and motivated**: a one-time hero stagger, scroll-reveal per
  section, hover lift on cards/buttons, and a sliding active-nav indicator.
  Everything degrades to static under `prefers-reduced-motion`.
- **Accessibility**: semantic landmarks, labelled icon links, a skip link,
  a visible green focus ring, `aria-current` on the active section, and WCAG AA
  contrast (white-on-#0066FF clears 4.83:1).

## Structure

```
app/
  layout.tsx      fonts, metadata, texture overlay, skip link
  page.tsx        section composition
  globals.css     tokens, panel/border system, texture, reduced-motion
components/        one component per section + shared primitives
lib/
  content.ts      all copy and config (edit here)
  motion.ts       shared easing and variants
```
