import { ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article
      className={`flex flex-col rounded-xl border p-6 transition-colors ${
        project.placeholder
          ? "border-dashed border-zinc-300 dark:border-zinc-700"
          : "border-zinc-200 bg-white hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
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
      {(project.repo || project.live) && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline dark:text-emerald-400">
              Code <ExternalLink size={14} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline dark:text-emerald-400">
              Live <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
