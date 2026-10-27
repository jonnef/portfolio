// Zentrale Inhalte der Seite (Entwurf auf Basis des LinkedIn-Profils).
export const site = {
  name: "Kenneth Bolland",
  role: "Java Backend Developer",
  tagline:
    "I build backend software for logistics and fulfillment at Deichmann – and I'm currently studying Applied Artificial Intelligence.",
  about: [
    "Hi, I'm Kenneth – a software developer from Duisburg, Germany. I work as a Java backend developer in the logistics and fulfillment team at Deichmann SE, where I started as a junior developer in 2023.",
    "I trained as an IT specialist for application development (Fachinformatiker für Anwendungsentwicklung) at Deutsche Telekom IT Solutions. Working closely with my team on real projects, I gained hands-on experience across the full stack – from frontend and backend to databases, testing and deployment. For my final project, I built a service that fetches traffic data from the German federal Autobahn API, intended to support route planning for field technicians.",
    "Since September 2026 I'm studying Applied Artificial Intelligence (B.Sc.) at FOM University of Applied Sciences.",
  ],
  // Gruppiert nach Bereich – neue Einträge einfach in die passende Gruppe
  skills: [
    {
      group: "Backend",
      items: ["Java", "Spring Boot", "Node.js", "REST APIs", "ZPL"],
    },
    {
      group: "Frontend",
      items: ["TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      group: "Databases",
      items: ["SQL", "PostgreSQL", "MongoDB", "Cosmos DB", "PL/SQL"],
    },
    {
      group: "Cloud & DevOps",
      items: ["Azure", "Blob Storage", "Service Bus", "Kubernetes", "Docker", "Terraform", "CI/CD pipelines"],
    },
    {
      group: "Testing",
      items: ["Test automation", "JUnit", "Selenium WebDriver", "Postman"],
    },
    {
      group: "Tools & collaboration",
      items: ["Git", "IntelliJ IDEA", "VS Code", "Jira", "Confluence", "Agile development"],
    },
  ],
  experience: [
    {
      title: "Software Developer",
      org: "Deichmann SE",
      period: "Sep 2025 – present",
      description: "Java backend development for logistics and fulfillment.",
    },
    {
      title: "Junior Software Developer",
      org: "Deichmann SE",
      period: "Aug 2023 – Sep 2025",
    },
    {
      title: "Apprentice – IT Specialist for Application Development",
      org: "Deutsche Telekom IT Solutions",
      period: "Sep 2020 – Jun 2023",
    },
  ],
  education: [
    {
      title: "B.Sc. Applied Artificial Intelligence",
      org: "FOM University of Applied Sciences",
      period: "Sep 2026 – Feb 2030",
    },
    {
      title: "Fachinformatiker für Anwendungsentwicklung",
      org: "Heinz-Nixdorf-Berufskolleg",
      period: "Aug 2020 – Jun 2023",
    },
    {
      title: "Abitur",
      org: "Gesamtschule Walsum",
      period: "2011 – 2020",
    },
  ],
  // Pflichtangaben für Impressum/Datenschutz – null = noch nicht eingetragen
  legal: {
    address: null as string[] | null, // z. B. ["Musterstraße 1", "47051 Duisburg"]
    email: null as string | null,
  },
  links: {
    linkedin: "https://www.linkedin.com/in/kenneth-bolland-850478219",
  },
};
