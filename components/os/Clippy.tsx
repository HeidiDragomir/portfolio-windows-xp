"use client";

import { useEffect, useState } from "react";

const TIPS = [
  "Hi! I'm Clippy 📎 – your assistant. It looks like you want to get to know Heidi. Double-click 'My Computer' to explore her skills!",
  "Did you know? Heidi builds backends in ASP.NET Core and microservices. Take a look in 'My Projects'!",
  "Tip: Open 'My CV' to read the full résumé – or download the PDF.",
  "Want some music while you browse? Launch 'My Music' from the Start menu. 🎵",
  "Need a break? Play a round of Minesweeper! 💣",
  "Looking for contact details? Click 'Contact Me' to open an email. ✉️",
  "Psst… every window can be dragged, maximized and minimized, just like real Windows XP!",
];

export default function Clippy() {
  const [tip, setTip] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bubble, setBubble] = useState(true);

  useEffect(() => {
    if (!visible || !bubble) return;
    const id = window.setInterval(() => {
      setTip((t) => (t + 1) % TIPS.length);
    }, 13000);
    return () => clearInterval(id);
  }, [visible, bubble]);

  if (!visible) {
    return (
      <button
        onClick={() => {
          setVisible(true);
          setBubble(true);
        }}
        title="Show the assistant"
        style={{
          position: "fixed",
          right: 14,
          bottom: 40,
          zIndex: 90000,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid #0a52c8",
          background: "linear-gradient(180deg,#fff,#cfe0ff)",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        📎
      </button>
    );
  }

  return (
    <div style={{ position: "fixed", right: 18, bottom: 44, zIndex: 90000, width: 230 }}>
      {bubble && (
        <div
          style={{
            position: "relative",
            background: "#ffffcc",
            border: "1px solid #000",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 6,
            boxShadow: "2px 3px 8px rgba(0,0,0,0.35)",
            fontSize: 11,
            lineHeight: 1.5,
          }}
        >
          <button
            onClick={() => setBubble(false)}
            title="Close tip"
            style={{
              position: "absolute",
              top: 2,
              right: 4,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            ✕
          </button>
          <div style={{ paddingRight: 10 }}>{TIPS[tip]}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <button
              className="xp-btn"
              style={{ minWidth: 0, padding: "1px 8px", fontSize: 10 }}
              onClick={() => setTip((t) => (t + 1) % TIPS.length)}
            >
              Next tip
            </button>
            <button
              className="xp-btn"
              style={{ minWidth: 0, padding: "1px 8px", fontSize: 10 }}
              onClick={() => setVisible(false)}
            >
              Hide me
            </button>
          </div>
          {/* bubble tail */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: 36,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "9px solid #000",
            }}
          />
        </div>
      )}

      <div
        onClick={() => setBubble((b) => !b)}
        title="Clippy the assistant"
        style={{
          width: 90,
          marginLeft: "auto",
          cursor: "pointer",
          animation: "clippyBob 3s ease-in-out infinite",
          filter: "drop-shadow(2px 3px 3px rgba(0,0,0,0.35))",
        }}
      >
        <ClippySvg />
      </div>

      <style>{`
        @keyframes clippyBob {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-2deg); }
        }
        @keyframes clippyBlink {
          0%,92%,100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
      `}</style>
    </div>
  );
}

function ClippySvg() {
  return (
    <svg viewBox="0 0 100 130" width="90" height="117" aria-label="Clippy">
      {/* paperclip body */}
      <g fill="none" stroke="#8a9bb5" strokeWidth="9" strokeLinecap="round">
        <path d="M38 118 L38 44 a18 18 0 0 1 36 0 L74 96 a12 12 0 0 1 -24 0 L50 56" />
        <path
          d="M38 118 L38 44 a18 18 0 0 1 36 0 L74 96 a12 12 0 0 1 -24 0 L50 56"
          stroke="#c2cee0"
          strokeWidth="3"
        />
      </g>
      {/* eyebrows */}
      <g stroke="#444" strokeWidth="2.5" strokeLinecap="round">
        <line x1="30" y1="30" x2="44" y2="26" />
        <line x1="56" y1="26" x2="70" y2="30" />
      </g>
      {/* eyes */}
      <g style={{ transformOrigin: "center", animation: "clippyBlink 5s infinite" }}>
        <ellipse cx="40" cy="40" rx="7" ry="9" fill="#fff" stroke="#333" strokeWidth="2" />
        <ellipse cx="60" cy="40" rx="7" ry="9" fill="#fff" stroke="#333" strokeWidth="2" />
        <circle cx="42" cy="42" r="3" fill="#1b1b1b" />
        <circle cx="62" cy="42" r="3" fill="#1b1b1b" />
      </g>
    </svg>
  );
}
