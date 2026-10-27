export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string; // Vorschaubild unter public/, z. B. "/projects/portfolio.png"
  placeholder?: boolean;
  // Optional: Inhalte für die vergrößerte Ansicht. Ohne details ist die Karte nicht anklickbar.
  details?: {
    overview: string[];
    role?: string;
    highlights?: string[];
  };
};

export const projects: Project[] = [
  {
    title: "Shipping Label Service",
    description:
      "A backend service that fetches shipping labels, return labels and shipment information from multiple carriers through one REST API.",
    tags: ["Java", "Spring Boot", "Azure", "Kubernetes", "Terraform", "ZPL"],
    image: "/projects/shipping-label-service.png",
    // TODO: Entwurf – prüfen und ggf. in eigene Worte bringen
    details: {
      overview: [
        "A backend service that connects several shipping carriers to one platform. Client applications request shipping labels, return labels or shipment information through a single REST API – regardless of which carrier is behind it.",
        "The service runs on Kubernetes and uses Azure Cosmos DB and Blob Storage. When a return label is requested, it publishes a message to Azure Service Bus so that downstream systems can notify the customer or the carrier. The infrastructure is provisioned with Terraform.",
      ],
      role: "Software developer on the service, built at work for a large retailer. Besides the implementation, I contributed to its architectural design.",
      highlights: [
        "Built 300 dpi ZPL labels from scratch for a carrier that only provided 203 dpi – one national and one international layout – after scaling the existing graphics didn't deliver sufficient print quality",
        "Consistent error responses: a global exception handler returns the errors of all carriers in the same structure, so API consumers only have to handle one format",
        "Event-driven notifications for return labels via Azure Service Bus",
      ],
    },
  },
  {
    title: "Portfolio Website",
    description:
      "This site. Built with the Next.js App Router, a token-based Tailwind design system and light/dark mode.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude Code"],
    image: "/projects/portfolio.png",
    // TODO: Entwurf – in eigene Worte bringen
    details: {
      overview: [
        "My personal portfolio, where I present my background, my experience and the projects I work on.",
        "The site is fully static, has no tracking and is deployed on Vercel – every merge to main goes live automatically.",
      ],
      role: "I defined the structure, content and design direction and reviewed every change. The implementation was done together with Claude Code as a pair programmer.",
      highlights: [
        "Light and dark mode that follows the system setting, with a manual toggle",
        "Content kept in typed data files, so texts and projects can be updated without touching the layout",
        "Responsive layout with a mobile menu",
        "Project cards that expand into a detail view with an animation",
      ],
    },
  },
  // TODO: Platzhalter durch echte Projekte ersetzen
  {
    title: "Another project",
    description: "A short description of the project, the problem it solves and what I learned.",
    tags: ["Coming soon"],
    placeholder: true,
  },
];
