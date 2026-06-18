"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";

const DEFAULT_TEXT = `About me.txt
============================

${profile.namn}
${profile.titel}
${profile.ort}

----------------------------

${profile.profil}

${profile.oppenFor}

----------------------------

Contact:
  Email:    ${profile.email}
  Phone:    ${profile.telefon}
  LinkedIn: ${profile.linkedin}
  GitHub:   ${profile.github}

Tip: try the other icons on the desktop –
My Projects, My Computer and Minesweeper!
`;

export default function Notepad() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [wrap, setWrap] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "2px 8px",
          background: "#ece9d8",
          borderBottom: "1px solid #d6d2bd",
        }}
      >
        <span>File</span>
        <span>Edit</span>
        <span onClick={() => setWrap((w) => !w)} style={{ cursor: "pointer" }}>
          Format
        </span>
        <span>View</span>
        <span>Help</span>
      </div>
      <textarea
        className="selectable xp-scroll"
        spellCheck={false}
        value={text}
        onChange={(e) => setText(e.target.value)}
        wrap={wrap ? "soft" : "off"}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          resize: "none",
          padding: 6,
          fontFamily: "'Lucida Console', 'Courier New', monospace",
          fontSize: 12,
          lineHeight: 1.4,
          whiteSpace: wrap ? "pre-wrap" : "pre",
          color: "#000",
          background: "#fff",
        }}
      />
    </div>
  );
}
