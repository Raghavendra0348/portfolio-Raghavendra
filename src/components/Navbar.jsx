import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About',      href: '#about'      },
  { name: 'Skills',     href: '#skills'     },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ─── Hanging pill navbar ─── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/8'
              : 'bg-white/80 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/6'
          }`}
          style={{ maxWidth: 720, width: '100%' }}
        >
          {/* Logo */}
          <a href="#" className="font-['Space_Grotesk'] text-base font-bold text-black tracking-tight shrink-0">
            RA<span className="text-black/25">.</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <a key={link.name} href={link.href}
                className="text-[13px] font-medium text-black/50 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 font-mono"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Resume CTA */}
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-[13px] font-mono font-medium tracking-wide hover:bg-black/80 transition-colors shrink-0"
          >
            Resume
          </a>

          {/* Mobile toggle */}
          <button className="md:hidden text-black p-1 rounded-full hover:bg-black/6"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.header>
      </div>

      {/* ─── Mobile dropdown ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-40 bg-white/95 backdrop-blur-xl border border-black/8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors px-4 py-3 rounded-xl font-mono"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-black/6 my-1" />
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono font-medium text-white bg-black hover:bg-black/80 transition-colors px-4 py-3 rounded-xl text-center"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
