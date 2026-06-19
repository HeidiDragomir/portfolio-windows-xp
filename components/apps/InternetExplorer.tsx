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
      <span className="flex items-center gap-1 text-[#444] px-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon(src)} alt="" width={20} height={20} draggable={false} />
        {label}
      </span>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* menu */}
      <div className="flex gap-3 px-2 py-0.5 bg-[#ece9d8] border-b border-[#d6d2bd]">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      {/* toolbar */}
      <div
        className="flex items-center gap-2 px-2 py-1 border-b border-[#b9b59f] bg-[linear-gradient(180deg,#fbfbf6,#e9e6d6)]"
      >
        <ToolBtn src="Back.png" label="Back" />
        <ToolBtn src="Forward.png" label="Forward" />
        <ToolBtn src="IE Stop.png" label="Stop" />
        <ToolBtn src="IE Refresh.png" label="Refresh" />
        <ToolBtn src="IE Home.png" label="Home" />
      </div>
      {/* address bar */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#ece9d8] border-b border-[#d6d2bd]">
        <span className="text-[#555]">Address</span>
        <div className="xp-sunken flex-1 flex items-center pl-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("Internet Explorer 6.png")} alt="" width={16} height={16} draggable={false} />
          <input
            className="selectable flex-1 border-none outline-none px-1.5 py-0.75 font-(--xp-font) text-[12px]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onGo()}
          />
        </div>
        <button className="xp-btn min-w-12.5" onClick={onGo}>
          Go
        </button>
      </div>

      {/* page */}
      <div className="selectable xp-scroll flex-1 overflow-auto bg-white">
        <div
          className="text-white px-6 py-6.5 bg-[linear-gradient(180deg,#1f6ae0_0%,#0a52c8_100%)]"
        >
          <div className="text-[26px] font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,.4)]">
            heididragomir.dev
          </div>
          <div className="opacity-90">{profile.titel}</div>
        </div>

        <div className="p-6 leading-relaxed">
          <p className="mt-0">
            Welcome! This is {profile.namn}&apos;s home page. Use the links below to visit my
            profiles (they open in a new tab).
          </p>

          <div className="flex flex-wrap gap-3 my-4">
            {bookmarks.map((b) => (
              <button
                key={b.label}
                onClick={() => go(b.url)}
                className="xp-btn flex flex-col items-start min-w-50 p-2.5 text-left"
              >
                <strong className="text-[#0c327d]">🔗 {b.label}</strong>
                <span className="text-[#555]">{b.desc}</span>
              </button>
            ))}
          </div>

          <h3 className="text-[#1f3f8c] border-b border-[#ccd] pb-1">
            Latest projects
          </h3>
          <ul className="leading-[1.9]">
            {projects.map((p) => (
              <li key={p.id}>
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  {p.namn}
                </a>{" "}
                <span className="text-[#777]">– {p.kort}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
