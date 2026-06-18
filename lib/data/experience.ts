export interface Experience {
  roll: string;
  foretag: string;
  ort: string;
  period: string;
  beskrivning: string;
  punkter: string[];
  teknikstack: string[];
}

export const experience: Experience[] = [
  {
    roll: "Fullstack Developer .NET – Internship",
    foretag: "Advacy",
    ort: "Jönköping",
    period: "Nov 2025 – Jun 2026",
    beskrivning:
      "Part of an agile development team, contributing to two client projects built on a microservices architecture.",
    punkter: [
      "Further developed an internal planning system built on a microservices architecture in a client project.",
      "Built APIs in ASP.NET Core and integrated backend solutions with an Angular-based frontend.",
      "Structured and extended databases in SQL Server using EF Core and T-SQL.",
      "Implemented filtering, grouping and calendar handling in business-critical systems.",
      "Took active part in pair programming, code reviews and technical discussions in an agile team.",
      "Worked with a focus on code quality, clear structure and solutions that are easy to maintain and extend.",
    ],
    teknikstack: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "MediatR",
      "CQRS",
      "MS SQL",
      "T-SQL",
      "Clean Architecture",
      "Microservices",
      "Angular",
      "Blazor",
      "JavaScript/TypeScript",
      "CSS/Tailwind",
      "Git",
      "Azure DevOps",
      "Agile/Scrum",
    ],
  },
  {
    roll: "Co-owner / Fullstack Developer",
    foretag: "Bidstacker",
    ort: "Remote",
    period: "Jul 2023 – Present",
    beskrivning:
      "Drove product development and system maintenance in a fast-paced startup with broad responsibility.",
    punkter: [
      "Developed and extended features in Next.js and Node.js/Express for a live web platform.",
      "Implemented the Two payment solution and improved payment flows for better stability and a clearer user experience.",
      "Designed and built backend APIs integrating the frontend, the database and external services.",
      "Improved state management and data handling by introducing Zustand and React Query.",
      "Built form validation and messaging features with a focus on usability and structure.",
      "Worked continuously with Git-based workflows, code improvements and agile development alongside other developers.",
    ],
    teknikstack: [
      "React/Next.js",
      "JavaScript",
      "Node.js/Express",
      "MongoDB",
      "CSS/Tailwind",
      "Git",
      "GitHub",
      "DigitalOcean",
      "Agile/Scrum",
    ],
  },
  {
    roll: "Fullstack Developer – Internship",
    foretag: "Bidstacker",
    ort: "Stockholm",
    period: "Nov 2022 – Jun 2023",
    beskrivning:
      "Went from student to active contributor in a product team — building features in a living codebase while deepening my knowledge of the React ecosystem.",
    punkter: [
      "Developed and maintained features in existing systems with a focus on stability and continued development.",
      "Designed database schemas and backend logic for web-based solutions.",
      "Deepened my work with API development in Node.js and data handling in MongoDB.",
      "Worked in an agile environment with version control in Git and continuous delivery of new features.",
    ],
    teknikstack: [
      "React/Next.js",
      "JavaScript",
      "Node.js/Express",
      "MongoDB",
      "CSS/Tailwind",
      "Git",
      "DigitalOcean",
    ],
  },
  {
    roll: "Project Manager – Official Journal of the European Union",
    foretag: "DocEssensis SRL – TD department",
    ort: "Romania",
    period: "2015 – Feb 2019",
    beskrivning:
      "Led and coordinated deliveries with high demands on quality, structure and accuracy.",
    punkter: [
      "Planned and coordinated deliveries with high demands on quality, structure and accuracy.",
      "Ensured deadlines and quality requirements were met in complex, detail-driven workflows.",
      "Handled communication, prioritization and problem-solving across multiple stakeholders and workflows simultaneously.",
    ],
    teknikstack: ["Project management", "Quality assurance", "Stakeholder management"],
  },
];
