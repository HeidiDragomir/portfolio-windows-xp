export const profile = {
  namn: "Heidi Dragomir",
  titel: ".NET Systems Developer / Fullstack Developer",
  ort: "Nässjö, Jönköping, Sweden",
  email: "heididragomir@gmail.com",
  telefon: "+46 707 96 96 26",
  linkedin: "https://www.linkedin.com/in/heidi-dragomir/",
  github: "https://github.com/HeidiDragomir",
  githubReposUrl: "https://github.com/HeidiDragomir?tab=repositories",
  profil:
    "Systems developer with hands-on experience in backend development, API integrations and agile teamwork in client-facing projects. I have worked with microservices, containerization and CI/CD pipelines, and driven my own projects with a focus on stability, observability and maintainability. I thrive in environments where technology and business value go hand in hand, and I gladly take responsibility for the whole picture — from the database layer to the API surface.",
  oppenFor:
    "I am open to new and exciting opportunities across Sweden and am happy to relocate for the right challenge.",
} as const;

export type Profile = typeof profile;
