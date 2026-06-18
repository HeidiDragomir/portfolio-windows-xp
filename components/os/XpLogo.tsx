"use client";

/**
 * A CSS/SVG recreation of the Windows XP wordmark, rebranded for the portfolio:
 * "Heidi Dragomir" (small) above "Portfolio xp" (large), with the glossy
 * waving flag positioned above and flush with the right edge of "Portfolio" —
 * matching the layout of the original XP welcome-screen logo.
 */
export default function XpLogo({
  scale = 1,
  color = "#ffffff",
}: {
  scale?: number;
  color?: string;
}) {
  const portfolioSize = 42 * scale;
  const xpSize = 21 * scale;
  const nameSize = 14 * scale;

  return (
    <div style={{ display: "inline-block", textAlign: "left" }}>
      {/* Small name line */}
      <div
        style={{
          fontSize: nameSize,
          color,
          opacity: 0.95,
          letterSpacing: 0.2,
          marginBottom: 6 * scale,
          fontFamily: "Tahoma, Verdana, Arial, sans-serif",
        }}
      >
        Heidi Dragomir
      </div>

      {/* Portfolio + xp, with the flag anchored above Portfolio's right edge */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: portfolioSize,
            fontWeight: 700,
            color,
            fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
            letterSpacing: 0,
            lineHeight: 0.95,
          }}
        >
          Portfolio
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/xp-flag.png"
            alt=""
            width={Math.round(73 * scale)}
            height={Math.round(60 * scale)}
            draggable={false}
            style={{
              position: "absolute",
              right: 0,
              bottom: "calc(100% + 0.14em)",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
            }}
          />
        </span>

        <span
          style={{
            marginLeft: 1 * scale,
            fontSize: xpSize,
            fontWeight: 700,
            color: "#f15f1c",
            fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
            lineHeight: 0.95,
          }}
        >
          xp
        </span>
      </div>
    </div>
  );
}