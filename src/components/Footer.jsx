import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-['Space_Grotesk'] text-lg font-bold text-white/80 tracking-tight">
          RA<span className="text-white/20">.</span>
        </span>
        <p className="font-mono text-xs text-white/20 tracking-widest">
          Designed & Built by Raghavendra Arella
        </p>
        <div className="flex items-center gap-4 text-white/30">
          <a href="https://github.com/Raghavendra0348" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/arella-raghavendra" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
            <Linkedin size={18} />
          </a>
          <a href="mailto:arellaraghavendra@gmail.com"
            className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
