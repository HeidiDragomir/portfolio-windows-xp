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
  name: string;
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
  // MP3 tracks — 2000s hits to match the era.
  { id: "kryptonite", name: "Kryptonite", artist: "3 Doors Down", filePath: "/assets/music/3 Doors Down - Kryptonite (Official Video).mp3" },
  { id: "yellow", name: "Yellow", artist: "Coldplay", filePath: "/assets/music/Coldplay - Yellow (Official Video).mp3" },
  { id: "holiday", name: "Holiday", artist: "Green Day", filePath: "/assets/music/Green Day - Holiday (Official Audio).mp3" },
  { id: "again", name: "Again", artist: "Lenny Kravitz", filePath: "/assets/music/Lenny Kravitz - Again (Official Music Video).mp3" },
  { id: "rollin", name: "Rollin'", artist: "Limp Bizkit", filePath: "/assets/music/Limp Bizkit - Rollin' (Air Raid Vehicle).mp3" },
  { id: "kids", name: "Kids", artist: "MGMT", filePath: "/assets/music/MGMT - Kids (Official HD Video).mp3" },
  { id: "mad-season", name: "Mad Season", artist: "Matchbox Twenty", filePath: "/assets/music/Matchbox Twenty - Mad Season (Official Video).mp3" },
  { id: "uprising", name: "Uprising", artist: "Muse", filePath: "/assets/music/Muse - Uprising [Official Video].mp3" },
  { id: "numb", name: "Numb", artist: "Linkin Park", filePath: "/assets/music/Numb (Official Music Video) [4K UPGRADE] Linkin Park.mp3" },
  { id: "hey-ya", name: "Hey Ya!", artist: "OutKast", filePath: "/assets/music/OutKast - Hey Ya! (Lyrics).mp3" },
  { id: "last-resort", name: "Last Resort", artist: "Papa Roach", filePath: "/assets/music/Papa Roach - Last Resort (Squeaky Clean Version) (Official Music Video).mp3" },
  { id: "californication", name: "Californication", artist: "Red Hot Chili Peppers", filePath: "/assets/music/Red Hot Chili Peppers - Californication (Official Music Video) [HD UPGRADE].mp3" },
  { id: "mr-brightside", name: "Mr. Brightside", artist: "The Killers", filePath: "/assets/music/The Killers - Mr. Brightside (Official Music Video).mp3" },
  { id: "beautiful-day", name: "Beautiful Day", artist: "U2", filePath: "/assets/music/U2 - Beautiful Day (Official Music Video).mp3" },
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
