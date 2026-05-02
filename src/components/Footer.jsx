import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-[#000000]/8 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-['Space_Grotesk'] text-lg font-bold text-[#000000] tracking-tight">
          RA<span className="text-[#000000]/25">.</span>
        </span>
        <p className="font-mono text-xs text-[#000000]/30 tracking-widest">
          Designed & Built by Raghavendra Arella
        </p>
        <div className="flex items-center gap-3 text-[#000000]/40">
          {[
            { href: 'https://github.com/Raghavendra0348', icon: <Github size={18} /> },
            { href: 'https://linkedin.com/in/arella-raghavendra', icon: <Linkedin size={18} /> },
            { href: 'mailto:arellaraghavendra@gmail.com', icon: <Mail size={18} /> },
          ].map(({ href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-[#000000]/12 flex items-center justify-center rounded-sm hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all duration-200">
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
