import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-zinc-300 mt-auto">
      <div className="w-full px-8 flex flex-col items-center justify-between gap-2 py-6 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Kenneth Bolland. All rights reserved.</p>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/kenneth-bolland-850478219" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center gap-2 text-sm text-zinc-400 sm:text-base sm:text-zinc-300">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <span>|</span>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
