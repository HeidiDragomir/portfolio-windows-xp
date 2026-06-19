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
        className="fixed right-3.5 bottom-10 z-90000 w-8.5 h-8.5 rounded-full border border-[#0a52c8] bg-[linear-gradient(180deg,#fff,#cfe0ff)] cursor-pointer text-[16px]"
      >
        📎
      </button>
    );
  }

  return (
    <div className="fixed right-4.5 bottom-11 z-90000 w-57.5">
      {bubble && (
        <div
          className="relative bg-[#ffffcc] border border-black rounded-[10px] px-3 pt-2.5 pb-2.5 mb-1.5 [box-shadow:2px_3px_8px_rgba(0,0,0,0.35)] text-[11px] leading-normal"
        >
          <button
            onClick={() => setBubble(false)}
            title="Close tip"
            className="absolute top-0.5 right-1 border-none bg-transparent cursor-pointer font-bold text-[#555]"
          >
            ✕
          </button>
          <div className="pr-2.5">{TIPS[tip]}</div>
          <div className="flex justify-between mt-2">
            <button
              className="xp-btn min-w-0 px-2 py-px text-[10px]"
              onClick={() => setTip((t) => (t + 1) % TIPS.length)}
            >
              Next tip
            </button>
            <button
              className="xp-btn min-w-0 px-2 py-px text-[10px]"
              onClick={() => setVisible(false)}
            >
              Hide me
            </button>
          </div>
          {/* bubble tail */}
          <div
            className="absolute -bottom-2 right-9 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[9px] border-t-black"
          />
        </div>
      )}

      <div
        onClick={() => setBubble((b) => !b)}
        title="Clippy the assistant"
        className="w-22.5 ml-auto cursor-pointer animate-[clippyBob_3s_ease-in-out_infinite] filter-[drop-shadow(2px_3px_3px_rgba(0,0,0,0.35))]"
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
      <g className="origin-center animate-[clippyBlink_5s_infinite]">
        <ellipse cx="40" cy="40" rx="7" ry="9" fill="#fff" stroke="#333" strokeWidth="2" />
        <ellipse cx="60" cy="40" rx="7" ry="9" fill="#fff" stroke="#333" strokeWidth="2" />
        <circle cx="42" cy="42" r="3" fill="#1b1b1b" />
        <circle cx="62" cy="42" r="3" fill="#1b1b1b" />
      </g>
    </svg>
  );
}
