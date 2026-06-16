/**
 * The single animated visual on the page: one slow, liquid aurora living only
 * behind the hero. Two stacked layers, both pure CSS (transform + filter) so
 * they need no client JS, and the reduced-motion block in globals.css freezes
 * them. Marked aria-hidden: this is atmosphere, not content.
 *
 *  - base glow: soft blue-green blobs, heavily blurred, lighting the whole area.
 *  - liquid contours: soft concentric blue-to-green rings (the "liquid
 *    morphism" motif) that drift and breathe. Kept blurred and at low opacity
 *    so they read as a whisper behind the content, never as a busy background.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // fade the whole field toward the edges so it dissolves into the page
        // instead of being clipped with a hard line when the hero scrolls away
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 75% at 50% 32%, #000 30%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 80% 75% at 50% 32%, #000 30%, transparent 82%)",
      }}
    >
      {/* base glow: keeps the area lit without any hard edge */}
      <div
        className="absolute left-1/2 top-[16%] h-[44rem] w-[44rem] -translate-x-1/2 animate-aurora opacity-[0.14] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #00aaff 0%, transparent 55%), radial-gradient(circle at 70% 65%, #00ff41 0%, transparent 50%), radial-gradient(circle at 55% 45%, #0066ff 0%, transparent 60%)",
          filter: "blur(72px)",
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
        }}
      >
        {/* inner layer cycles hue between blue and green for a living gradient */}
        <div
          className="absolute inset-0 animate-aurora-hue"
          style={{ borderRadius: "inherit", background: "inherit" }}
        />
      </div>

      {/* liquid contours: concentric blue-to-green rings, the morphism motif.
          Desynced from the base (longer cycle, offset phase) so the two layers
          never move in lockstep. Screen blend gives the oil-slick luminosity. */}
      <div
        className="absolute left-[44%] top-[19%] h-[38rem] w-[38rem] -translate-x-1/2 animate-aurora opacity-[0.15] will-change-transform"
        style={{
          animationDuration: "29s",
          animationDelay: "-7s",
          background:
            "repeating-radial-gradient(circle at 44% 42%, #00aaff 0px, #00ff41 32px, #0066ff 66px, #00aaff 100px)",
          filter: "blur(24px)",
          borderRadius: "54% 46% 38% 62% / 49% 57% 43% 51%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
