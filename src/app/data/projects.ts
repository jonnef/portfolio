export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string; // Vorschaubild unter public/, z. B. "/projects/portfolio.png"
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "This site. Built with the Next.js App Router, a token-based Tailwind design system and light/dark mode.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude Code"],
    image: "/projects/portfolio.png",
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
