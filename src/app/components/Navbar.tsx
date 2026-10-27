"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useState, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about-contact", label: "About/Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // resolvedTheme statt theme: bei "system" ist theme nicht "dark"/"light"
  const { resolvedTheme, setTheme } = useTheme();
  // false beim Server-Rendering, true im Browser – vermeidet Hydration-Mismatch beim Icon
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const linkClass = (href: string) =>
    pathname === href ? "text-white" : "text-zinc-400 hover:text-white";

  return (
    <nav className="bg-zinc-800 sticky top-0 z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg">Kenneth Bolland</Link>
        {/* Desktop-Links: erst ab md sichtbar */}
        <ul className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="flex text-zinc-300 hover:text-white"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Theme umschalten"
            >
              {mounted ? (resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <span className="size-5" />}
            </button>
          </li>
        </ul>

        {/* Burger: nur UNTER md sichtbar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-300 hover:text-white"
          aria-label="Menü umschalten"
          aria-expanded={isOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Aufklapp-Menü: nur wenn offen, nur unter md */}
      {isOpen && (
        <ul className="md:hidden space-y-3 px-8 pb-5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block ${linkClass(link.href)}`}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {mounted && (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              {mounted && (resolvedTheme === "dark" ? "Light mode" : "Dark mode")}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
