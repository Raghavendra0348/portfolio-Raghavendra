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
      {/* ── Outer strip: top of page = flush, scrolled = floating with side padding ── */}
      <motion.div
        className="fixed left-0 right-0 z-40 flex justify-center pointer-events-none"
        animate={{
          top:          scrolled ? 16 : 0,
          paddingLeft:  scrolled ? 20 : 0,
          paddingRight: scrolled ? 20 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── The pill / bar itself ── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y:             0,
            opacity:       1,
            /* flat bar at top → rounded hanging pill on scroll */
            borderRadius:  scrolled ? 9999 : 0,
            paddingTop:    scrolled ? 10   : 16,
            paddingBottom: scrolled ? 10   : 16,
            paddingLeft:   scrolled ? 24   : 40,
            paddingRight:  scrolled ? 24   : 40,
            backgroundColor: scrolled
              ? 'rgba(255,255,255,0.88)'
              : 'rgba(255,255,255,0.97)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.07)'
              : '0 1px 0 rgba(0,0,0,0.09)',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          /* maxWidth via style + CSS transition — avoids "none" interpolation issue */
          style={{
            maxWidth:             scrolled ? 740 : '100%',
            width:                '100%',
            backdropFilter:       scrolled ? 'blur(18px)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
            border:               scrolled
              ? '1.5px solid rgba(0,0,0,0.08)'
              : '0px solid transparent',
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
