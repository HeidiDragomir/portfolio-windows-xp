export interface Education {
  utbildning: string;
  skola: string;
  ort: string;
  period: string;
}

export const education: Education[] = [
  {
    utbildning: "Web Developer .NET",
    skola: "Jönköping University",
    ort: "Jönköping",
    period: "2024 – Jun 2026",
  },
  {
    utbildning: "Fullstack Web Developer",
    skola: "Chas Academy",
    ort: "Stockholm",
    period: "2021 – 2023",
  },
  {
    utbildning: "Faculty of Geography",
    skola: '"Babeș-Bolyai" University',
    ort: "Romania",
    period: "1997 – 2001",
  },
];

export interface LanguageSkill {
  sprak: string;
  niva: string;
}

export const languages: LanguageSkill[] = [
  { sprak: "Swedish", niva: "full professional proficiency" },
  { sprak: "English", niva: "full professional proficiency" },
  { sprak: "Romanian", niva: "native" },
];
