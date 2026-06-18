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
          {/* Glossy waving flag, overlapping above the word */}
          <svg
            width="1.75em"
            height="1.4em"
            viewBox="0 0 104 90"
            aria-hidden
            style={{
              position: "absolute",
              right: 0,
              bottom: "calc(100% + 0.14em)",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
            }}
          >
            <defs>
              <linearGradient id="xpRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffb98f" />
                <stop offset="0.18" stopColor="#f6611c" />
                <stop offset="1" stopColor="#e0440d" />
              </linearGradient>
              <linearGradient id="xpGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9f08a" />
                <stop offset="0.18" stopColor="#74b800" />
                <stop offset="1" stopColor="#5a9400" />
              </linearGradient>
              <linearGradient id="xpBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b9c6ff" />
                <stop offset="0.18" stopColor="#5c75f6" />
                <stop offset="1" stopColor="#2b3fd6" />
              </linearGradient>
              <linearGradient id="xpYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff3a0" />
                <stop offset="0.18" stopColor="#ffd400" />
                <stop offset="1" stopColor="#f0c000" />
              </linearGradient>
            </defs>

            <g strokeLinejoin="round">
              <path d="M6,26 C30,14 50,18 72,8 L70,37 C48,47 28,43 4,55 Z" fill="url(#xpRed)" />
              <path d="M72,8 C80,5 88,4 96,2 L94,31 C86,33 78,34 70,37 Z" fill="url(#xpGreen)" />
              <path d="M4,55 C28,43 48,47 70,37 L68,66 C46,76 26,72 2,84 Z" fill="url(#xpBlue)" />
              <path d="M70,37 C78,34 86,33 94,31 L92,60 C84,62 76,63 68,66 Z" fill="url(#xpYellow)" />
            </g>

            <g fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.4" strokeLinecap="round">
              <path d="M4,55 C28,43 48,47 70,37 C78,34 86,33 94,31" />
              <path d="M72,8 L70,37 L68,66" />
            </g>

            <path
              d="M6,26 C30,14 50,18 72,8 C80,5 88,4 96,2 L95,13 C84,14 77,16 70,19 C49,27 29,25 5,37 Z"
              fill="rgba(255,255,255,0.28)"
            />
          </svg>
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