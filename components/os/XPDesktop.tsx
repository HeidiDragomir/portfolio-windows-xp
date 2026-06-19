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
        className="fixed inset-0 bg-black text-[#e8a020] flex flex-col items-center justify-center gap-4.5 text-center text-[15px]"
      >
        <div className="font-bold [text-shadow:0_0_8px_rgba(232,160,32,0.6)]">
          It&apos;s now safe to turn off your computer.
        </div>
        <button
          className="xp-btn min-w-35"
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
