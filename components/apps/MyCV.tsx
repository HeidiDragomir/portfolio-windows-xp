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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "6px 10px",
          background: "linear-gradient(180deg,#fbfbf6 0%,#e9e6d6 100%)",
          borderBottom: "1px solid #b9b59f",
        }}
      >
        <a href={cvPdf} target="_blank" rel="noopener noreferrer">
          <button className="xp-btn">📄 Open PDF</button>
        </a>
        <a href={cvPdf} download={fileName}>
          <button className="xp-btn">⬇️ Download</button>
        </a>

        {/* Language selector */}
        <div style={{ display: "flex", gap: 6, marginLeft: 12, borderLeft: "1px solid #999", paddingLeft: 12 }}>
          <button
            onClick={() => setLang("sv")}
            className="xp-btn"
            style={{
              opacity: lang === "sv" ? 1 : 0.6,
              fontWeight: lang === "sv" ? "bold" : "normal",
            }}
          >
            SV
          </button>
          <button
            onClick={() => setLang("en")}
            className="xp-btn"
            style={{
              opacity: lang === "en" ? 1 : 0.6,
              fontWeight: lang === "en" ? "bold" : "normal",
            }}
          >
            EN
          </button>
        </div>

        <span style={{ color: "#666", marginLeft: 8 }}>
          CV – {profile.namn} ({langLabel})
        </span>
      </div>

      {/* Embedded PDF */}
      <div style={{ flex: 1, background: "#525659", minHeight: 0 }}>
        <object data={cvPdf} type="application/pdf" width="100%" height="100%">
          <div
            className="selectable"
            style={{ padding: 24, color: "#fff", lineHeight: 1.6 }}
          >
            <p>
              The PDF preview could not be displayed in this browser.{" "}
              <a href={cvPdf} target="_blank" rel="noopener noreferrer" style={{ color: "#9fd0ff" }}>
                Open the CV in a new tab
              </a>{" "}
              or use the Download button above.
            </p>
            <p style={{ color: "#cdd" }}>
              (Make sure <code>public/assets/CV - SV.pdf</code> and <code>public/assets/CV - EN.pdf</code> exist.)
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
