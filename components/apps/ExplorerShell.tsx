"use client";

import type { ReactNode } from "react";

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

export function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <div className="xp-sidebar-card mb-2.5 overflow-hidden">
      <div
        className="px-2 py-0.75 font-bold text-[#0c327d] border-b border-[#b0c4ec] bg-[linear-gradient(180deg,#f0f4ff_0%,#c2d4f5_100%)]"
      >
        {title}
      </div>
      <div className="px-2 py-1.5 leading-relaxed">{children}</div>
    </div>
  );
}

interface ExplorerShellProps {
  /** Optional menu bar labels (purely decorative). */
  menu?: string[];
  /** Address-bar text. */
  address?: string;
  sidebar: ReactNode;
  children: ReactNode;
  statusLeft?: string;
}

export default function ExplorerShell({
  menu = ["File", "Edit", "View", "Favorites", "Tools", "Help"],
  address,
  sidebar,
  children,
  statusLeft,
}: ExplorerShellProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Menu bar */}
      <div className="flex gap-3 px-2 py-0.5 bg-[#ece9d8] border-b border-[#d6d2bd]">
        {menu.map((m) => (
          <span key={m} className="cursor-default">
            {m}
          </span>
        ))}
      </div>
      {/* Address bar */}
      {address !== undefined && (
        <div className="flex items-center gap-1.5 px-2 py-0.75 bg-[#ece9d8] border-b border-[#d6d2bd]">
          <span className="text-[#555]">Address</span>
          <div className="xp-sunken flex-1 px-1.5 py-0.5 flex items-center gap-1.5">
            {address}
          </div>
        </div>
      )}
      {/* Body */}
      <div className="flex flex-1 min-h-0">
        <div className="xp-sidebar xp-scroll w-45 shrink-0 p-2.5 overflow-auto">
          {sidebar}
        </div>
        <div className="xp-scroll flex-1 overflow-auto p-3.5">
          {children}
        </div>
      </div>
      {/* Status bar */}
      <div className="h-5 flex items-center px-2 text-[12px] bg-[#ece9d8] border-t border-[#d6d2bd] text-[#333]">
        {statusLeft}
      </div>
    </div>
  );
}
