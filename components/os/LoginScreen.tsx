"use client";

import { useState } from "react";
import XpLogo from "./XpLogo";
import { profile } from "@/lib/data/profile";
import { AVATAR } from "@/lib/icons";
import { playStartupSound } from "@/lib/audio";

interface Props {
  onLogin: () => void;
  onRequestShutdown: () => void;
}

/** A CSS recreation of the Windows XP "Welcome" / log-on screen. */
export default function LoginScreen({ onLogin, onRequestShutdown }: Props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [hover, setHover] = useState(false);

  function logOn() {
    if (loggingIn) return;
    setLoggingIn(true);
    playStartupSound();
    window.setTimeout(onLogin, 1600);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 199999,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        fontFamily: "Tahoma, var(--xp-font)",
        background: "#2f5cba",
      }}
    >
      {/* Top band — deep blue with a glowing light-blue hairline */}
      <div
        style={{
          height: "21%",
          background: "linear-gradient(180deg,#1f4aa6 0%,#2f63c8 100%)",
          borderBottom: "1px solid #bcd6ff",
          boxShadow: "0 1px 9px 1px rgba(150,190,255,0.75)",
        }}
      />

      {/* Middle field with a soft light glow */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(130% 120% at 24% 28%, rgba(255,255,255,0.45) 0%, rgba(110,150,225,0) 46%), linear-gradient(180deg,#5786dd 0%,#4d7ad4 100%)",
        }}
      >
        <div style={{ display: "flex", width: "88%", maxWidth: 860, alignItems: "center" }}>
          {/* Left: branding */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingRight: 34,
              textAlign: "right",
            }}
          >
            <XpLogo scale={1.6} />
            <div
              style={{
                marginTop: 26,
                fontSize: 15,
                textShadow: "1px 1px 2px rgba(0,0,0,0.35)",
                maxWidth: 250,
              }}
            >
              To begin, click your user name
            </div>
          </div>

          {/* Vertical divider */}
          <div
            style={{
              width: 2,
              height: 230,
              background:
                "linear-gradient(180deg,transparent 0%,rgba(207,224,255,0.9) 50%,transparent 100%)",
              boxShadow: "0 0 8px rgba(180,208,255,0.7)",
            }}
          />

          {/* Right: user list (one user) */}
          <div style={{ flex: 1, minWidth: 0, paddingLeft: 34 }}>
            {loggingIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Spinner />
                <span style={{ fontSize: 18 }}>Welcome</span>
              </div>
            ) : (
              <button
                onClick={logOn}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: hover ? "rgba(255,255,255,0.16)" : "transparent",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#fff",
                  padding: "6px 10px 6px 6px",
                  textAlign: "left",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={AVATAR}
                  alt={profile.namn}
                  width={48}
                  height={48}
                  draggable={false}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "cover",
                    borderRadius: 5,
                    border: "2px solid #fff",
                    background: "#9db8e8",
                    boxShadow: hover
                      ? "0 0 8px rgba(255,255,255,0.7)"
                      : "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.35)",
                  }}
                >
                  {profile.namn}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom band — deep blue with a glowing amber hairline */}
      <div
        style={{
          height: "19%",
          background: "linear-gradient(180deg,#2f63c8 0%,#1f4aa6 100%)",
          borderTop: "1px solid #f3b24a",
          boxShadow: "0 -1px 9px 1px rgba(243,170,70,0.6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 26px",
        }}
      >
        <button
          onClick={onRequestShutdown}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          title="Turn off computer"
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              background: "radial-gradient(circle at 35% 30%,#f06a5a,#c0291a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 4px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.4)",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            ⏻
          </span>
          <span style={{ fontSize: 12, textShadow: "1px 1px 1px rgba(0,0,0,0.35)" }}>
            Turn off computer
          </span>
        </button>

        <div
          style={{
            fontSize: 11,
            maxWidth: 320,
            textAlign: "right",
            lineHeight: 1.5,
            opacity: 0.95,
            textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
          }}
        >
          After you log on, you can explore the desktop.
          <br />
          Every icon opens a window about me.
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        border: "3px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
