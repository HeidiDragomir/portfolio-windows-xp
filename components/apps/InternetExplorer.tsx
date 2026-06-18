"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { icon } from "@/lib/icons";

interface Bookmark {
  label: string;
  url: string;
  desc: string;
}

const bookmarks: Bookmark[] = [
  { label: "GitHub", url: profile.github, desc: "Source code and repositories" },
  { label: "LinkedIn", url: profile.linkedin, desc: "Profile and work experience" },
  { label: "All repositories", url: profile.githubReposUrl, desc: "Browse all projects" },
];

export default function InternetExplorer() {
  const [address, setAddress] = useState("https://www.heididragomir.dev/home");

  function go(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onGo() {
    let url = address.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    go(url);
  }

  function ToolBtn({ src, label }: { src: string; label: string }) {
    return (
      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#444", padding: "0 4px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon(src)} alt="" width={20} height={20} draggable={false} />
        {label}
      </span>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* menu */}
      <div style={{ display: "flex", gap: 12, padding: "2px 8px", background: "#ece9d8", borderBottom: "1px solid #d6d2bd" }}>
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      {/* toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", background: "linear-gradient(180deg,#fbfbf6,#e9e6d6)", borderBottom: "1px solid #b9b59f" }}>
        <ToolBtn src="Back.png" label="Back" />
        <ToolBtn src="Forward.png" label="Forward" />
        <ToolBtn src="IE Stop.png" label="Stop" />
        <ToolBtn src="IE Refresh.png" label="Refresh" />
        <ToolBtn src="IE Home.png" label="Home" />
      </div>
      {/* address bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "#ece9d8", borderBottom: "1px solid #d6d2bd" }}>
        <span style={{ color: "#555" }}>Address</span>
        <div className="xp-sunken" style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: 4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("Internet Explorer 6.png")} alt="" width={16} height={16} draggable={false} />
          <input
            className="selectable"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onGo()}
            style={{ flex: 1, border: "none", outline: "none", padding: "3px 6px", fontFamily: "var(--xp-font)", fontSize: 11 }}
          />
        </div>
        <button className="xp-btn" style={{ minWidth: 50 }} onClick={onGo}>
          Go
        </button>
      </div>

      {/* page */}
      <div className="selectable xp-scroll" style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <div
          style={{
            background: "linear-gradient(180deg,#1f6ae0 0%,#0a52c8 100%)",
            color: "#fff",
            padding: "26px 24px",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,.4)" }}>
            heididragomir.dev
          </div>
          <div style={{ opacity: 0.9 }}>{profile.titel}</div>
        </div>

        <div style={{ padding: 24, lineHeight: 1.6 }}>
          <p style={{ marginTop: 0 }}>
            Welcome! This is {profile.namn}&apos;s home page. Use the links below to visit my
            profiles (they open in a new tab).
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "16px 0" }}>
            {bookmarks.map((b) => (
              <button
                key={b.label}
                onClick={() => go(b.url)}
                className="xp-btn"
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 200, padding: 10, textAlign: "left" }}
              >
                <strong style={{ color: "#0c327d" }}>🔗 {b.label}</strong>
                <span style={{ color: "#555" }}>{b.desc}</span>
              </button>
            ))}
          </div>

          <h3 style={{ color: "#1f3f8c", borderBottom: "1px solid #ccd", paddingBottom: 4 }}>
            Latest projects
          </h3>
          <ul style={{ lineHeight: 1.9 }}>
            {projects.map((p) => (
              <li key={p.id}>
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  {p.namn}
                </a>{" "}
                <span style={{ color: "#777" }}>– {p.kort}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
