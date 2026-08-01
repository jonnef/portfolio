"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about-contact", label: "About/Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-zinc-800 sticky top-0 z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-lg">Kenneth Bolland</div>
        {/* Desktop-Links: erst ab md sichtbar */}
        <ul className="hidden md:flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-zinc-300 hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <div>
              <button className="text-zinc-300 hover:text-white" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
              </button>
            </div>
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
        <ul className="md:hidden mt-4 space-y-2 px-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block text-zinc-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;