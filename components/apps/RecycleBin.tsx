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
            key={d.namn}
            className="flex flex-col items-center gap-1.5 p-2 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(d.ikon)} alt="" width={40} height={40} draggable={false} className="opacity-85" />
            <span>{d.namn}</span>
            <span className="text-[#888] text-[11px]">{d.typ}</span>
          </div>
        ))}
      </div>
    </ExplorerShell>
  );
}
