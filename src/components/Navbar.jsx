import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-['Space_Grotesk'] text-xl font-bold text-black tracking-tight"
        >
          RA<span className="text-black/30">.</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="text-sm font-medium text-black/50 hover:text-black transition-colors font-mono"
            >
              <span className="text-black/25 mr-1 text-xs">0{i + 1}.</span>
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="btn-primary px-5 py-2 text-sm font-mono tracking-wide rounded-sm"
          >
            Resume
          </motion.a>
        </nav>

        <button className="md:hidden text-black p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-black/5 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-5">
              {navLinks.map((link, i) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-black/50 hover:text-black font-mono transition-colors">
                  <span className="text-black/25 mr-2 text-xs">0{i + 1}.</span>{link.name}
                </a>
              ))}
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-sm text-sm font-mono mt-2">
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
