"use client";

import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { icon } from "@/lib/icons";

/** Playful "discarded" items — technologies and habits left behind. */
const discarded = [
  { namn: "jquery-spaghetti.js", typ: "JavaScript File", ikon: "Generic Text Document.png" },
  { namn: "internet-explorer-hacks.css", typ: "Style Sheet", ikon: "CSS.png" },
  { namn: "console.log everywhere.txt", typ: "Text Document", ikon: "Generic Text Document.png" },
  { namn: "works-on-my-machine.docx", typ: "Document", ikon: "Wordpad.png" },
  { namn: "magic-numbers.bat", typ: "Batch File", ikon: "BAT.png" },
  { namn: "TODO fix later.txt", typ: "Text Document", ikon: "Generic Text Document.png" },
];

export default function RecycleBin() {
  return (
    <ExplorerShell
      address="Recycle Bin"
      statusLeft={`${discarded.length} items`}
      sidebar={
        <>
          <SidebarCard title="Recycle Bin Tasks">
            <div style={{ color: "#9aa" }}>Empty the Recycle Bin</div>
            <div style={{ color: "#9aa" }}>Restore all items</div>
          </SidebarCard>
          <SidebarCard title="Details">
            Things I&apos;ve left behind as a developer. None of this belongs in production! 😉
          </SidebarCard>
        </>
      }
    >
      <div style={{ fontWeight: "bold", color: "#33558c", marginBottom: 10 }}>
        Deleted (bad) habits
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
        }}
      >
        {discarded.map((d) => (
          <div
            key={d.namn}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 8, textAlign: "center" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(d.ikon)} alt="" width={40} height={40} draggable={false} style={{ opacity: 0.85 }} />
            <span>{d.namn}</span>
            <span style={{ color: "#888", fontSize: 11 }}>{d.typ}</span>
          </div>
        ))}
      </div>
    </ExplorerShell>
  );
}
