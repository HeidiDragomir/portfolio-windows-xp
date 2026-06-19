"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import { useWindows, type WindowState } from "./WindowManagerProvider";

const MIN_W = 280;
const MIN_H = 160;

interface Props {
  win: WindowState;
  active: boolean;
  children: ReactNode;
}

export default function Window({ win, active, children }: Props) {
  const { focus, close, minimize, toggleMaximize, move, resize } = useWindows();

  // Local geometry used only while dragging/resizing for smoothness.
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const gesture = useRef<{
    mode: "move" | "resize";
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);

  const x = drag?.x ?? win.x;
  const y = drag?.y ?? win.y;
  const w = size?.w ?? win.width;
  const h = size?.h ?? win.height;

  function onTitlePointerDown(e: PointerEvent) {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest(".xp-title-btn")) return;
    focus(win.id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    gesture.current = {
      mode: "move",
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.width,
      origH: win.height,
    };
    setDrag({ x: win.x, y: win.y });
  }

  function onResizePointerDown(e: PointerEvent) {
    if (win.maximized) return;
    e.stopPropagation();
    focus(win.id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    gesture.current = {
      mode: "resize",
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.width,
      origH: win.height,
    };
    setSize({ w: win.width, h: win.height });
  }

  function onPointerMove(e: PointerEvent) {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (g.mode === "move") {
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;
      setDrag({
        x: Math.min(Math.max(g.origX + dx, -g.origW + 120), maxX),
        y: Math.min(Math.max(g.origY + dy, 0), maxY),
      });
    } else {
      setSize({
        w: Math.max(MIN_W, g.origW + dx),
        h: Math.max(MIN_H, g.origH + dy),
      });
    }
  }

  function onPointerUp() {
    const g = gesture.current;
    if (!g) return;
    if (g.mode === "move" && drag) {
      move(win.id, drag.x, drag.y);
      setDrag(null);
    } else if (g.mode === "resize" && size) {
      resize(win.id, size.w, size.h);
      setSize(null);
    }
    gesture.current = null;
  }

  if (win.minimized) return null;

  return (
    <div
      className={`xp-window${active ? " is-active" : ""}`}
      style={{ left: x, top: y, width: w, height: h, zIndex: win.zIndex }}
      onPointerDown={() => focus(win.id)}
    >
      <div
        className="xp-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="xp-titlebar-icon" src={win.icon} alt="" draggable={false} />
        <span className="xp-titlebar-text">{win.title}</span>
        <div className="xp-titlebar-buttons">
          <button
            className="xp-title-btn"
            title="Minimize"
            onClick={() => minimize(win.id)}
          >
            <span className="-mt-1.5">_</span>
          </button>
          <button
            className="xp-title-btn"
            title={win.maximized ? "Restore" : "Maximize"}
            onClick={() => toggleMaximize(win.id)}
          >
            {win.maximized ? "❐" : "▢"}
          </button>
          <button
            className="xp-title-btn close"
            title="Close"
            onClick={() => close(win.id)}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="xp-window-body">{children}</div>

      {!win.maximized && (
        <div
          className="xp-resize"
          onPointerDown={onResizePointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      )}
    </div>
  );
}
