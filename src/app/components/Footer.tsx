import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-zinc-300 mt-auto">
      <div className="w-full px-8 flex flex-col items-center justify-between gap-2 py-6 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Kenneth Bolland. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <a href="https://www.linkedin.com/in/kenneth-bolland-850478219" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          <span>|</span>
          <a href="https://github.com/kenneth-bolland" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer