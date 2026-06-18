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
      style={{
        width: 78,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "4px 2px",
        background: "transparent",
        border: "1px dotted transparent",
        cursor: "default",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          width={32}
          height={32}
          draggable={false}
          style={{
            filter: selected ? "drop-shadow(0 0 1px #1f6ae0)" : "none",
            // tint the icon when selected
            opacity: 1,
          }}
        />
      </span>
      <span
        className="xp-icon-label"
        style={{
          color: "#fff",
          fontSize: 11,
          textAlign: "center",
          lineHeight: 1.15,
          padding: "1px 3px",
          background: selected ? "#0b61c9" : "transparent",
          border: selected ? "1px dotted #cfe0ff" : "1px solid transparent",
          maxWidth: 76,
        }}
      >
        {label}
      </span>
    </button>
  );
}
