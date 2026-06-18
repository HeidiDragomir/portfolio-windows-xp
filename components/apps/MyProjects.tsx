"use client";

import ExplorerShell, { SidebarCard } from "./ExplorerShell";
import { projects, moreRepos } from "@/lib/data/projects";
import { profile } from "@/lib/data/profile";
import { useWindows } from "@/components/os/WindowManagerProvider";
import { icon } from "@/lib/icons";

export default function MyProjects() {
  const { open } = useWindows();

  return (
    <ExplorerShell
      address="My Projects"
      statusLeft={`${projects.length} items`}
      sidebar={
        <>
          <SidebarCard title="File and Folder Tasks">
            <a
              href={profile.githubReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0c327d", textDecoration: "none" }}
            >
              Publish this folder to the web
            </a>
            <div>Share this folder</div>
          </SidebarCard>
          <SidebarCard title="Other Places">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0c327d", textDecoration: "none", display: "block" }}
            >
              GitHub Profile
            </a>
            <div>My Computer</div>
          </SidebarCard>
          <SidebarCard title="More repositories">
            {moreRepos.map((r) => (
              <a
                key={r.namn}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0c327d", textDecoration: "none", display: "block" }}
              >
                {r.namn} <span style={{ color: "#5a78b0" }}>({r.sprak})</span>
              </a>
            ))}
          </SidebarCard>
        </>
      }
    >
      <div style={{ fontSize: 12, fontWeight: "bold", color: "#33558c", marginBottom: 10 }}>
        Featured projects
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 8,
        }}
      >
        {projects.map((p) => (
          <button
            key={p.id}
            onDoubleClick={() => open({ id: `project-${p.id}`, title: p.namn, icon: icon(p.ikon), width: 560, height: 480 })}
            onClick={(e) => {
              // single click selects (visual only); double-click opens
              (e.currentTarget as HTMLElement).focus();
            }}
            title="Double-click to open"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: 10,
              border: "1px solid transparent",
              background: "transparent",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(p.ikon)} alt="" width={44} height={44} draggable={false} />
            <span style={{ fontWeight: "bold" }}>{p.namn}</span>
            <span style={{ color: "#777", fontSize: 10 }}>{p.kort}</span>
          </button>
        ))}
      </div>
      <p style={{ color: "#888", marginTop: 16 }}>
        Double-click a project to open it. More projects are available on{" "}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </ExplorerShell>
  );
}
