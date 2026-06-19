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
              className={`cursor-pointer${tab === "erfarenhet" ? " font-bold" : ""}`}
            >
              📁 Work Experience
            </div>
            <div
              onClick={() => {
                setTab("utbildning");
                setOpen(null);
              }}
              className={`cursor-pointer${tab === "utbildning" ? " font-bold" : ""}`}
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
        <div className="selectable flex flex-col gap-2">
          {experience.map((e, i) => (
            <div key={i} className="border border-[#d6d2bd] bg-[#fbfaf5]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex gap-2.5 items-center p-2 border-none cursor-pointer text-left${open === i ? " bg-[#e8effb]" : " bg-transparent"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon("Generic Text Document.png")} alt="" width={28} height={28} draggable={false} />
                <span className="flex-1">
                  <strong>{e.roll}</strong>
                  <br />
                  <span className="text-[#555]">
                    {e.foretag} · {e.ort}
                  </span>
                </span>
                <span className="text-[#33558c] whitespace-nowrap">{e.period}</span>
              </button>
              {open === i && (
                <div className="pt-1 pr-3 pb-3 pl-12">
                  <p className="mt-1 mb-2 text-[#333]">{e.beskrivning}</p>
                  <ul className="mt-0 mb-2.5 pl-4.5 leading-[1.6]">
                    {e.punkter.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {e.teknikstack.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] bg-[#dbe7fb] border border-[#b6cdf0] rounded-[3px] px-1.5 py-px"
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
        <div className="selectable flex flex-col gap-2.5">
          {education.map((e, i) => (
            <div
              key={i}
              className="flex gap-2.5 items-center p-2 border border-[#d6d2bd] bg-[#fbfaf5]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon("Help and Support.png")} alt="" width={30} height={30} draggable={false} />
              <span className="flex-1">
                <strong>{e.utbildning}</strong>
                <br />
                <span className="text-[#555]">
                  {e.skola} · {e.ort}
                </span>
              </span>
              <span className="text-[#33558c] whitespace-nowrap">{e.period}</span>
            </div>
          ))}
        </div>
      )}
    </ExplorerShell>
  );
}
