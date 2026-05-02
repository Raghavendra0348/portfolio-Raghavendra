import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#8A2BE2] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-[#00F0FF] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[#00F0FF] mb-5 tracking-wide"
          >
            Hi, my name is
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
          >
            Raghavendra Arella.
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#8B949E] mb-6 leading-tight"
          >
            I build the digital future.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#8B949E] text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
          >
            I'm a Full Stack Developer & CS student at RGUKT. I specialize in building exceptional digital experiences, scaling robust backend APIs, and translating complex problems into elegant solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects" className="btn-primary px-8 py-4 rounded-sm font-mono text-sm tracking-widest uppercase">
              Check out my work
            </a>
            
            <div className="flex items-center gap-4 text-[#8B949E]">
              <a href="https://github.com/Raghavendra0348" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors p-2 hover:bg-[rgba(0,240,255,0.05)] rounded-full">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com/in/arella-raghavendra" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors p-2 hover:bg-[rgba(0,240,255,0.05)] rounded-full">
                <Linkedin size={22} />
              </a>
              <a href="mailto:arellaraghavendra@gmail.com" className="hover:text-[#00F0FF] transition-colors p-2 hover:bg-[rgba(0,240,255,0.05)] rounded-full">
                <Mail size={22} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden lg:block mx-auto w-full max-w-[450px]"
        >
          <div className="relative rounded-sm overflow-hidden border border-[#00F0FF]/30 aspect-[4/5] glow-box group">
            <div className="absolute inset-0 bg-[#00F0FF]/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src="/raghava1.jpeg" 
              alt="Raghavendra Arella" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="absolute -inset-4 border border-[#8A2BE2]/40 rounded-sm -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B949E]"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} className="text-[#00F0FF]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
