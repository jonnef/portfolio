import type { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        A selection of things I&apos;ve built.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
