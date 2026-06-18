"use client";

import type { Project } from "@/lib/data/projects";
import { icon } from "@/lib/icons";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div
      className="selectable xp-scroll"
      style={{ height: "100%", overflow: "auto", padding: 0 }}
    >
      {/* Header band */}
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          padding: 14,
          background: "linear-gradient(180deg,#eef4ff 0%,#cdddf8 100%)",
          borderBottom: "1px solid #b6cdf0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon(project.ikon)} alt="" width={48} height={48} draggable={false} />
        <div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#0c327d" }}>
            {project.namn}
          </div>
          <div style={{ color: "#456" }}>{project.kort}</div>
          <div style={{ color: "#888", fontSize: 11 }}>{project.ar}</div>
        </div>
      </div>

      <div style={{ padding: 14, lineHeight: 1.6 }}>
        <p style={{ marginTop: 0 }}>{project.beskrivning}</p>

        <div style={{ fontWeight: "bold", color: "#33558c", margin: "14px 0 6px" }}>
          Highlights
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
          {project.punkter.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <div style={{ fontWeight: "bold", color: "#33558c", margin: "14px 0 6px" }}>
          Tech stack
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.teknikstack.map((t) => (
            <span
              key={t}
              style={{
                background: "#dbe7fb",
                border: "1px solid #b6cdf0",
                borderRadius: 3,
                padding: "2px 8px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <button className="xp-btn" style={{ minWidth: 160 }}>
              🔗 Open on GitHub
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
