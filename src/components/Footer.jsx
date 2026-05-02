import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-black/8 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-['Space_Grotesk'] text-lg font-bold text-black/70 tracking-tight">
          RA<span className="text-black/20">.</span>
        </span>
        <p className="font-mono text-xs text-black/25 tracking-widest">
          Designed & Built by Raghavendra Arella
        </p>
        <div className="flex items-center gap-4 text-black/30">
          <a href="https://github.com/Raghavendra0348" target="_blank" rel="noopener noreferrer"
            className="hover:text-black transition-colors p-1.5 hover:bg-black/5 rounded-full">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/arella-raghavendra" target="_blank" rel="noopener noreferrer"
            className="hover:text-black transition-colors p-1.5 hover:bg-black/5 rounded-full">
            <Linkedin size={18} />
          </a>
          <a href="mailto:arellaraghavendra@gmail.com"
            className="hover:text-black transition-colors p-1.5 hover:bg-black/5 rounded-full">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
