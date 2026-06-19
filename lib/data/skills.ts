export interface SkillGroup {
  category: string;
  /** Icon filename from the Windows XP icon pack, used as the "drive" icon. */
  icon: string;
  /** Fake drive letter for the My Computer metaphor. */
  drive: string;
  skills: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Backend",
    icon: "Local Disk.png",
    drive: "C:",
    skills: [
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
    category: "Architecture",
    icon: "Local Disk.png",
    drive: "D:",
    skills: [
      "Microservices",
      "Clean Architecture",
      "Distributed systems",
      "Domain Driven Design (DDD)",
      "N-tier (layered) architecture",
      "API Gateway (Ocelot)",
    ],
  },
  {
    category: "Databases",
    icon: "Local Disk.png",
    drive: "E:",
    skills: ["MS SQL", "T-SQL", "MongoDB", "MySQL", "SQLite", "PostgreSQL"],
  },
  {
    category: "Frontend",
    icon: "Local Disk.png",
    drive: "F:",
    skills: [
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
    category: "Cloud & DevOps",
    icon: "Network Drive.png",
    drive: "G:",
    skills: [
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
    category: "AI",
    icon: "Optical Drive.png",
    drive: "H:",
    skills: [
      "AI integrations via OpenAI API",
      "Claude Code",
      "Codex",
      "Copilot",
      "Gemini",
    ],
  },
  {
    category: "Other",
    icon: "Removable Media.png",
    drive: "I:",
    skills: [
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
