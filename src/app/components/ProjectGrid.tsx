"use client";

import React, { useState } from "react";
import type { Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDialog from "./ProjectDialog";

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
  const [open, setOpen] = useState<{ project: Project; card: HTMLElement } | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onOpen={(card) => setOpen({ project, card })} />
        ))}
      </div>
      <ProjectDialog
        project={open?.project ?? null}
        origin={open?.card ?? null}
        onClosed={() => {
          // Fokus zurück auf die Karte, von der der Dialog geöffnet wurde
          open?.card.querySelector("button")?.focus();
          setOpen(null);
        }}
      />
    </>
  );
};

export default ProjectGrid;
