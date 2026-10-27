"use client";

import Image from "next/image";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import Tags from "./Tags";

type Props = {
  project: Project | null;
  origin: HTMLElement | null; // die angeklickte Karte – Start- und Endpunkt der Animation
  onClosed: () => void;
};

const DURATION = 320;
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Transform, das den Dialog exakt auf die Position und Größe der Karte schrumpft
const transformFrom = (dialog: HTMLElement, card: HTMLElement) => {
  const d = dialog.getBoundingClientRect();
  const c = card.getBoundingClientRect();
  return `translate(${c.left - d.left}px, ${c.top - d.top}px) scale(${c.width / d.width}, ${c.height / d.height})`;
};

const ProjectDialog = ({ project, origin, onClosed }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.style.overflow = "hidden";
    if (origin && !reducedMotion()) {
      dialog.animate(
        [
          { transform: transformFrom(dialog, origin), transformOrigin: "top left", opacity: 0.6 },
          { transform: "none", transformOrigin: "top left", opacity: 1 },
        ],
        { duration: DURATION, easing: EASING },
      );
      dialog.animate({ opacity: [0, 1] }, { duration: DURATION, pseudoElement: "::backdrop" });
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project, origin]);

  const close = async () => {
    const dialog = dialogRef.current;
    if (!dialog || closing.current) return;
    closing.current = true;
    if (origin && !reducedMotion()) {
      dialog.animate({ opacity: [1, 0] }, { duration: DURATION * 0.8, pseudoElement: "::backdrop", fill: "forwards" });
      await dialog.animate(
        [
          { transform: "none", transformOrigin: "top left", opacity: 1 },
          { transform: transformFrom(dialog, origin), transformOrigin: "top left", opacity: 0 },
        ],
        { duration: DURATION * 0.8, easing: EASING, fill: "forwards" },
      ).finished;
    }
    dialog.close();
    dialog.getAnimations().forEach((a) => a.cancel());
    closing.current = false;
    onClosed();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onCancel={(e) => {
        // Escape: erst animieren, dann schließen
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        // Klick auf den abgedunkelten Hintergrund schließt den Dialog
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl border border-zinc-200 bg-white p-0 text-foreground shadow-2xl backdrop:bg-black/60 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {project && (
        <div>
          <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800/50">
            {project.image && (
              <Image
                src={project.image}
                alt={`Preview of ${project.title}`}
                fill
                sizes="(min-width: 672px) 672px, 100vw"
                loading="eager"
                className="object-cover object-top"
              />
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full bg-zinc-900/70 p-1.5 text-white hover:bg-zinc-900"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 id="project-dialog-title" className="text-2xl font-bold tracking-tight">
                {project.title}
              </h2>
              <div className="mt-3">
                <Tags tags={project.tags} />
              </div>
            </div>

            {project.details?.overview.map((paragraph) => (
              <p key={paragraph} className="text-zinc-600 dark:text-zinc-400">
                {paragraph}
              </p>
            ))}

            {project.details?.role && (
              <section>
                <h3 className="font-semibold">My role</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{project.details.role}</p>
              </section>
            )}

            {project.details?.highlights && (
              <section>
                <h3 className="font-semibold">Highlights</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
                  {project.details.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};

export default ProjectDialog;
