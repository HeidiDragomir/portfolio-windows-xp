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
    <div className="flex flex-col h-full">
      <div className="flex gap-3 px-2 py-0.5 bg-[#ece9d8] border-b border-[#d6d2bd]">
        <span>File</span>
        <span>Edit</span>
        <span onClick={() => setWrap((w) => !w)} className="cursor-pointer">
          Format
        </span>
        <span>View</span>
        <span>Help</span>
      </div>
      <textarea
        className={`selectable xp-scroll flex-1 border-none outline-none resize-none p-1.5 font-mono text-[12px] leading-[1.4] text-black bg-white${wrap ? " whitespace-pre-wrap" : " whitespace-pre"}`}
        spellCheck={false}
        value={text}
        onChange={(e) => setText(e.target.value)}
        wrap={wrap ? "soft" : "off"}
      />
    </div>
  );
}
