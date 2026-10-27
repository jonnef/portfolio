import React from "react";

// Gemeinsame Bausteine für Impressum und Datenschutzerklärung

export const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <article lang="de" className="max-w-2xl py-16">
    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
    <div className="mt-8 space-y-10 text-zinc-700 dark:text-zinc-300">{children}</div>
  </article>
);

export const LegalSection = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
    {children}
  </section>
);

// Markiert fehlende Pflichtangaben deutlich, damit sie vor dem Livegang auffallen
export const Missing = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
    {children}
  </span>
);
