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
              className="text-[#0c327d] no-underline"
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
              className="text-[#0c327d] no-underline block"
            >
              GitHub Profile
            </a>
            <div>My Computer</div>
          </SidebarCard>
          <SidebarCard title="More repositories">
            {moreRepos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c327d] no-underline block"
              >
                {r.name} <span className="text-[#5a78b0]">({r.language})</span>
              </a>
            ))}
          </SidebarCard>
        </>
      }
    >
      <div className="text-[12px] font-bold text-[#33558c] mb-2.5">
        Featured projects
      </div>
      <div
        className="grid gap-3 max-w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))]"
      >
        {projects.map((p) => (
          <button
            key={p.id}
            onDoubleClick={() => open({ id: `project-${p.id}`, title: p.name, icon: icon(p.icon), width: 560, height: 480 })}
            onClick={(e) => {
              // single click selects (visual only); double-click opens
              (e.currentTarget as HTMLElement).focus();
            }}
            title="Double-click to open"
            className="flex flex-col items-center gap-1.5 p-2.5 border border-transparent bg-transparent cursor-pointer text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon(p.icon)} alt="" width={44} height={44} draggable={false} />
            <span className="font-bold">{p.name}</span>
            <span className="text-[#777] text-[11px]">{p.short}</span>
          </button>
        ))}
      </div>
      <p className="text-[#888] mt-4">
        Double-click a project to open it. More projects are available on{" "}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </ExplorerShell>
  );
}
