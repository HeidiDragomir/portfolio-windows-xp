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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "6px 10px",
          background: "linear-gradient(180deg,#fbfbf6 0%,#e9e6d6 100%)",
          borderBottom: "1px solid #b9b59f",
        }}
      >
        <button
          className="xp-btn"
          onClick={send}
          style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 90 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("OE Create Mail.png")} alt="" width={20} height={20} draggable={false} />
          Send
        </button>
        <span style={{ color: "#666" }}>New Message</span>
      </div>

      {/* Fields */}
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <Row label="To:">
          <div className="xp-input" style={{ flex: 1, background: "#f3f1e7" }}>
            {profile.namn} &lt;{profile.email}&gt;
          </div>
        </Row>
        <Row label="From:">
          <input
            className="xp-input"
            style={{ flex: 1 }}
            placeholder="you@email.com"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Row>
        <Row label="Subject:">
          <input
            className="xp-input"
            style={{ flex: 1 }}
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Row>
      </div>

      <textarea
        className="xp-input xp-scroll selectable"
        style={{ flex: 1, margin: "0 10px 10px", resize: "none", lineHeight: 1.5 }}
        placeholder="Write your message here…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* Contact details footer */}
      <div
        className="selectable"
        style={{
          padding: "8px 12px",
          background: "#ece9d8",
          borderTop: "1px solid #b9b59f",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>✉️ {profile.email}</span>
        <span>📞 {profile.telefon}</span>
        <span>📍 {profile.ort}</span>
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
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 48, color: "#333" }}>{label}</span>
      {children}
    </div>
  );
}
