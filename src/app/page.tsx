import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";
import { site } from "./data/site";

export default function Home() {
  return (
    <>
      <section className="py-20 md:py-28">
        <p className="font-mono text-sm text-accent dark:text-emerald-400">Hi, my name is</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{site.name}</h1>
        <p className="mt-2 text-2xl font-semibold text-zinc-500 sm:text-4xl dark:text-zinc-400">{site.role}</p>
        <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">{site.tagline}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-text hover:opacity-90"
          >
            View projects <ArrowRight size={18} />
          </Link>
          <Link
            href="/about-contact"
            className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 font-medium hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline dark:text-emerald-400">
            All projects
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
