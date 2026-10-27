const Tags = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <li
        key={tag}
        className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default Tags;
