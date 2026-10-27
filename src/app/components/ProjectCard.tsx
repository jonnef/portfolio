import Image from "next/image";
import type { Project } from "../data/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border transition-colors ${
        project.placeholder
          ? "border-dashed border-zinc-300 dark:border-zinc-700"
          : "border-zinc-200 bg-white hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="relative aspect-[16/10] border-b border-inherit bg-zinc-100 dark:bg-zinc-800/50">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-zinc-400 dark:text-zinc-600">
            Preview coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`text-lg font-semibold ${project.placeholder ? "text-zinc-400 dark:text-zinc-500" : ""}`}>
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
