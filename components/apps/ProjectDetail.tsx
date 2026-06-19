"use client";

import type { Project } from "@/lib/data/projects";
import { icon } from "@/lib/icons";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="selectable xp-scroll h-full overflow-auto p-0">
      {/* Header band */}
      <div
        className="flex gap-3.5 items-center p-3.5 border-b border-[#b6cdf0] bg-[linear-gradient(180deg,#eef4ff_0%,#cdddf8_100%)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon(project.ikon)} alt="" width={48} height={48} draggable={false} />
        <div>
          <div className="text-[15px] font-bold text-[#0c327d]">{project.namn}</div>
          <div className="text-[#456]">{project.kort}</div>
          <div className="text-[#888] text-[11px]">{project.ar}</div>
        </div>
      </div>

      <div className="p-3.5 leading-relaxed">
        <p className="mt-0">{project.beskrivning}</p>

        <div className="font-bold text-[#33558c] mt-3.5 mb-1.5">Highlights</div>
        <ul className="m-0 pl-4.5 leading-[1.7]">
          {project.punkter.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <div className="font-bold text-[#33558c] mt-3.5 mb-1.5">Tech stack</div>
        <div className="flex flex-wrap gap-1.25">
          {project.teknikstack.map((t) => (
            <span
              key={t}
              className="bg-[#dbe7fb] border border-[#b6cdf0] rounded-[3px] px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4.5">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <button className="xp-btn min-w-40">🔗 Open on GitHub</button>
          </a>
        </div>
      </div>
    </div>
  );
}
