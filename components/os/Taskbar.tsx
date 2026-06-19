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
            className="align-middle"
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
          <div ref={volumeRef} className="relative inline-block">
            <button
              onClick={() => {
                playClick();
                setVolumeOpen((o) => !o);
              }}
              title={muted ? "Sound off" : `Sound on (${Math.round(volume * 100)}%)`}
              className="cursor-pointer text-sm border-0 bg-transparent px-1 flex items-center"
            >
              {muted ? "🔇" : "🔊"}
            </button>

            {volumeOpen && (
              <div className="absolute bottom-full right-0 mb-1 bg-[#ece9d8] border border-[#999] rounded p-1.5 shadow-md z-[9999] flex flex-col items-center gap-1.5 min-w-10">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(volume * 100)}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value) / 100)}
                  className="w-5 h-24 cursor-pointer [appearance:slider-vertical] [writing-mode:bt-lr]"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
                <div className="text-[10px] text-[#555] font-bold">
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
