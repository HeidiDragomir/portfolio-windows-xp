"use client";

import { useEffect, useRef, useState } from "react";
import { getMusicEngine, MUSIC_TRACKS } from "@/lib/audio";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MyMusic() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [len, setLen] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Wire up the engine + visualizer once.
  useEffect(() => {
    const engine = getMusicEngine();
    if (!engine) return;
    engine.setTickCallback((c, l) => {
      setCur(c);
      setLen(l);
    });
    engine.setVolume(volume);
    setLen(engine.lengthSec);

    const analyser = engine.getAnalyser();
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const { width, height } = canvas;
          ctx.fillStyle = "#06121f";
          ctx.fillRect(0, 0, width, height);
          analyser.getByteFrequencyData(data);
          const bars = data.length;
          const bw = width / bars;
          for (let i = 0; i < bars; i++) {
            const h = (data[i] / 255) * height;
            const grad = ctx.createLinearGradient(0, height, 0, height - h);
            grad.addColorStop(0, "#00e0ff");
            grad.addColorStop(1, "#7afcff");
            ctx.fillStyle = grad;
            ctx.fillRect(i * bw + 1, height - h, bw - 2, h);
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function play() {
    const engine = getMusicEngine();
    if (!engine) return;
    engine.play();
    setPlaying(true);
  }
  function pause() {
    getMusicEngine()?.pause();
    setPlaying(false);
  }
  function stop() {
    getMusicEngine()?.stop();
    setPlaying(false);
  }
  function loadTrack(i: number) {
    const engine = getMusicEngine();
    if (!engine) return;
    const next = (i + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setIndex(next);
    engine.load(MUSIC_TRACKS[next]);
    setLen(engine.lengthSec);
    if (engine.playing) setPlaying(true);
  }
  function onVolume(v: number) {
    setVolume(v);
    getMusicEngine()?.setVolume(v);
  }
  function onSeek(v: number) {
    getMusicEngine()?.seek(v);
    setCur(v);
  }

  const track = MUSIC_TRACKS[index];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg,#1b3a5e 0%,#0a1828 100%)",
        color: "#cfe8ff",
      }}
    >
      {/* Visualizer */}
      <div style={{ padding: 10 }}>
        <canvas
          ref={canvasRef}
          width={420}
          height={140}
          style={{ width: "100%", height: 140, borderRadius: 4, border: "1px solid #0c2d4a", display: "block" }}
        />
      </div>

      {/* Now playing */}
      <div style={{ padding: "0 14px" }}>
        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{track.namn}</div>
        <div style={{ color: "#7fb0dd" }}>{track.artist}</div>
      </div>

      {/* Seek */}
      <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, width: 32 }}>{fmt(cur)}</span>
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(len))}
          value={Math.floor(cur)}
          onChange={(e) => onSeek(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 10, width: 32, textAlign: "right" }}>{fmt(len)}</span>
      </div>

      {/* Transport */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "4px 0 10px" }}>
        <button className="xp-btn" style={{ minWidth: 40 }} onClick={() => loadTrack(index - 1)} title="Previous">
          ⏮
        </button>
        {playing ? (
          <button className="xp-btn" style={{ minWidth: 54 }} onClick={pause} title="Pause">
            ⏸
          </button>
        ) : (
          <button className="xp-btn" style={{ minWidth: 54 }} onClick={play} title="Play">
            ▶
          </button>
        )}
        <button className="xp-btn" style={{ minWidth: 40 }} onClick={stop} title="Stop">
          ⏹
        </button>
        <button className="xp-btn" style={{ minWidth: 40 }} onClick={() => loadTrack(index + 1)} title="Next">
          ⏭
        </button>
        <span style={{ marginLeft: 10, fontSize: 11 }}>🔊</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => onVolume(Number(e.target.value) / 100)}
          style={{ width: 80 }}
        />
      </div>

      {/* Playlist */}
      <div className="xp-scroll" style={{ flex: 1, overflow: "auto", margin: "0 10px 10px", background: "rgba(0,0,0,0.25)", borderRadius: 4 }}>
        <div style={{ padding: "5px 10px", fontWeight: "bold", color: "#9fd0ff", borderBottom: "1px solid #1c456e" }}>
          Playlist
        </div>
        {MUSIC_TRACKS.map((t, i) => (
          <div
            key={t.id}
            onClick={() => loadTrack(i)}
            onDoubleClick={() => {
              loadTrack(i);
              play();
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 10px",
              cursor: "pointer",
              background: i === index ? "rgba(0,160,255,0.3)" : "transparent",
            }}
          >
            <span>
              {i === index && playing ? "▶ " : ""}
              {t.namn} <span style={{ color: "#7fb0dd" }}>– {t.artist}</span>
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: "4px 12px", fontSize: 10, color: "#6f9cc4" }}>
        Synthesized demo tracks (Web Audio). Drop your own MP3s in <code>/public/assets/music/</code>.
      </div>
    </div>
  );
}
