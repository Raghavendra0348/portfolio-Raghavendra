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
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ── Outer strip: shifts top + padding smoothly ── */}
      <motion.div
        className="fixed left-0 right-0 z-40 flex justify-center pointer-events-none"
        animate={{
          top:          scrolled ? 0  : 20,
          paddingLeft:  scrolled ? 0  : 16,
          paddingRight: scrolled ? 0  : 16,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── The pill / bar itself ── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y:             0,
            opacity:       1,
            borderRadius:  scrolled ? 0     : 9999,
            paddingTop:    scrolled ? 16    : 10,
            paddingBottom: scrolled ? 16    : 10,
            paddingLeft:   scrolled ? 40    : 24,
            paddingRight:  scrolled ? 40    : 24,
            backgroundColor: scrolled
              ? 'rgba(255,255,255,0.97)'
              : 'rgba(255,255,255,0.82)',
            boxShadow: scrolled
              ? '0 1px 0 rgba(0,0,0,0.09)'
              : '0 4px 24px rgba(0,0,0,0.10)',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          /* maxWidth via style + CSS transition — avoids "none" interpolation issue */
          style={{
            maxWidth:             scrolled ? '100%' : 740,
            width:                '100%',
            backdropFilter:       'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border:               scrolled
              ? '0px solid transparent'
              : '1.5px solid rgba(0,0,0,0.08)',
            transition: 'max-width 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="pointer-events-auto flex items-center justify-between gap-6"
        >
          {/* Logo */}
          <a href="#"
            className="font-['Space_Grotesk'] text-base font-bold text-black tracking-tight shrink-0">
            RA<span className="text-black/25">.</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                className="text-[13px] font-medium text-black/50 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 font-mono">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Resume pill */}
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-[13px] font-mono font-medium tracking-wide hover:bg-black/75 transition-colors shrink-0">
            Resume
          </a>

          {/* Mobile toggle */}
          <button className="md:hidden text-black p-1 rounded-full hover:bg-black/6"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.header>
      </motion.div>

      {/* ── Mobile dropdown ── */}
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
                  className="text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors px-4 py-3 rounded-xl font-mono">
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-black/8 my-1" />
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono font-medium text-white bg-black hover:bg-black/80 transition-colors px-4 py-3 rounded-xl text-center">
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
