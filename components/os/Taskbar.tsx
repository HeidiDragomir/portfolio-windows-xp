"use client";

import { useEffect, useRef, useState } from "react";
import StartMenu from "./StartMenu";
import { useWindows } from "./WindowManagerProvider";
import { getApp } from "@/lib/apps";
import { icon } from "@/lib/icons";
import { playClick, setMuted, isMuted, getVolume, setVolume } from "@/lib/audio";

interface Props {
  onRequestShutdown: () => void;
  onLogOff: () => void;
}

export default function Taskbar({ onRequestShutdown, onLogOff }: Props) {
  const { windows, activeId, focus, minimize } = useWindows();
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(getVolume());
  const [volumeOpen, setVolumeOpen] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

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

  // Close volume popup when clicking elsewhere.
  useEffect(() => {
    if (!volumeOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setVolumeOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [volumeOpen]);

  function toggleMute() {
    const next = !isMuted();
    setMuted(next);
    setMutedState(next);
  }

  function handleVolumeChange(val: number) {
    setVolume(val);
    setVolumeState(val);
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
          <div
            ref={volumeRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              onClick={() => {
                playClick();
                setVolumeOpen((o) => !o);
              }}
              title={muted ? "Sound off" : `Sound on (${Math.round(volume * 100)}%)`}
              style={{
                cursor: "pointer",
                fontSize: 13,
                border: "none",
                background: "transparent",
                padding: "0 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {muted ? "🔇" : "🔊"}
            </button>

            {volumeOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  right: 0,
                  marginBottom: 4,
                  background: "#ece9d8",
                  border: "1px solid #999",
                  borderRadius: 2,
                  padding: 6,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  zIndex: 9999,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 40,
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(volume * 100)}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value) / 100)}
                  style={{
                    width: 20,
                    height: 100,
                    appearance: "slider-vertical",
                    writingMode: "bt-lr",
                    cursor: "pointer",
                  }}
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(volume * 100)}%
                </div>
              </div>
            )}
          </div>

          <span>{clock}</span>
        </div>
      </div>
    </>
  );
}
