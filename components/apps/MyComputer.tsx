"use client";

import { useState } from "react";
import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { skills } from "@/lib/data/skills";
import { profile } from "@/lib/data/profile";
import { icon } from "@/lib/icons";

export default function MyComputer() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = skills.find((s) => s.kategori === selected) ?? null;

  return (
    <ExplorerShell
      address="My Computer"
      statusLeft={`${skills.length} skill drives`}
      sidebar={
        <>
          <SidebarCard title="System Tasks">
            <div>View system information</div>
            <div>Add or remove programs</div>
          </SidebarCard>
          <SidebarCard title="Other Places">
            <div>My Documents</div>
            <div>Control Panel</div>
          </SidebarCard>
          <SidebarCard title="Details">
            {current ? (
              <>
                <strong>{current.kategori}</strong>
                <div style={{ color: "#33558c" }}>
                  {current.fardigheter.length} skills
                </div>
              </>
            ) : (
              <>
                <strong>{profile.namn}</strong>
                <div style={{ color: "#33558c" }}>{profile.titel}</div>
              </>
            )}
          </SidebarCard>
        </>
      }
    >
      <div style={{ fontSize: 12, fontWeight: "bold", color: "#33558c", marginBottom: 8 }}>
        Hard drives (skill areas)
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {skills.map((s) => (
          <button
            key={s.kategori}
            onClick={() => setSelected(s.kategori)}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: 6,
              border: selected === s.kategori ? "1px dotted #33558c" : "1px solid transparent",
              background: selected === s.kategori ? "#e8effb" : "transparent",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(s.ikon)} alt="" width={34} height={34} draggable={false} />
            <span>
              <strong>{s.kategori}</strong>
              <br />
              <span style={{ color: "#666" }}>Local Disk ({s.enhet})</span>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className="selectable" style={{ borderTop: "1px solid #d6d2bd", paddingTop: 10 }}>
          <div style={{ fontWeight: "bold", marginBottom: 6 }}>
            Contents of {current.enhet} – {current.kategori}
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, columns: 2 }}>
            {current.fardigheter.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      {!current && (
        <div style={{ color: "#666" }}>
          Click a drive to see the skills within that area.
        </div>
      )}
    </ExplorerShell>
  );
}
