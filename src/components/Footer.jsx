import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 text-center bg-[#05060A] border-t border-[rgba(255,255,255,0.05)]">
      <div className="flex justify-center gap-6 mb-6 md:hidden">
        <a href="https://github.com/Raghavendra0348" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] hover:text-[#00F0FF] transition-colors p-2">
          <Github size={20} />
        </a>
        <a href="https://linkedin.com/in/arella-raghavendra" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] hover:text-[#00F0FF] transition-colors p-2">
          <Linkedin size={20} />
        </a>
        <a href="mailto:arellaraghavendra@gmail.com" className="text-[#8B949E] hover:text-[#00F0FF] transition-colors p-2">
          <Mail size={20} />
        </a>
      </div>
      <p className="font-mono text-sm text-[#8B949E] hover:text-[#00F0FF] transition-colors cursor-pointer max-w-max mx-auto">
        Designed & Built by Raghavendra Arella
      </p>
    </footer>
  );
}
