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
    title: "Label Service",
    description:
      "A backend service that provides shipping labels, return labels and shipment information from multiple carriers via one REST API.",
    tags: ["Java", "Spring Boot", "Azure", "Kubernetes", "Terraform", "ZPL"],
    image: "/projects/label-service.png",
    // TODO: Entwurf – prüfen und ggf. in eigene Worte bringen
    details: {
      overview: [
        "A backend service that connects several shipping carriers to one platform. Client applications request shipping labels, return labels or shipment information through a single REST API – regardless of which carrier is behind it.",
        "The service runs on Kubernetes and uses Azure Cosmos DB and Blob Storage. After a return label has been created successfully, the service publishes a message to Azure Service Bus that informs downstream systems about the return, including the necessary details such as the carrier's tracking data. The infrastructure is provisioned with Terraform.",
      ],
      role: "Software developer on the service, built at work for a large retailer. Besides the implementation, I contributed to its architectural design.",
      highlights: [
        "Built 300 dpi ZPL labels from scratch for a carrier that only provided 203 dpi – one national and one international layout – after scaling the existing graphics didn't deliver sufficient print quality",
        "Consistent error responses: a global exception handler returns the errors of all carriers in the same structure, so API consumers only have to handle one format",
        "After a return label has been created, a message with the return details and tracking data is published to Azure Service Bus for downstream systems",
      ],
    },
  },
  {
    title: "PUDO Service",
    description:
      "A REST service that provides parcel lockers and parcel shops from multiple carriers in one unified format for the online shop's checkout.",
    tags: ["Java", "Spring Boot", "Azure", "Kubernetes", "Terraform", "REST APIs"],
    image: "/projects/pudo-service.png",
    // TODO: Entwurf – prüfen und ggf. in eigene Worte bringen
    details: {
      overview: [
        "PUDO stands for pick-up and drop-off. The service provides parcel lockers and parcel shops to the online shop's checkout, so customers can choose where to pick up or drop off their parcel.",
        "The shop sends a request with the carrier, the country and an address or geo location. Based on carrier and country, the service calls the matching carrier API, processes the data and returns it in a unified response – including the type of location, opening hours, distance and coordinates. The service is stateless and stores no data. It runs on Kubernetes in Azure, and the infrastructure is provisioned with Terraform.",
      ],
      role: "Software developer in a team of four, built at work for a large retailer. I worked on the implementation, the API design and the integration of the carrier APIs, and contributed to the architectural design.",
      highlights: [
        "One unified response format for all carriers, although every carrier API returns its data in a different structure",
        "Address data split into separate fields, even when a carrier returns parts of it combined in a single field",
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
        "The site is fully static, has no tracking and is deployed on Cloudflare Pages – every merge to main goes live automatically.",
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
  {
    title: "Road Data Service",
    description:
      "A REST service that provides closures, roadworks, warnings and traffic jams for given geo points from the German Autobahn API – as input for route planning.",
    tags: ["Java", "Spring Boot", "REST APIs", "Autobahn API"],
    image: "/projects/road-data-service.png",
    // TODO: Entwurf – prüfen und ggf. in eigene Worte bringen
    details: {
      overview: [
        "The service provides a RESTful endpoint: based on the geo points in the request, it returns all relevant closures, roadworks, warnings, traffic jams and other events from the public Autobahn API of the German federal government.",
        "The results are meant to be used by route planning software, for example to plan an optimal and efficient route for field technicians. My part was building the service itself – integrating it into other systems wasn't part of the project.",
      ],
      role: "Designed and built the service on my own to complete my training as an IT specialist for application development.",
      highlights: [
        "Data evaluation: the raw data was partly duplicated and entries were hard to identify, so the service evaluates it and returns a clean result",
        "One request returns all relevant events for the requested geo points – closures, roadworks, warnings and traffic jams",
      ],
    },
  },
];
