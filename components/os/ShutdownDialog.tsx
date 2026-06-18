"use client";

import XpLogo from "./XpLogo";

interface Props {
  onStandBy: () => void;
  onTurnOff: () => void;
  onRestart: () => void;
  onCancel: () => void;
}

/** A CSS recreation of the Windows XP "Turn off computer" dialog. */
export default function ShutdownDialog({
  onStandBy,
  onTurnOff,
  onRestart,
  onCancel,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(20,40,110,0.55), rgba(10,25,80,0.75))",
        backdropFilter: "blur(1px)",
        fontFamily: "Tahoma, var(--xp-font)",
      }}
    >
      <div
        style={{
          width: 420,
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          border: "1px solid #15347e",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            color: "#fff",
            background:
              "linear-gradient(180deg,#5b9bf0 0%,#2f6fdc 45%,#1d5bd0 100%)",
          }}
        >
          <span style={{ fontSize: 17, fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}>
            Turn off computer
          </span>
          <div style={{ opacity: 0.95 }}>
            <XpLogo scale={0.5} />
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            background: "linear-gradient(180deg,#e4ecf8 0%,#bcd0ee 100%)",
            padding: "26px 18px 22px",
            display: "flex",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <PowerButton
            label="Stand By"
            symbol="☾"
            from="#ffcf6b"
            to="#e08a16"
            onClick={onStandBy}
          />
          <PowerButton
            label="Turn Off"
            symbol="⏻"
            from="#f47361"
            to="#c0291a"
            onClick={onTurnOff}
          />
          <PowerButton
            label="Restart"
            symbol="↻"
            from="#7fd06a"
            to="#3c8f3a"
            onClick={onRestart}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px 16px",
            background:
              "linear-gradient(180deg,#3f7fdc 0%,#1d5bd0 100%)",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              minWidth: 78,
              padding: "4px 12px",
              fontFamily: "Tahoma, var(--xp-font)",
              fontSize: 12,
              borderRadius: 4,
              border: "1px solid #0a3a8a",
              cursor: "pointer",
              color: "#15347e",
              background: "linear-gradient(180deg,#ffffff 0%,#dbe6f6 100%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PowerButton({
  label,
  symbol,
  from,
  to,
  onClick,
}: {
  label: string;
  symbol: string;
  from: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: `radial-gradient(circle at 36% 28%, ${from}, ${to})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold",
          boxShadow:
            "inset 0 1px 3px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.35)",
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        {symbol}
      </span>
      <span style={{ fontSize: 12, fontWeight: "bold", color: "#0a2a6a" }}>
        {label}
      </span>
    </button>
  );
}
