"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDialog from "./ProjectDialog";

type Props = {
  projects: Project[];
  // grid: Raster mit automatischem Zeilenumbruch, carousel: horizontale Slideshow
  layout?: "grid" | "carousel";
};

const ProjectGrid = ({ projects, layout = "grid" }: Props) => {
  const [open, setOpen] = useState<{ project: Project; card: HTMLElement } | null>(null);
  const cards = projects.map((project) => (
    <ProjectCard key={project.title} project={project} onOpen={(card) => setOpen({ project, card })} />
  ));

  return (
    <>
      {layout === "carousel" ? (
        <Carousel>{cards}</Carousel>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
      )}
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

const Carousel = ({ children }: { children: React.ReactNode[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ index: 0, positions: 1, canPrev: false, canNext: false });

  // Abstand von einer Karte zur nächsten (Kartenbreite + Lücke)
  const step = useCallback(() => {
    const track = trackRef.current;
    const [first, second] = track ? Array.from(track.children) : [];
    if (!first) return 0;
    return second
      ? (second as HTMLElement).offsetLeft - (first as HTMLElement).offsetLeft
      : (first as HTMLElement).offsetWidth;
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 1;
    // Anzahl möglicher Startpositionen: Karten minus gleichzeitig sichtbare + 1
    const visible = s ? Math.max(1, Math.round(track.clientWidth / s)) : 1;
    const positions = Math.max(1, track.children.length - visible + 1);
    setState({
      index: canNext && s ? Math.min(Math.round(track.scrollLeft / s), positions - 1) : positions - 1,
      positions,
      canPrev: track.scrollLeft > 1,
      canNext,
    });
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Der Observer meldet sich auch einmal direkt nach dem Start und setzt so den Anfangszustand
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  const scrollToIndex = (index: number) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollTo({ left: index * step(), behavior: reduced ? "auto" : "smooth" });
  };

  const scrollable = state.canPrev || state.canNext;
  const arrowClass =
    "rounded-full border border-zinc-300 p-2 transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 dark:border-zinc-700 dark:hover:text-emerald-400";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects">
      <div
        ref={trackRef}
        onScroll={update}
        // py/px-Puffer, damit Schatten und Hover-Anhebung der Karten nicht abgeschnitten werden
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-2 px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${children.length}`}
            className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>article]:w-full"
          >
            {child}
          </div>
        ))}
      </div>

      {scrollable && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToIndex(state.index - 1)}
            disabled={!state.canPrev}
            aria-label="Previous project"
            className={arrowClass}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: state.positions }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={i === state.index}
                className={`h-2 rounded-full transition-all ${
                  i === state.index ? "w-6 bg-accent dark:bg-emerald-400" : "w-2 bg-zinc-300 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(state.index + 1)}
            disabled={!state.canNext}
            aria-label="Next project"
            className={arrowClass}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
