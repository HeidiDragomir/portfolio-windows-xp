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
      className="h-full flex flex-col text-[#cfe8ff] bg-[linear-gradient(180deg,#1b3a5e_0%,#0a1828_100%)]"
    >
      {/* Visualizer */}
      <div className="p-2.5">
        <canvas
          ref={canvasRef}
          width={420}
          height={140}
          className="w-full h-35 rounded block border border-[#0c2d4a]"
        />
      </div>

      {/* Now playing */}
      <div className="px-3.5">
        <div className="text-[15px] font-bold text-white">{track.name}</div>
        <div className="text-[#7fb0dd]">{track.artist}</div>
      </div>

      {/* Seek */}
      <div className="px-3.5 py-2.5 flex items-center gap-2">
        <span className="text-[11px] w-8">{fmt(cur)}</span>
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(len))}
          value={Math.floor(cur)}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-[11px] w-8 text-right">{fmt(len)}</span>
      </div>

      {/* Transport */}
      <div className="flex items-center justify-center gap-2 pt-1 pb-2.5">
        <button className="xp-btn min-w-10" onClick={() => loadTrack(index - 1)} title="Previous">⏮</button>
        {playing ? (
          <button className="xp-btn min-w-13.5" onClick={pause} title="Pause">⏸</button>
        ) : (
          <button className="xp-btn min-w-13.5" onClick={play} title="Play">▶</button>
        )}
        <button className="xp-btn min-w-10" onClick={stop} title="Stop">⏹</button>
        <button className="xp-btn min-w-10" onClick={() => loadTrack(index + 1)} title="Next">⏭</button>
        <span className="ml-2.5 text-[12px]">🔊</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => onVolume(Number(e.target.value) / 100)}
          className="w-20"
        />
      </div>

      {/* Playlist */}
      <div className="xp-scroll flex-1 overflow-auto mx-2.5 mb-2.5 bg-black/25 rounded">
        <div className="px-2.5 py-1.25 font-bold text-[#9fd0ff] border-b border-[#1c456e]">
          Playlist
        </div>
        {MUSIC_TRACKS.map((t, i) => (
          <div
            key={t.id}
            onClick={() => loadTrack(i)}
            onDoubleClick={() => { loadTrack(i); play(); }}
            className={`flex justify-between px-2.5 py-1.25 cursor-pointer ${i === index ? "bg-[rgba(0,160,255,0.3)]" : "bg-transparent"}`}
          >
            <span>
              {i === index && playing ? "▶ " : ""}
              {t.name} <span className="text-[#7fb0dd]">– {t.artist}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="px-3 py-1 text-[11px] text-[#6f9cc4]">
        90s hits playlist
      </div>
    </div>
  );
}
