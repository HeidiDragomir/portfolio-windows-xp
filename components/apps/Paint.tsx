"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200",
  "#22b14c", "#00a2e8", "#3f48cc", "#a349a4", "#ffffff", "#c3c3c3",
  "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0", "#b5e61d", "#99d9ea",
];

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
    }
  }, []);

  function pos(e: React.PointerEvent) {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    };
  }

  function down(e: React.PointerEvent) {
    drawing.current = true;
    last.current = pos(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    const p = pos(e);
    if (ctx && last.current) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    last.current = p;
  }
  function up() {
    drawing.current = false;
    last.current = null;
  }
  function clear() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
    }
  }

  return (
    <div className="flex h-full bg-[#ece9d8]">
      {/* Tool palette */}
      <div className="w-14 p-1.5 border-r border-[#b9b59f]">
        <div className="grid grid-cols-2 gap-1 mb-2">
          {[2, 4, 8, 14].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{ minWidth: "auto", padding: "2px 2px", height: "22px" }}
              className={`xp-btn ${size === s ? "font-bold" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="xp-btn" style={{ minWidth: "auto", width: "100%", padding: "2px 4px" }} onClick={clear}>
          Clear
        </button>
      </div>

      <div className="flex-1 flex flex-col p-2 min-w-0">
        <div className="xp-sunken flex-1 bg-white overflow-hidden">
          <canvas
            ref={canvasRef}
            width={560}
            height={360}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            className="w-full h-full block cursor-crosshair touch-none"
          />
        </div>
        {/* Color palette */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-6.5 h-6.5 border-2 border-solid border-l-[#808080] border-t-[#808080] border-r-white border-b-white"
            style={{ background: color }}
          />
          <div className="flex flex-wrap w-36">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                className="w-4 h-4 border border-[#808080] p-0 cursor-pointer"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
