"use client";

/* Self-contained Web Audio helpers — no external audio files required.
   Used for the startup chime, UI clicks, and the "My Music" player. */

let ctx: AudioContext | null = null;
let muted = false;
let volume = 0.7; // 0-1 range

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

export function setVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
}
export function getVolume() {
  return volume;
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
  filePath?: string; // MP3 file path, if present use real audio instead of synth
  bpm?: number;
  /** 0 = rest, otherwise MIDI note number. One value per 16th note. */
  melody?: number[];
  bass?: number[];
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
  // MP3 tracks
  { id: "two-princes", namn: "Two Princes", artist: "Spin Doctors", filePath: "/assets/music/Spin Doctors - Two Princes.mp3" },
  { id: "dreams", namn: "Dreams", artist: "The Cranberries", filePath: "/assets/music/The Cranberries - Dreams.mp3" },
  { id: "linger", namn: "Linger", artist: "The Cranberries", filePath: "/assets/music/The Cranberries - Linger.mp3" },
  { id: "loser", namn: "Loser", artist: "Beck", filePath: "/assets/music/Beck - Loser (Official Music Video).mp3" },
  { id: "freestyler", namn: "Freestyler", artist: "Bomfunk MC's", filePath: "/assets/music/Bomfunk MC's - Freestyler (Video Original Version).mp3" },
  { id: "hedonism", namn: "Hedonism", artist: "Skunk Anansie", filePath: "/assets/music/Skunk Anansie - Hedonism.mp3" },
  { id: "girls-and-boys", namn: "Girls and Boys", artist: "Blur", filePath: "/assets/music/Blur - Girls And Boys (Official Music Video).mp3" },
  { id: "song2", namn: "Song 2", artist: "Blur", filePath: "/assets/music/Blur - Song 2 (Official Music Video).mp3" },
  { id: "charmless-man", namn: "Charmless Man", artist: "Blur", filePath: "/assets/music/Blur - Charmless Man (Official Music Video).mp3" },
  { id: "big-in-japan", namn: "Big in Japan", artist: "Guano Apes", filePath: "/assets/music/Guano Apes - Big In Japan (Official Video).mp3" },
  { id: "lords-of-the-boards", namn: "Lords Of The Boards", artist: "Guano Apes", filePath: "/assets/music/Guano Apes - Lords Of The Boards (official video).mp3" },
  { id: "common-people", namn: "Common People", artist: "Pulp", filePath: "/assets/music/Pulp - Common People.mp3" },
  { id: "basket-case", namn: "Basket Case", artist: "Green Day", filePath: "/assets/music/Green Day - Basket Case [Official Music Video].mp3" },
  { id: "scar-tissue", namn: "Scar Tissue", artist: "Red Hot Chili Peppers", filePath: "/assets/music/Red Hot Chili Peppers - Scar Tissue [Official Music Video].mp3" },
  { id: "under-the-bridge", namn: "Under The Bridge", artist: "Red Hot Chili Peppers", filePath: "/assets/music/Red Hot Chili Peppers - Under The Bridge [Official Music Video].mp3" },
  { id: "ironic", namn: "Ironic", artist: "Alanis Morissette", filePath: "/assets/music/Alanis Morissette - Ironic (Official 4K Music Video).mp3" },
  { id: "mr-jones", namn: "Mr. Jones", artist: "Counting Crows", filePath: "/assets/music/Counting Crows - Mr. Jones (Official Music Video).mp3" },
  { id: "3am", namn: "3AM", artist: "Matchbox Twenty", filePath: "/assets/music/Matchbox Twenty - 3AM (Official Video).mp3" },
  { id: "friday", namn: "Friday I'm In Love", artist: "The Cure", filePath: "/assets/music/The Cure - Friday I'm In Love.mp3" },
  { id: "narcotic", namn: "Narcotic", artist: "Liquido", filePath: "/assets/music/Liquido - Narcotic (HD).mp3" },
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
  private audioEl: HTMLAudioElement | null = null;
  private rafRef: number | null = null;

  constructor(ac: AudioContext) {
    this.ac = ac;
    this.master = ac.createGain();
    this.master.gain.value = 0.18;
    this.analyser = ac.createAnalyser();
    this.analyser.fftSize = 64;
    this.master.connect(this.analyser);
    this.analyser.connect(ac.destination);
    this.track = MUSIC_TRACKS[0];
    if (!this.track.filePath) {
      this.computeStep();
    }
  }

  private computeStep() {
    this.secPerStep = 60 / (this.track.bpm || 120) / 4;
  }

  getAnalyser() {
    return this.analyser;
  }
  get lengthSec() {
    if (this.audioEl) return this.audioEl.duration || 0;
    return this.track.melody?.length || 0 * this.secPerStep;
  }
  get currentSec() {
    if (this.audioEl) return this.audioEl.currentTime || 0;
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

    if (track.filePath) {
      if (!this.audioEl) {
        this.audioEl = new Audio();
        this.audioEl.addEventListener("timeupdate", () => {
          this.onTick?.(this.audioEl?.currentTime || 0, this.audioEl?.duration || 0);
        });
        this.audioEl.addEventListener("ended", () => {
          this.playing = false;
        });
      }
      this.audioEl.src = track.filePath;
      this.audioEl.volume = 0.7;
    } else {
      this.audioEl = null;
      this.computeStep();
      this.step = 0;
    }

    if (wasPlaying) this.play();
  }

  setVolume(v: number) {
    const vol = Math.max(0, Math.min(1, v));
    if (this.audioEl) {
      this.audioEl.volume = vol;
    } else {
      this.master.gain.value = vol * 0.36;
    }
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
    if (!this.track.melody || !this.track.bass) return;
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
    this.playing = true;

    if (this.audioEl) {
      void this.audioEl.play();
    } else {
      if (this.ac.state === "suspended") void this.ac.resume();
      this.nextNoteTime = this.ac.currentTime + 0.05;
      this.timer = window.setInterval(this.scheduler, 25);
    }
  }

  pause() {
    this.playing = false;
    if (this.audioEl) {
      this.audioEl.pause();
    } else if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  stop() {
    this.pause();
    if (this.audioEl) {
      this.audioEl.currentTime = 0;
    } else {
      this.step = 0;
      this.onTick?.(0, this.lengthSec);
    }
  }

  seek(sec: number) {
    if (this.audioEl) {
      this.audioEl.currentTime = sec;
    } else {
      this.step = Math.max(
        0,
        Math.min((this.track.melody?.length || 1) - 1, Math.round(sec / this.secPerStep))
      );
      this.nextNoteTime = this.ac.currentTime + 0.02;
      this.onTick?.(this.currentSec, this.lengthSec);
    }
  }
}

let engine: MusicEngine | null = null;
export function getMusicEngine(): MusicEngine | null {
  const ac = getCtx();
  if (!ac) return null;
  if (!engine) engine = new MusicEngine(ac);
  return engine;
}
