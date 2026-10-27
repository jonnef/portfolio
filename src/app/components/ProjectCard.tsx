import Image from "next/image";
import type { Project } from "../data/projects";
import Tags from "./Tags";

type Props = {
  project: Project;
  onOpen?: (card: HTMLElement) => void;
};

const ProjectCard = ({ project, onOpen }: Props) => {
  const clickable = Boolean(project.details && onOpen);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border transition ${
        project.placeholder
          ? "border-dashed border-zinc-300 dark:border-zinc-700"
          : "border-zinc-200 bg-white hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
      } ${clickable ? "hover:-translate-y-0.5 hover:shadow-lg" : ""}`}
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
          {clickable ? (
            // after:inset-0 macht die ganze Karte klickbar, der Button bleibt für Tastatur/Screenreader erreichbar
            <button
              type="button"
              onClick={(e) => onOpen?.(e.currentTarget.closest("article")!)}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline"
            >
              {project.title}
            </button>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <div className="mt-4">
          <Tags tags={project.tags} />
        </div>
        {clickable && (
          <p className="mt-4 text-sm text-accent dark:text-emerald-400">
            More details <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </p>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
