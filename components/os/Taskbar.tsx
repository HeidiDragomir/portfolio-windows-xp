"use client";

import { useEffect, useState } from "react";
import StartMenu from "./StartMenu";
import { useWindows } from "./WindowManagerProvider";
import { getApp } from "@/lib/apps";
import { icon } from "@/lib/icons";
import { playClick, setMuted, isMuted } from "@/lib/audio";

interface Props {
  onRequestShutdown: () => void;
  onLogOff: () => void;
}

export default function Taskbar({ onRequestShutdown, onLogOff }: Props) {
  const { windows, activeId, focus, minimize } = useWindows();
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    update();
    const id = window.setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  // Close the Start menu when clicking elsewhere.
  useEffect(() => {
    if (!startOpen) return;
    const onDoc = () => setStartOpen(false);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [startOpen]);

  function toggleMute() {
    const next = !isMuted();
    setMuted(next);
    setMutedState(next);
  }

  function onTaskClick(id: string, minimized: boolean) {
    if (id === activeId && !minimized) {
      minimize(id);
    } else {
      focus(id);
    }
  }

  return (
    <>
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onLogOff={onLogOff}
          onTurnOff={onRequestShutdown}
        />
      )}

      <div className="xp-taskbar">
        <button
          className={`xp-start-btn${startOpen ? " is-open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            setStartOpen((o) => !o);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon("Start Menu Programs.png")}
            alt=""
            width={20}
            height={20}
            draggable={false}
            style={{ verticalAlign: "middle" }}
          />
          start
        </button>

        <div className="xp-tasklist">
          {windows.map((w) => {
            const app = getApp(w.appId);
            return (
              <button
                key={w.id}
                className={`xp-task-btn${w.id === activeId && !w.minimized ? " is-active" : ""}`}
                onClick={() => onTaskClick(w.id, w.minimized)}
                title={w.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={app?.icon ?? w.icon} alt="" width={16} height={16} draggable={false} />
                <span className="label">{w.title}</span>
              </button>
            );
          })}
        </div>

        <div className="xp-tray">
          <span
            onClick={toggleMute}
            title={muted ? "Sound off" : "Sound on"}
            style={{ cursor: "pointer", fontSize: 13 }}
          >
            {muted ? "🔇" : "🔊"}
          </span>
          <span>{clock}</span>
        </div>
      </div>
    </>
  );
}
