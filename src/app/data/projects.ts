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
    title: "Next project",
    description: "A short description of the project, the problem it solves and what I learned.",
    tags: ["Coming soon"],
    placeholder: true,
  },
  {
    title: "Another project",
    description: "A short description of the project, the problem it solves and what I learned.",
    tags: ["Coming soon"],
    placeholder: true,
  },
];
