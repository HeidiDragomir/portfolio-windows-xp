export interface SkillGroup {
  kategori: string;
  /** Icon filename from the Windows XP icon pack, used as the "drive" icon. */
  ikon: string;
  /** Fake drive letter for the My Computer metaphor. */
  enhet: string;
  fardigheter: string[];
}

export const skills: SkillGroup[] = [
  {
    kategori: "Backend",
    ikon: "Local Disk.png",
    enhet: "C:",
    fardigheter: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "Node.js/Express",
      "PHP",
      "Laravel",
      "REST API development",
      "EF Core",
      "MediatR",
      "CQRS",
    ],
  },
  {
    kategori: "Architecture",
    ikon: "Local Disk.png",
    enhet: "D:",
    fardigheter: [
      "Microservices",
      "Clean Architecture",
      "Distributed systems",
      "Domain Driven Design (DDD)",
      "N-tier (layered) architecture",
    ],
  },
  {
    kategori: "Databases",
    ikon: "Local Disk.png",
    enhet: "E:",
    fardigheter: ["MS SQL", "T-SQL", "MongoDB", "MySQL", "SQLite", "PostgreSQL"],
  },
  {
    kategori: "Frontend",
    ikon: "Local Disk.png",
    enhet: "F:",
    fardigheter: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Angular",
      "Blazor",
      "HTML",
      "CSS/SASS",
      "TailwindCSS",
    ],
  },
  {
    kategori: "Cloud & DevOps",
    ikon: "Network Drive.png",
    enhet: "G:",
    fardigheter: [
      "Azure (basic)",
      "Azure DevOps",
      "Docker",
      "Kubernetes (basic)",
      "CI/CD",
      "GitHub Actions",
      "Git",
      "Bash",
      "GitHub",
    ],
  },
  {
    kategori: "AI",
    ikon: "Optical Drive.png",
    enhet: "H:",
    fardigheter: [
      "AI integrations via OpenAI API",
      "Claude Code",
      "Codex",
      "Copilot",
      "Gemini",
    ],
  },
  {
    kategori: "Other",
    ikon: "Removable Media.png",
    enhet: "I:",
    fardigheter: [
      "Linux (basic)",
      "Bash",
      "Test-driven development (TDD)",
      "Unit testing",
      "SignalR/WebSocket",
      "Agile development",
      "Scrum",
      "Pair programming",
      "Code review",
    ],
  },
];
