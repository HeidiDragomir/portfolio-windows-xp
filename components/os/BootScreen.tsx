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
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        zIndex: 200000,
        transition: "opacity 600ms ease",
        opacity: fading ? 0 : 1,
      }}
    >
      <XpLogo scale={1.9} />

      {/* Animated XP-style loading bar (three blocks sliding through a track). */}
      <div
        style={{
          width: 160,
          height: 18,
          border: "2px solid #6f7b9c",
          borderRadius: 5,
          overflow: "hidden",
          position: "relative",
          background: "#0a0d16",
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.8)",
        }}
      >
        <div className="bootbar" />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 40,
          textAlign: "right",
          fontSize: 11,
          color: "#cfd6e6",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Microsoft</div>
        <div style={{ opacity: 0.7 }}>Copyright © Microsoft Corporation</div>
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
