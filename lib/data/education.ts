export interface Education {
  program: string;
  school: string;
  location: string;
  period: string;
}

export const education: Education[] = [
  {
    program: "Web Developer .NET",
    school: "Jönköping University",
    location: "Jönköping",
    period: "2024 - Jun 2026",
  },
  {
    program: "Fullstack Web Developer",
    school: "Chas Academy",
    location: "Stockholm",
    period: "2021 - 2023",
  },
  {
    program: "Faculty of Geography",
    school: '"Babeș-Bolyai" University',
    location: "Romania",
    period: "1997 - 2001",
  },
];

export interface LanguageSkill {
  language: string;
  level: string;
}

export const languages: LanguageSkill[] = [
  { language: "Swedish", level: "Professional proficiency" },
  { language: "English", level: "Professional proficiency" },
  { language: "Romanian", level: "Native" },
];
