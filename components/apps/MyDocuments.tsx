"use client";

import { useState } from "react";
import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { experience } from "@/lib/data/experience";
import { education, languages } from "@/lib/data/education";
import { icon } from "@/lib/icons";

type Tab = "erfarenhet" | "utbildning";

export default function MyDocuments() {
  const [tab, setTab] = useState<Tab>("erfarenhet");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ExplorerShell
      address="My Documents"
      statusLeft={tab === "erfarenhet" ? `${experience.length} items` : `${education.length} items`}
      sidebar={
        <>
          <SidebarCard title="Folders">
            <div
              onClick={() => {
                setTab("erfarenhet");
                setOpen(0);
              }}
              style={{ cursor: "pointer", fontWeight: tab === "erfarenhet" ? "bold" : "normal" }}
            >
              📁 Work Experience
            </div>
            <div
              onClick={() => {
                setTab("utbildning");
                setOpen(null);
              }}
              style={{ cursor: "pointer", fontWeight: tab === "utbildning" ? "bold" : "normal" }}
            >
              📁 Education
            </div>
          </SidebarCard>
          <SidebarCard title="Languages">
            {languages.map((l) => (
              <div key={l.sprak}>
                <strong>{l.sprak}</strong> – {l.niva}
              </div>
            ))}
          </SidebarCard>
        </>
      }
    >
      {tab === "erfarenhet" && (
        <div className="selectable" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {experience.map((e, i) => (
            <div key={i} style={{ border: "1px solid #d6d2bd", background: "#fbfaf5" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: 8,
                  background: open === i ? "#e8effb" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon("Generic Text Document.png")} alt="" width={28} height={28} draggable={false} />
                <span style={{ flex: 1 }}>
                  <strong>{e.roll}</strong>
                  <br />
                  <span style={{ color: "#555" }}>
                    {e.foretag} · {e.ort}
                  </span>
                </span>
                <span style={{ color: "#33558c", whiteSpace: "nowrap" }}>{e.period}</span>
              </button>
              {open === i && (
                <div style={{ padding: "4px 12px 12px 48px" }}>
                  <p style={{ margin: "4px 0 8px", color: "#333" }}>{e.beskrivning}</p>
                  <ul style={{ margin: "0 0 10px", paddingLeft: 18, lineHeight: 1.6 }}>
                    {e.punkter.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {e.teknikstack.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          background: "#dbe7fb",
                          border: "1px solid #b6cdf0",
                          borderRadius: 3,
                          padding: "1px 6px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "utbildning" && (
        <div className="selectable" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {education.map((e, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, alignItems: "center", padding: 8, border: "1px solid #d6d2bd", background: "#fbfaf5" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon("Help and Support.png")} alt="" width={30} height={30} draggable={false} />
              <span style={{ flex: 1 }}>
                <strong>{e.utbildning}</strong>
                <br />
                <span style={{ color: "#555" }}>
                  {e.skola} · {e.ort}
                </span>
              </span>
              <span style={{ color: "#33558c", whiteSpace: "nowrap" }}>{e.period}</span>
            </div>
          ))}
        </div>
      )}
    </ExplorerShell>
  );
}
