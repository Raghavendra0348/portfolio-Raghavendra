import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)'
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs text-white/40 mb-6 tracking-[0.2em] uppercase"
          >
            Hi, my name is
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-3 leading-[1.05] tracking-tight"
          >
            Raghavendra<br />Arella.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-white/40 mb-8 leading-snug tracking-tight"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/50 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light"
          >
            CS student at RGUKT building full-stack products — from pixel-perfect frontends
            to scalable backend APIs. Currently shipping a video-first e-commerce platform at Bloomer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a href="#projects" className="btn-primary px-7 py-3 rounded-sm font-mono text-sm tracking-wider uppercase">
              View Projects
            </a>
            <a href="#contact" className="btn-outline px-7 py-3 rounded-sm font-mono text-sm tracking-wider uppercase">
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-5 text-white/40"
          >
            <a href="https://github.com/Raghavendra0348" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/arella-raghavendra" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
              <Linkedin size={20} />
            </a>
            <a href="mailto:arellaraghavendra@gmail.com"
              className="hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full">
              <Mail size={20} />
            </a>
            <div className="h-px w-16 bg-white/10 ml-2" />
            <span className="font-mono text-xs tracking-widest text-white/20">Andhra Pradesh, IN</span>
          </motion.div>
        </div>

        {/* Right — B&W photo with editorial frame */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Outer decorative border */}
          <div className="absolute -inset-3 border border-white/5 rounded-sm" />
          <div className="absolute -inset-6 border border-white/[0.03] rounded-sm" />

          {/* Photo container */}
          <div className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden rounded-sm border border-white/10 group">
            {/* Pure B&W + high contrast overlay */}
            <img
              src="/raghava1.jpeg"
              alt="Raghavendra Arella"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              style={{ filter: 'grayscale(100%) contrast(1.15) brightness(0.95)' }}
            />
            {/* Subtle white gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Corner tag */}
            <div className="absolute top-4 right-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">
              Full Stack Dev
            </div>
          </div>

          {/* Floating stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 top-1/4 bg-black border border-white/10 px-4 py-2.5 rounded-sm"
          >
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-0.5">CGPA</p>
            <p className="font-bold text-white text-lg leading-none">8.75</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -left-4 bottom-1/4 bg-black border border-white/10 px-4 py-2.5 rounded-sm"
          >
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Projects</p>
            <p className="font-bold text-white text-lg leading-none">5+</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={18} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
