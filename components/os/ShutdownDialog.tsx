"use client";

import XpLogo from "./XpLogo";

interface Props {
  onStandBy: () => void;
  onTurnOff: () => void;
  onRestart: () => void;
  onCancel: () => void;
}

/** A CSS recreation of the Windows XP "Turn off computer" dialog. */
export default function ShutdownDialog({
  onStandBy,
  onTurnOff,
  onRestart,
  onCancel,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[300000] flex items-center justify-center bg-[linear-gradient(180deg,rgba(20,40,110,0.55),rgba(10,25,80,0.75))] backdrop-blur-[1px] font-[Tahoma,var(--xp-font)]"
    >
      <div
        className="w-[420px] rounded-md overflow-hidden [box-shadow:0_12px_40px_rgba(0,0,0,0.5)] border border-[#15347e]"
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 text-white bg-[linear-gradient(180deg,#5b9bf0_0%,#2f6fdc_45%,#1d5bd0_100%)]"
        >
          <span className="text-[17px] font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]">
            Turn off computer
          </span>
          <div className="opacity-[0.95]">
            <XpLogo scale={0.5} />
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-[linear-gradient(180deg,#e4ecf8_0%,#bcd0ee_100%)] px-[18px] pt-[26px] pb-[22px] flex justify-center gap-[30px]"
        >
          <PowerButton
            label="Stand By"
            symbol="☾"
            from="#ffcf6b"
            to="#e08a16"
            onClick={onStandBy}
          />
          <PowerButton
            label="Turn Off"
            symbol="⏻"
            from="#f47361"
            to="#c0291a"
            onClick={onTurnOff}
          />
          <PowerButton
            label="Restart"
            symbol="↻"
            from="#7fd06a"
            to="#3c8f3a"
            onClick={onRestart}
          />
        </div>

        {/* Footer */}
        <div
          className="flex justify-end items-center px-4 py-2.5 bg-[linear-gradient(180deg,#3f7fdc_0%,#1d5bd0_100%)]"
        >
          <button
            onClick={onCancel}
            className="min-w-[78px] px-3 py-1 font-[Tahoma,var(--xp-font)] text-[12px] rounded border border-[#0a3a8a] cursor-pointer text-[#15347e] bg-[linear-gradient(180deg,#ffffff_0%,#dbe6f6_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.6)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PowerButton({
  label,
  symbol,
  from,
  to,
  onClick,
}: {
  label: string;
  symbol: string;
  from: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-[7px] bg-transparent border-none cursor-pointer"
    >
      <span
        className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-[22px] font-bold [box-shadow:inset_0_1px_3px_rgba(255,255,255,0.7),inset_0_-3px_6px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
        style={{ background: `radial-gradient(circle at 36% 28%, ${from}, ${to})` }}
      >
        {symbol}
      </span>
      <span className="text-[12px] font-bold text-[#0a2a6a]">
        {label}
      </span>
    </button>
  );
}
