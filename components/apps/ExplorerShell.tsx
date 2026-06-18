"use client";

import type { ReactNode } from "react";

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

export function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <div className="xp-sidebar-card" style={{ marginBottom: 10, overflow: "hidden" }}>
      <div
        style={{
          background: "linear-gradient(180deg,#f0f4ff 0%,#c2d4f5 100%)",
          padding: "3px 8px",
          fontWeight: "bold",
          color: "#0c327d",
          borderBottom: "1px solid #b0c4ec",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "6px 8px", lineHeight: 1.6 }}>{children}</div>
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Menu bar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "2px 8px",
          background: "#ece9d8",
          borderBottom: "1px solid #d6d2bd",
        }}
      >
        {menu.map((m) => (
          <span key={m} style={{ cursor: "default" }}>
            {m}
          </span>
        ))}
      </div>
      {/* Address bar */}
      {address !== undefined && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 8px",
            background: "#ece9d8",
            borderBottom: "1px solid #d6d2bd",
          }}
        >
          <span style={{ color: "#555" }}>Address</span>
          <div
            className="xp-sunken"
            style={{
              flex: 1,
              padding: "2px 6px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {address}
          </div>
        </div>
      )}
      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div
          className="xp-sidebar xp-scroll"
          style={{ width: 180, flex: "0 0 180px", padding: 10, overflow: "auto" }}
        >
          {sidebar}
        </div>
        <div className="xp-scroll" style={{ flex: 1, overflow: "auto", padding: 14 }}>
          {children}
        </div>
      </div>
      {/* Status bar */}
      <div
        style={{
          height: 20,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          fontSize: 11,
          background: "#ece9d8",
          borderTop: "1px solid #d6d2bd",
          color: "#333",
        }}
      >
        {statusLeft}
      </div>
    </div>
  );
}
