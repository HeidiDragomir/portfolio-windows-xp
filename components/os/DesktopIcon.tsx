"use client";

interface Props {
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export default function DesktopIcon({ icon, label, selected, onSelect, onOpen }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className="w-19.5 flex flex-col items-center gap-0.75 py-1 px-0.5 bg-transparent border border-dotted border-transparent cursor-default"
    >
      <span className="w-9 h-9 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          width={32}
          height={32}
          draggable={false}
          className={selected ? "filter-[drop-shadow(0_0_1px_#1f6ae0)]" : ""}
        />
      </span>
      <span
        className={`xp-icon-label text-white text-[12px] text-center leading-[1.15] px-0.75 py-px max-w-19 ${selected ? "bg-[#0b61c9] border border-dotted border-[#cfe0ff]" : "bg-transparent border border-solid border-transparent"}`}
      >
        {label}
      </span>
    </button>
  );
}
