import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";

export const metadata: Metadata = {
  title: "About & Contact",
};

type Entry = { title: string; org: string; period: string; description?: string };

const Timeline = ({ heading, entries }: { heading: string; entries: Entry[] }) => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
    <ol className="mt-6 space-y-6 border-l border-zinc-200 dark:border-zinc-800">
      {entries.map((entry) => (
        <li key={entry.title + entry.period} className="relative pl-6">
          <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent dark:bg-emerald-400" />
          <p className="font-mono text-xs text-zinc-500">{entry.period}</p>
          <h3 className="mt-1 font-semibold">{entry.title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{entry.org}</p>
          {entry.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{entry.description}</p>
          )}
        </li>
      ))}
    </ol>
  </div>
);

const contacts = [
  { label: "LinkedIn", description: "Connect with me", href: site.links.linkedin },
  { label: "GitHub", description: "See my code", href: site.links.github },
];

export default function AboutContactPage() {
  return (
    <>
      <section className="py-16">
        <h1 className="text-4xl font-bold tracking-tight">About me</h1>
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-zinc-600 dark:text-zinc-400">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">Skills &amp; tools</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {site.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-zinc-200 px-3 py-1 font-mono text-sm dark:border-zinc-800"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-12 pb-20 md:grid-cols-2">
        <Timeline heading="Experience" entries={site.experience} />
        <Timeline heading="Education" entries={site.education} />
      </section>

      <section id="contact" className="pb-20">
        <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
        <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
          Interested in working together or just want to say hi? Reach out on one of these channels.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 hover:border-accent dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <p className="font-semibold">{contact.label}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{contact.description}</p>
              </div>
              <ArrowUpRight className="text-zinc-400 group-hover:text-accent dark:group-hover:text-emerald-400" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
