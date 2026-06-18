"use client";

import { useEffect, useState } from "react";
import { WindowManagerProvider, useWindows } from "./WindowManagerProvider";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import Window from "./Window";
import Clippy from "./Clippy";
import BootScreen from "./BootScreen";
import LoginScreen from "./LoginScreen";
import ShutdownDialog from "./ShutdownDialog";
import { getApp } from "@/lib/apps";

type Phase = "booting" | "login" | "running" | "off";

/** Renders every open window from the manager state. */
function WindowLayer() {
  const { windows, activeId } = useWindows();
  return (
    <>
      {windows.map((w) => {
        const app = getApp(w.appId);
        if (!app) return null;
        const Comp = app.component;
        return (
          <Window key={w.id} win={w} active={w.id === activeId}>
            <Comp />
          </Window>
        );
      })}
    </>
  );
}

export default function XPDesktop() {
  const [phase, setPhase] = useState<Phase>("booting");
  const [shutdownOpen, setShutdownOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("xp-booted") === "1") {
      setPhase("running");
    }
  }, []);

  function finishBoot() {
    setPhase("login");
  }

  function finishLogin() {
    sessionStorage.setItem("xp-booted", "1");
    setPhase("running");
  }

  function logOff() {
    sessionStorage.removeItem("xp-booted");
    setShutdownOpen(false);
    setPhase("login");
  }

  function turnOff() {
    sessionStorage.removeItem("xp-booted");
    setShutdownOpen(false);
    setPhase("off");
  }

  function restart() {
    sessionStorage.removeItem("xp-booted");
    setShutdownOpen(false);
    setPhase("booting");
  }

  if (phase === "off") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          color: "#e8a020",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          textAlign: "center",
          fontSize: 15,
        }}
      >
        <div style={{ fontWeight: "bold", textShadow: "0 0 8px rgba(232,160,32,0.6)" }}>
          It&apos;s now safe to turn off your computer.
        </div>
        <button
          className="xp-btn"
          style={{ minWidth: 140 }}
          onClick={() => {
            sessionStorage.removeItem("xp-booted");
            setPhase("booting");
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <>
      {phase === "booting" && <BootScreen onDone={finishBoot} />}
      {phase === "login" && (
        <LoginScreen
          onLogin={finishLogin}
          onRequestShutdown={() => setShutdownOpen(true)}
        />
      )}

      {phase === "running" && (
        <WindowManagerProvider>
          <Desktop />
          <WindowLayer />
          <Clippy />
          <Taskbar
            onRequestShutdown={() => setShutdownOpen(true)}
            onLogOff={logOff}
          />
        </WindowManagerProvider>
      )}

      {shutdownOpen && (
        <ShutdownDialog
          onStandBy={() => setShutdownOpen(false)}
          onTurnOff={turnOff}
          onRestart={restart}
          onCancel={() => setShutdownOpen(false)}
        />
      )}
    </>
  );
}
