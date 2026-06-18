"use client";

import { profile } from "@/lib/data/profile";
import { CV_PDF } from "@/lib/icons";

export default function MyCV() {
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
        <a href={CV_PDF} target="_blank" rel="noopener noreferrer">
          <button className="xp-btn">📄 Open PDF</button>
        </a>
        <a href={CV_PDF} download="Heidi-Dragomir-CV.pdf">
          <button className="xp-btn">⬇️ Download</button>
        </a>
        <span style={{ color: "#666", marginLeft: 6 }}>
          CV – {profile.namn} (in Swedish)
        </span>
      </div>

      {/* Embedded PDF (the CV is in Swedish, as in the original document) */}
      <div style={{ flex: 1, background: "#525659", minHeight: 0 }}>
        <object data={CV_PDF} type="application/pdf" width="100%" height="100%">
          <div
            className="selectable"
            style={{ padding: 24, color: "#fff", lineHeight: 1.6 }}
          >
            <p>
              The PDF preview could not be displayed in this browser.{" "}
              <a href={CV_PDF} target="_blank" rel="noopener noreferrer" style={{ color: "#9fd0ff" }}>
                Open the CV in a new tab
              </a>{" "}
              or use the Download button above.
            </p>
            <p style={{ color: "#cdd" }}>
              (Make sure <code>public/assets/CV.pdf</code> exists.)
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
