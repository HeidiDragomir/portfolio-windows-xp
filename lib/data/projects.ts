export interface Project {
  id: string;
  name: string;
  /** Short one-liner shown in Explorer list. */
  short: string;
  description: string;
  year: string;
  techStack: string[];
  bullets: string[];
  github: string;
  /** Icon filename from the XP icon pack used for the "file". */
  icon: string;
}

export const projects: Project[] = [
  {
    id: "alert-management-api",
    name: "Alert Management API",
    short: "ASP.NET Core backend API focused on operability and observability.",
    year: "2026",
    description:
      "A backend API for managing emergency alerts across geographic areas. Users can create, publish and cancel alerts — with built-in safeguards preventing multiple active alerts in the same area at once. Built with a focus on operability, system monitoring and stable integration.",
    techStack: [
      "C#",
      ".NET 9",
      "ASP.NET Core",
      "PostgreSQL",
      "EF Core",
      "Docker",
      "SignalR",
      "Serilog",
      "Prometheus",
    ],
    bullets: [
      "REST API in ASP.NET Core with a clear layered structure and separated business logic.",
      "Self-validating domain entity enforcing state transitions (Draft → Published → Cancelled).",
      "Real-time communication with SignalR for event-based updates.",
      "Health checks, Prometheus-compatible metrics and structured JSON logging via Serilog (Grafana/Loki).",
      "Containerized with Docker Compose and automatic migrations on startup.",
      "Dual enforcement of area uniqueness: service-level validation + a partial database index.",
    ],
    github: "https://github.com/HeidiDragomir/alert-management-api",
    icon: "Alert.png",
  },
  {
    id: "ecommerce-microservices",
    name: "ECommerce.Microservices",
    short: "Microservices-based e-commerce in .NET 9 (thesis project).",
    year: "2026",
    description:
      "A bachelor's thesis project demonstrating microservices architecture in .NET 9. It implements an e-commerce system with three independent services (Customer, Product, Order) unified behind an API Gateway.",
    techStack: [
      "C#",
      ".NET 9",
      "Clean Architecture",
      "CQRS",
      "MediatR",
      "EF Core 9",
      "SQL Server",
      "Ocelot",
      "OpenAPI",
    ],
    bullets: [
      "Clean Architecture with Domain, Application, Infrastructure and Presentation layers.",
      "CQRS separating read and write operations through dedicated handlers.",
      "Repository pattern abstracting data access.",
      "Ocelot API Gateway as a single entry point routing to the services.",
      "Order validation that checks customer, product and stock before persistence.",
    ],
    github: "https://github.com/HeidiDragomir/ECommerce.Microservices",
    icon: "My Network Places.png",
  },
  {
    id: "innovia-hub-ai",
    name: "Innovia Hub AI",
    short: "Coworking booking platform with an AI-powered booking assistant.",
    year: "2025",
    description:
      "A resource-management platform for a coworking space where members can book desks, meeting rooms, VR headsets and an AI server in real time — with intelligent help from a smart booking assistant.",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ASP.NET Core",
      "MySQL",
      "SignalR",
      "JWT",
      "OpenAI API",
      "Azure",
      "Netlify",
    ],
    bullets: [
      "Real-time booking system with instant availability updates (SignalR).",
      "Smart booking assistant that analyzes booking patterns and suggests times/resources via OpenAI.",
      "Role-based access for members and administrators (JWT).",
      "IoT page for managing connected devices with real-time status monitoring.",
      "Cloud-based deployment with CI/CD: Azure App Service (backend) and Netlify (frontend).",
    ],
    github: "https://github.com/HeidiDragomir/innovia-hub-AI",
    icon: "Chip.png",
  },
  {
    id: "furever-friends",
    name: "FurEver Friends",
    short: "Web & mobile platform connecting pet owners.",
    year: "2025",
    description:
      "A platform connecting pet owners in a shared digital community. The app makes it easy to find pet services, meet like-minded people, discover local events, adopt animals and match with pet sitters.",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ASP.NET Core",
      "MySQL",
      "JWT",
      "Leaflet",
      "Nominatim",
    ],
    bullets: [
      "Location-based search for pet services with map integration (Leaflet + Nominatim).",
      "Community features and local events for animal lovers.",
      "Pet adoption and pet-sitter matching.",
      "RESTful API architecture with secure JWT authentication.",
    ],
    github: "https://github.com/HeidiDragomir/furever-friends",
    icon: "Search for people.png",
  },
];

export interface MoreRepo {
  name: string;
  language: string;
  url: string;
}

export const moreRepos: MoreRepo[] = [
  { name: "Stickify", language: "C#", url: "https://github.com/HeidiDragomir/Stickify" },
  {
    name: "loki-prometheus-grafana-kubernetes",
    language: "DevOps",
    url: "https://github.com/HeidiDragomir/loki-prometheus-grafana-kubernetes",
  },
  {
    name: "portfolio-windows-xp",
    language: "TypeScript",
    url: "https://github.com/HeidiDragomir/portfolio-windows-xp",
  },
  {
    name: "prescription-helper",
    language: "TypeScript",
    url: "https://github.com/HeidiDragomir/prescription-helper",
  },
];
