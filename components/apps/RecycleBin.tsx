"use client";

import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { icon } from "@/lib/icons";

/** Playful "discarded" items — technologies and habits left behind. */
const discarded = [
  { name: "jquery-spaghetti.js", typ: "JavaScript File", icon: "Generic Text Document.png" },
  { name: "internet-explorer-hacks.css", typ: "Style Sheet", icon: "CSS.png" },
  { name: "console.log everywhere.txt", typ: "Text Document", icon: "Generic Text Document.png" },
  { name: "works-on-my-machine.docx", typ: "Document", icon: "Wordpad.png" },
  { name: "magic-numbers.bat", typ: "Batch File", icon: "BAT.png" },
  { name: "TODO fix later.txt", typ: "Text Document", icon: "Generic Text Document.png" },
];

export default function RecycleBin() {
  return (
    <ExplorerShell
      address="Recycle Bin"
      statusLeft={`${discarded.length} items`}
      sidebar={
        <>
          <SidebarCard title="Recycle Bin Tasks">
            <div className="text-[#9aa]">Empty the Recycle Bin</div>
            <div className="text-[#9aa]">Restore all items</div>
          </SidebarCard>
          <SidebarCard title="Details">
            Things I&apos;ve left behind as a developer. None of this belongs in production! 😉
          </SidebarCard>
        </>
      }
    >
      <div className="font-bold text-[#33558c] mb-2.5">
        Deleted (bad) habits
      </div>
      <div
        className="grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(140px,1fr))]"
      >
        {discarded.map((d) => (
          <div
            key={d.name}
            className="flex flex-col items-center gap-1.5 p-2 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(d.icon)} alt="" width={40} height={40} draggable={false} className="opacity-85" />
            <span>{d.name}</span>
            <span className="text-[#888] text-[11px]">{d.typ}</span>
          </div>
        ))}
      </div>
    </ExplorerShell>
  );
}
