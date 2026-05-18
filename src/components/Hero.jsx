import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import FloatingBackground from './FloatingBackground';

const roles = ['Full Stack Developer', 'React Developer', 'Node.js Engineer', 'ML Enthusiast'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  const socials = [
    { icon: <Github size={18} />,   href: 'https://github.com/Raghavendra0348',           label: 'GitHub'   },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/arella-raghavendra',   label: 'LinkedIn' },
    { icon: <Mail size={18} />,     href: 'mailto:arellaraghavendra@gmail.com',            label: 'Email'    },
    { icon: <Twitter size={18} />,  href: '#',                                             label: 'Twitter'  },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#f7f7f7]">
      <FloatingBackground />

      {/* Content sits above blob */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16
                      grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[100dvh]">

        {/* Left */}
        <div className="flex flex-col justify-center mix-blend-normal">

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-black/45 font-light mb-1"
          >
            Hello,
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-6xl lg:text-[4.5rem] font-extrabold text-black leading-[1.04] tracking-tight mb-4"
          >
            I am Raghavendra<br />Arella.
          </motion.h1>

          {/* Animated role */}
          <div className="h-10 mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p key={roleIndex}
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-xl md:text-2xl font-semibold text-black/35 tracking-tight"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-black/55 text-base md:text-[1.05rem] max-w-[460px] leading-relaxed mb-8 font-light"
          >
            CS student at RGUKT building full-stack products.
            Passionate about technology, I'm focused on building innovative
            solutions and continuously expanding my skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a href="#projects"
              className="btn-primary px-8 py-3.5 rounded-full font-mono text-sm tracking-widest uppercase">
              View Projects
            </a>
            <a href="#contact"
              className="btn-outline px-8 py-3.5 rounded-full font-mono text-sm tracking-widest uppercase">
              Hire Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-3"
          >
            {socials.map((s, i) => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer" title={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.07 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full border-[1.5px] border-black/20 flex items-center justify-center text-black/55 hover:bg-black hover:border-black hover:text-white transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="hidden lg:flex items-end justify-center relative"
        >
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute bottom-0 left-[8%] right-[8%] h-[1.5px] bg-black/15 origin-left"
          />
          <motion.img
            src="/illustration.png" alt="Developer illustration"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-[500px] h-auto select-none"
            style={{  mixBlendMode: 'multiply' }}
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 border-[1.5px] border-black/20 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-1.5 bg-black/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
