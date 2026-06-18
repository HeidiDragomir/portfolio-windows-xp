"use client";

/* Self-contained Web Audio helpers — no external audio files required.
   Used for the startup chime, UI clicks, and the "My Music" player. */

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
}
export function isMuted() {
  return muted;
}

/** A short ascending "welcome" chime reminiscent of an OS startup sound. */
export function playStartupChime() {
  const ac = getCtx();
  if (!ac || muted) return;
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.0001;
  master.connect(ac.destination);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

  const notes = [
    { f: 523.25, t: 0.0 }, // C5
    { f: 783.99, t: 0.18 }, // G5
    { f: 659.25, t: 0.36 }, // E5
    { f: 1046.5, t: 0.54 }, // C6
  ];
  for (const n of notes) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = n.f;
    g.gain.setValueAtTime(0.0001, now + n.t);
    g.gain.exponentialRampToValueAtTime(0.5, now + n.t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + n.t + 1.6);
    osc.connect(g);
    g.connect(master);
    osc.start(now + n.t);
    osc.stop(now + n.t + 1.7);
  }
}

/** Tiny UI click. */
export function playClick() {
  const ac = getCtx();
  if (!ac || muted) return;
  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = 880;
  g.gain.setValueAtTime(0.06, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.07);
}

let startupAudio: HTMLAudioElement | null = null;

/** Play the real Windows XP startup sound (mp3 in /public/assets). */
export function playStartupSound() {
  if (typeof window === "undefined" || muted) return;
  try {
    if (!startupAudio) {
      startupAudio = new Audio("/assets/windows-xp-startup.mp3");
      startupAudio.volume = 0.7;
    }
    startupAudio.currentTime = 0;
    void startupAudio.play();
  } catch {
    /* ignore autoplay errors */
  }
}

/* ----------------------------------------------------------------------------
   Music engine: a small step sequencer that plays looping chiptune melodies.
   Tracks are monophonic melody + bass, encoded as MIDI note numbers per 16th.
---------------------------------------------------------------------------- */

export interface MusicTrack {
  id: string;
  namn: string;
  artist: string;
  bpm: number;
  /** 0 = rest, otherwise MIDI note number. One value per 16th note. */
  melody: number[];
  bass: number[];
}

function midiToFreq(m: number) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

// Helper to expand a compact pattern (note held for `len` 16ths).
function pat(seq: Array<[number, number]>): number[] {
  const out: number[] = [];
  for (const [note, len] of seq) for (let i = 0; i < len; i++) out.push(i === 0 ? note : 0);
  return out;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "bliss",
    namn: "Bliss",
    artist: "XP Synth",
    bpm: 92,
    melody: pat([
      [72, 4], [76, 4], [79, 4], [76, 4],
      [74, 4], [77, 4], [81, 4], [77, 4],
      [72, 4], [76, 4], [79, 4], [83, 4],
      [81, 8], [79, 8],
    ]),
    bass: pat([
      [48, 8], [53, 8],
      [50, 8], [55, 8],
      [48, 8], [55, 8],
      [45, 8], [47, 8],
    ]),
  },
  {
    id: "defrag",
    namn: "Defragmentering",
    artist: "XP Synth",
    bpm: 128,
    melody: pat([
      [69, 2], [72, 2], [76, 2], [72, 2], [69, 2], [72, 2], [76, 2], [79, 2],
      [77, 2], [74, 2], [71, 2], [74, 2], [77, 2], [81, 2], [79, 4],
      [69, 2], [72, 2], [76, 2], [72, 2], [69, 2], [72, 2], [76, 2], [79, 2],
      [81, 4], [79, 4], [76, 4], [72, 4],
    ]),
    bass: pat([
      [45, 4], [45, 4], [45, 4], [45, 4],
      [50, 4], [50, 4], [43, 4], [43, 4],
      [45, 4], [45, 4], [45, 4], [45, 4],
      [41, 4], [43, 4], [45, 8],
    ]),
  },
  {
    id: "dialup",
    namn: "Dial-up Dröm",
    artist: "XP Synth",
    bpm: 108,
    melody: pat([
      [64, 4], [67, 4], [71, 4], [74, 2], [71, 2],
      [67, 4], [64, 4], [62, 8],
      [64, 4], [67, 4], [72, 4], [71, 4],
      [69, 4], [67, 4], [64, 8],
    ]),
    bass: pat([
      [40, 8], [43, 8],
      [36, 8], [38, 8],
      [40, 8], [45, 8],
      [38, 8], [43, 8],
    ]),
  },
];

type TickCb = (currentSec: number, lengthSec: number) => void;

export class MusicEngine {
  private ac: AudioContext;
  private master: GainNode;
  private analyser: AnalyserNode;
  private track: MusicTrack;
  private step = 0;
  private nextNoteTime = 0;
  private timer: number | null = null;
  private secPerStep = 0.1;
  private onTick?: TickCb;
  playing = false;

  constructor(ac: AudioContext) {
    this.ac = ac;
    this.master = ac.createGain();
    this.master.gain.value = 0.18;
    this.analyser = ac.createAnalyser();
    this.analyser.fftSize = 64;
    this.master.connect(this.analyser);
    this.analyser.connect(ac.destination);
    this.track = MUSIC_TRACKS[0];
    this.computeStep();
  }

  private computeStep() {
    this.secPerStep = 60 / this.track.bpm / 4;
  }

  getAnalyser() {
    return this.analyser;
  }
  get lengthSec() {
    return this.track.melody.length * this.secPerStep;
  }
  get currentSec() {
    return this.step * this.secPerStep;
  }
  get currentTrack() {
    return this.track;
  }

  setTickCallback(cb: TickCb) {
    this.onTick = cb;
  }

  load(track: MusicTrack) {
    const wasPlaying = this.playing;
    this.stop();
    this.track = track;
    this.computeStep();
    this.step = 0;
    if (wasPlaying) this.play();
  }

  setVolume(v: number) {
    this.master.gain.value = Math.max(0, Math.min(1, v)) * 0.36;
  }

  private scheduleNote(midi: number, time: number, isBass: boolean) {
    if (!midi) return;
    const osc = this.ac.createOscillator();
    const g = this.ac.createGain();
    osc.type = isBass ? "triangle" : "square";
    osc.frequency.value = midiToFreq(midi);
    const len = this.secPerStep * (isBass ? 3.6 : 2.6);
    const peak = isBass ? 0.5 : 0.32;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(peak, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + len);
    osc.connect(g);
    g.connect(this.master);
    osc.start(time);
    osc.stop(time + len + 0.02);
  }

  private scheduler = () => {
    while (this.nextNoteTime < this.ac.currentTime + 0.12) {
      const i = this.step % this.track.melody.length;
      this.scheduleNote(this.track.melody[i], this.nextNoteTime, false);
      this.scheduleNote(this.track.bass[i % this.track.bass.length], this.nextNoteTime, true);
      this.nextNoteTime += this.secPerStep;
      this.step = (this.step + 1) % this.track.melody.length;
    }
    this.onTick?.(this.currentSec, this.lengthSec);
  };

  play() {
    if (this.playing) return;
    if (this.ac.state === "suspended") void this.ac.resume();
    this.playing = true;
    this.nextNoteTime = this.ac.currentTime + 0.05;
    this.timer = window.setInterval(this.scheduler, 25);
  }

  pause() {
    this.playing = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  stop() {
    this.pause();
    this.step = 0;
    this.onTick?.(0, this.lengthSec);
  }

  seek(sec: number) {
    this.step = Math.max(
      0,
      Math.min(this.track.melody.length - 1, Math.round(sec / this.secPerStep))
    );
    this.nextNoteTime = this.ac.currentTime + 0.02;
    this.onTick?.(this.currentSec, this.lengthSec);
  }
}

let engine: MusicEngine | null = null;
export function getMusicEngine(): MusicEngine | null {
  const ac = getCtx();
  if (!ac) return null;
  if (!engine) engine = new MusicEngine(ac);
  return engine;
}
