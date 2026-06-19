"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { CV_EN, CV_SV } from "@/lib/icons";

export default function MyCV() {
  const [lang, setLang] = useState<"sv" | "en">("sv");

  const cvPdf = lang === "sv" ? CV_SV : CV_EN;
  const langLabel = lang === "sv" ? "Swedish" : "English";
  const fileName = lang === "sv" ? "Heidi-Dragomir-CV-SV.pdf" : "Heidi-Dragomir-CV-EN.pdf";

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex gap-2 items-center px-2.5 py-1.5 border-b border-[#b9b59f] bg-[linear-gradient(180deg,#fbfbf6_0%,#e9e6d6_100%)]"
      >
        <a href={cvPdf} target="_blank" rel="noopener noreferrer">
          <button className="xp-btn">📄 Open PDF</button>
        </a>
        <a href={cvPdf} download={fileName}>
          <button className="xp-btn">⬇️ Download</button>
        </a>

        {/* Language selector */}
        <div className="flex gap-1.5 ml-3 border-l border-[#999] pl-3">
          <button
            onClick={() => setLang("sv")}
            className={`xp-btn ${lang === "sv" ? "opacity-100 font-bold" : "opacity-60 font-normal"}`}
          >
            SV
          </button>
          <button
            onClick={() => setLang("en")}
            className={`xp-btn ${lang === "en" ? "opacity-100 font-bold" : "opacity-60 font-normal"}`}
          >
            EN
          </button>
        </div>

        <span className="text-[#666] ml-2">
          CV – {profile.name} ({langLabel})
        </span>
      </div>

      {/* Embedded PDF */}
      <div className="flex-1 bg-[#525659] min-h-0">
        <object data={cvPdf} type="application/pdf" width="100%" height="100%">
          <div className="selectable p-6 text-white leading-relaxed">
            <p>
              The PDF preview could not be displayed in this browser.{" "}
              <a href={cvPdf} target="_blank" rel="noopener noreferrer" className="text-[#9fd0ff]">
                Open the CV in a new tab
              </a>{" "}
              or use the Download button above.
            </p>
            <p className="text-[#cdd]">
              (Make sure <code>public/assets/CV - SV.pdf</code> and <code>public/assets/CV - EN.pdf</code> exist.)
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
