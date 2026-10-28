"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const renderCard = (project: Project, clone = false) => (
    <ProjectCard project={project} focusable={!clone} onOpen={(card) => setOpen({ project, card })} />
  );

  return (
    <>
      {layout === "carousel" ? (
        <Carousel items={projects} renderItem={renderCard} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <React.Fragment key={project.title}>{renderCard(project)}</React.Fragment>
          ))}
        </div>
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

type CarouselProps = {
  items: Project[];
  renderItem: (item: Project, clone: boolean) => React.ReactNode;
};

// Endlos-Slideshow: Passen nicht alle Karten auf einmal hinein, liegt die Liste dreimal nebeneinander.
// Gescrollt wird im mittleren Satz; kommt das Scrollen in einem der äußeren Sätze zur Ruhe, springt
// die Position unsichtbar um einen Satz zurück. Mit der Maus lässt sich die Liste zusätzlich ziehen.
const Carousel = ({ items, renderItem }: CarouselProps) => {
  const n = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState(false);
  const [index, setIndex] = useState(0);
  const drag = useRef<{ startX: number; startLeft: number; lastX: number; lastT: number; v: number } | null>(
    null,
  );
  // true, sobald die Maus weit genug bewegt wurde; unterdrückt den Klick auf die Karte danach
  const dragged = useRef(false);
  // true, solange die Snap-Punkte für Ziehen und Ausrollen abgeschaltet sind
  const free = useRef(false);
  const touching = useRef(false);

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
    const s = step();
    if (!track || !s) return;
    const visible = Math.max(1, Math.round(track.clientWidth / s));
    setLoop(n > visible);
    setIndex((((Math.round(track.scrollLeft / s) % n) + n) % n));
  }, [n, step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Der Observer meldet sich auch einmal direkt nach dem Start und setzt so den Anfangszustand
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  // Beim Einschalten der Schleife mit der ersten Karte des mittleren Satzes beginnen
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = loop ? n * step() : 0;
  }, [loop, n, step]);

  // Nach dem Scrollen in den mittleren Satz zurückspringen (gleicher Inhalt, daher unsichtbar)
  const settle = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s || drag.current || touching.current) return;
    if (free.current) {
      free.current = false;
      track.style.scrollSnapType = "";
    }
    if (!loop) return;
    const set = n * s;
    if (track.scrollLeft < set - s / 2) track.scrollLeft += set;
    else if (track.scrollLeft >= 2 * set - s / 2) track.scrollLeft -= set;
    update();
  }, [loop, n, step, update]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Safari kennt "scrollend" noch nicht: dort zählt eine kurze Pause ohne Scroll-Ereignis
    const native = "onscrollend" in window;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 150);
    };
    const onTouchStart = () => (touching.current = true);
    const onTouchEnd = () => {
      touching.current = false;
      later();
    };
    track.addEventListener(native ? "scrollend" : "scroll", native ? settle : later);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("touchcancel", onTouchEnd);
    return () => {
      clearTimeout(timer);
      track.removeEventListener(native ? "scrollend" : "scroll", native ? settle : later);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [settle]);

  const scrollToPos = (pos: number) => {
    const track = trackRef.current;
    if (!track) return;
    const left = pos * step();
    if (Math.abs(left - track.scrollLeft) < 1) return settle();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  };

  const currentPos = () => Math.round((trackRef.current?.scrollLeft ?? 0) / (step() || 1));

  // Zu Karte i springen, und zwar zur nächstgelegenen ihrer drei Kopien
  const goTo = (i: number) => {
    const cur = currentPos();
    const base = cur - (((cur % n) + n) % n) + i;
    const target = [base - n, base, base + n].reduce((a, b) => (Math.abs(b - cur) < Math.abs(a - cur) ? b : a));
    scrollToPos(target);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!loop || e.pointerType !== "mouse" || e.button !== 0) return;
    const left = e.currentTarget.scrollLeft;
    dragged.current = false;
    drag.current = { startX: e.clientX, startLeft: left, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = e.currentTarget;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!dragged.current) {
      if (Math.abs(dx) < 5) return;
      // Erst ab hier ziehen, damit ein einfacher Klick die Karte weiterhin öffnet
      dragged.current = true;
      free.current = true;
      track.setPointerCapture(e.pointerId);
      track.style.scrollSnapType = "none";
      window.getSelection()?.removeAllRanges();
    }
    const set = n * step();
    let left = d.startLeft - dx;
    // Beim Ziehen über einen äußeren Satz hinaus direkt einen Satz zurückspringen
    if (left < set / 2) {
      left += set;
      d.startLeft += set;
    } else if (left > 2 * set) {
      left -= set;
      d.startLeft -= set;
    }
    track.scrollLeft = left;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !dragged.current) return;
    // Der Klick nach dem Loslassen folgt im selben Durchlauf, danach wieder normal klicken
    setTimeout(() => (dragged.current = false));
    // Schwung: wer schnell zieht, rollt eine Karte weiter (Geschwindigkeit in px/ms × 200 ms)
    const v = e.timeStamp - d.lastT > 80 ? 0 : d.v;
    scrollToPos(Math.round((e.currentTarget.scrollLeft - v * 200) / step()));
  };

  const arrowClass =
    "rounded-full border border-zinc-300 p-2 transition hover:border-accent hover:text-accent dark:border-zinc-700 dark:hover:text-emerald-400";
  const copies = loop ? [true, false, true] : [false];

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects">
      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (!dragged.current) return;
          e.preventDefault();
          e.stopPropagation();
        }}
        // py/px-Puffer, damit Schatten und Hover-Anhebung der Karten nicht abgeschnitten werden
        className={`-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-2 px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          loop ? "pointer-fine:cursor-grab pointer-fine:active:cursor-grabbing" : ""
        }`}
      >
        {copies.flatMap((clone, c) =>
          items.map((item, i) => (
            <div
              key={`${c}-${item.title}`}
              // Kopien sind für Screenreader und Tastatur unsichtbar, sichtbar und klickbar bleiben sie
              aria-hidden={clone || undefined}
              aria-roledescription={clone ? undefined : "slide"}
              aria-label={clone ? undefined : `${i + 1} of ${n}`}
              className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>article]:w-full"
            >
              {renderItem(item, clone)}
            </div>
          )),
        )}
      </div>

      {loop && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToPos(currentPos() - 1)}
            aria-label="Previous project"
            className={arrowClass}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent dark:bg-emerald-400" : "w-2 bg-zinc-300 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToPos(currentPos() + 1)}
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
