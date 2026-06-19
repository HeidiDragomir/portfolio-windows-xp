"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { icon } from "@/lib/icons";

export default function ContactMe() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function send() {
    const subj = subject.trim() || "Hello from your portfolio";
    const lines = [body, "", from ? `From: ${from}` : ""].filter(Boolean).join("\n");
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subj
    )}&body=${encodeURIComponent(lines)}`;
    window.location.href = href;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3.5 px-2.5 py-1.5 border-b border-[#b9b59f] bg-[linear-gradient(180deg,#fbfbf6_0%,#e9e6d6_100%)]"
      >
        <button
          className="xp-btn flex items-center gap-1.5 min-w-22.5"
          onClick={send}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("OE Create Mail.png")} alt="" width={20} height={20} draggable={false} />
          Send
        </button>
        <span className="text-[#666]">New Message</span>
      </div>

      {/* Fields */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <Row label="To:">
          <div className="xp-input flex-1 bg-[#f3f1e7]">
            {profile.name} &lt;{profile.email}&gt;
          </div>
        </Row>
        <Row label="From:">
          <input
            className="xp-input flex-1"
            placeholder="you@email.com"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Row>
        <Row label="Subject:">
          <input
            className="xp-input flex-1"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Row>
      </div>

      <textarea
        className="xp-input xp-scroll selectable flex-1 mx-2.5 mb-2.5 resize-none leading-normal"
        placeholder="Write your message here…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* Contact details footer */}
      <div className="selectable px-3 py-2 bg-[#ece9d8] border-t border-[#b9b59f] flex flex-wrap gap-4">
        <span>✉️ {profile.email}</span>
        <span>📞 {profile.phone}</span>
        <span>📍 {profile.location}</span>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 text-[#333]">{label}</span>
      {children}
    </div>
  );
}
