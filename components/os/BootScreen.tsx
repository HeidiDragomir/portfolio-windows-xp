"use client";

import { useEffect, useState } from "react";
import XpLogo from "./XpLogo";

interface Props {
  onDone: () => void;
}

/** A CSS recreation of the Windows XP boot splash (no image asset). */
export default function BootScreen({ onDone }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = window.setTimeout(() => setFading(true), 2600);
    const done = window.setTimeout(onDone, 3200);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-10 z-200000 transition-opacity duration-600 ease-[ease] ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <XpLogo scale={1.9} />

      {/* Animated XP-style loading bar (three blocks sliding through a track). */}
      <div
        className="w-40 h-4.5 border-2 border-[#6f7b9c] rounded-[5px] overflow-hidden relative bg-[#0a0d16] [box-shadow:inset_0_0_6px_rgba(0,0,0,0.8)]"
      >
        <div className="bootbar" />
      </div>

      <div className="absolute bottom-6 right-10 text-right text-[16px] text-[#cfd6e6]">
        <div className="font-bold">Welcome to my portfolio.</div>
        <div className="opacity-70">Copyright © 2026 Heidi Dragomir</div>
      </div>

      <style>{`
        .bootbar {
          position: absolute;
          top: 2px;
          bottom: 2px;
          width: 48px;
          border-radius: 3px;
          background: linear-gradient(90deg, rgba(60,130,240,0) 0%, #2b5fd6 30%, #6fa8ff 50%, #2b5fd6 70%, rgba(60,130,240,0) 100%);
          animation: bootSlide 1.5s linear infinite;
        }
        @keyframes bootSlide {
          0% { left: -55px; }
          100% { left: 165px; }
        }
      `}</style>
    </div>
  );
}
