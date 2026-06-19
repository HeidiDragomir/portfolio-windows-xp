"use client";

import { useState } from "react";
import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { skills } from "@/lib/data/skills";
import { profile } from "@/lib/data/profile";
import { icon } from "@/lib/icons";

export default function MyComputer() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = skills.find((s) => s.category === selected) ?? null;

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
                <strong>{current.category}</strong>
                <div className="text-[#33558c]">
                  {current.skills.length} skills
                </div>
              </>
            ) : (
              <>
                <strong>{profile.name}</strong>
                <div className="text-[#33558c]">{profile.title}</div>
              </>
            )}
          </SidebarCard>
        </>
      }
    >
      <div className="text-[12px] font-bold text-[#33558c] mb-2">
        Hard drives (skill areas)
      </div>
      <div className="grid gap-2.5 mb-4.5 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {skills.map((s) => (
          <button
            key={s.category}
            onClick={() => setSelected(s.category)}
            className={`flex gap-2 items-center p-1.5 cursor-pointer text-left${selected === s.category ? " border border-dotted border-[#33558c] bg-[#e8effb]" : " border border-transparent bg-transparent"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(s.icon)} alt="" width={34} height={34} draggable={false} />
            <span>
              <strong>{s.category}</strong>
              <br />
              <span className="text-[#666]">Local Disk ({s.drive})</span>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className="selectable border-t border-[#d6d2bd] pt-2.5">
          <div className="font-bold mb-1.5">
            Contents of {current.drive} – {current.category}
          </div>
          <ul className="m-0 pl-4.5 leading-[1.8] columns-2">
            {current.skills.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      {!current && (
        <div className="text-[#666]">
          Click a drive to see the skills within that area.
        </div>
      )}
    </ExplorerShell>
  );
}
