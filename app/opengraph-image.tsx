import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph / social-share image, generated at the edge. Mirrors the
 * site: near-black field, an electric-blue glow, the name in large display
 * weight. This is what shows when the portfolio link is shared on LinkedIn,
 * WhatsApp, or Twitter.
 */
export const runtime = "edge";
export const alt = "Andy Azhari Pane - Cybersecurity & Web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(900px circle at 78% 12%, rgba(0,170,255,0.22), transparent 55%), radial-gradient(700px circle at 12% 95%, rgba(0,255,65,0.12), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#00AAFF",
          }}
        >
          IT Student · Cybersecurity Analyst
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#E8E8F0",
              lineHeight: 1.05,
            }}
          >
            Andy Azhari Pane
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#8A8A99" }}>
            Securing systems, building the web.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#8A8A99", letterSpacing: 1 }}>
          Bandung, Indonesia
        </div>
      </div>
    ),
    { ...size },
  );
}
