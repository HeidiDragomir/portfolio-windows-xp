"use client";

import { useState } from "react";
import XpLogo from "./XpLogo";
import { profile } from "@/lib/data/profile";
import { AVATAR } from "@/lib/icons";
import { playStartupSound } from "@/lib/audio";

interface Props {
  onLogin: () => void;
  onRequestShutdown: () => void;
}

/** A CSS recreation of the Windows XP "Welcome" / log-on screen. */
export default function LoginScreen({ onLogin, onRequestShutdown }: Props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [hover, setHover] = useState(false);
  const tagline = "To begin the journey click on my username.";

  function logOn() {
    if (loggingIn) return;
    setLoggingIn(true);
    playStartupSound();
    window.setTimeout(onLogin, 1600);
  }

  return (
    <div className="fixed inset-0 z-[199999] flex flex-col text-white font-[Tahoma,var(--xp-font)] bg-[#2f5cba]">
      {/* Top band — deep blue with a glowing light-blue hairline */}
      <div
        className="h-[21%] border-b border-[#bcd6ff] bg-[linear-gradient(180deg,#1f4aa6_0%,#2f63c8_100%)] [box-shadow:0_1px_9px_1px_rgba(150,190,255,0.75)]"
      />

      {/* Middle field with a soft light glow */}
      <div
        className="flex-1 flex items-center justify-center px-5 bg-[radial-gradient(130%_120%_at_24%_28%,rgba(255,255,255,0.45)_0%,rgba(110,150,225,0)_46%),linear-gradient(180deg,#5786dd_0%,#4d7ad4_100%)]"
      >
        <div className="flex flex-col md:flex-row w-full sm:w-[88%] max-w-[860px] items-center gap-5 md:gap-0">
          {/* Title / branding — sits on top on mobile, left column on desktop */}
          <div className="order-1 md:flex-1 md:min-w-0 flex flex-col items-center md:items-end md:pr-[34px] text-center md:text-right">
            <div className="scale-90 sm:scale-100 origin-center">
              <XpLogo scale={1.6} />
            </div>
            <div className="hidden md:block mt-[26px] text-[15px] max-w-[300px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.35)]">
              {tagline}
            </div>
          </div>

          {/* Divider — horizontal between title and user on mobile, vertical on desktop */}
          <div
            className="order-2 h-0.5 w-[78%] max-w-[300px] md:w-0.5 md:h-[230px] md:max-w-none bg-[linear-gradient(90deg,transparent_0%,rgba(207,224,255,0.9)_50%,transparent_100%)] md:bg-[linear-gradient(180deg,transparent_0%,rgba(207,224,255,0.9)_50%,transparent_100%)] [box-shadow:0_0_8px_rgba(180,208,255,0.7)]"
          />

          {/* User list (photo + name) — sits under the title on mobile */}
          <div className="order-3 md:flex-1 md:min-w-0 md:pl-[34px] flex flex-col items-center md:items-start">
            {loggingIn ? (
              <div className="flex items-center gap-3.5">
                <Spinner />
                <span className="text-[18px]">Welcome</span>
              </div>
            ) : (
              <button
                onClick={logOn}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`flex items-center gap-3 border-none rounded-md cursor-pointer text-white pt-1.5 pr-2.5 pb-1.5 pl-1.5 text-left ${hover ? "bg-[rgba(255,255,255,0.16)]" : "bg-transparent"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={AVATAR}
                  alt={profile.name}
                  width={48}
                  height={48}
                  draggable={false}
                  className={`w-12 h-12 object-cover rounded-[5px] border-2 border-white bg-[#9db8e8] ${hover ? "[box-shadow:0_0_8px_rgba(255,255,255,0.7)]" : "[box-shadow:0_1px_3px_rgba(0,0,0,0.3)]"}`}
                />
                <span
                  className="text-[17px] font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,0.35)]"
                >
                  {profile.name}
                </span>
              </button>
            )}
            {/* tagline shown under the name on mobile */}
            <div className="md:hidden mt-4 text-[13px] text-center max-w-[280px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.35)]">
              {tagline}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom band — deep blue with a glowing amber hairline */}
      <div
        className="md:h-[19%] py-4 md:py-0 border-t border-[#f3b24a] flex flex-col md:flex-row gap-3 md:gap-0 justify-center md:justify-between items-center px-6 sm:px-[26px] bg-[linear-gradient(180deg,#2f63c8_0%,#1f4aa6_100%)] [box-shadow:0_-1px_9px_1px_rgba(243,170,70,0.6)]"
      >
        <button
          onClick={onRequestShutdown}
          className="flex items-center gap-[9px] bg-transparent border-none text-white cursor-pointer"
          title="Turn off computer"
        >
          <span
            className="w-7 h-7 rounded-[5px] flex items-center justify-center text-[15px] font-bold bg-[radial-gradient(circle_at_35%_30%,#f06a5a,#c0291a)] [box-shadow:inset_0_0_4px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.4)]"
          >
            ⏻
          </span>
          <span className="text-[13px] [text-shadow:1px_1px_1px_rgba(0,0,0,0.35)]">
            Turn off computer
          </span>
        </button>

        <div
          className="text-[13px] max-w-[450px] text-center md:text-right leading-normal opacity-[0.95] [text-shadow:1px_1px_1px_rgba(0,0,0,0.3)]"
        >
          After logging in, you can browse through the folders on my computer.
          <br />
          Every icon opens a window about me.
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div
      className="w-5 h-5 rounded-full border-[3px] border-[rgba(255,255,255,0.35)] border-t-white animate-spin"
    />
  );
}
