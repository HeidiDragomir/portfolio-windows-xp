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
    <div style={{ display: "flex", height: "100%", background: "#ece9d8" }}>
      {/* Tool palette */}
      <div style={{ width: 56, padding: 6, borderRight: "1px solid #b9b59f" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 8 }}>
          {[2, 4, 8, 14].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="xp-btn"
              style={{ minWidth: 0, padding: 2, height: 22, fontWeight: size === s ? "bold" : "normal" }}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="xp-btn" style={{ minWidth: 0, width: "100%", padding: 2 }} onClick={clear}>
          Rensa
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 8, minWidth: 0 }}>
        <div className="xp-sunken" style={{ flex: 1, background: "#fff", overflow: "hidden" }}>
          <canvas
            ref={canvasRef}
            width={560}
            height={360}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair", touchAction: "none" }}
          />
        </div>
        {/* Color palette */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <div style={{ width: 26, height: 26, background: color, border: "2px solid", borderColor: "#808080 #fff #fff #808080" }} />
          <div style={{ display: "flex", flexWrap: "wrap", width: 9 * 16, gap: 0 }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                style={{ width: 16, height: 16, background: c, border: "1px solid #808080", padding: 0, cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
