import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-28 md:py-36 relative bg-black">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-16">
            <span className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">About Me</h2>
            <div className="h-px bg-white/8 flex-grow max-w-xs hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

            <div className="lg:col-span-3 space-y-5 text-white/55 text-base md:text-lg leading-relaxed">
              <p>
                I'm Raghavendra, a self-driven Computer Science student at RGUKT RK Valley.
                I build full-stack web applications that solve real problems — exploring the
                intersection of design, engineering, and AI.
              </p>
              <p>
                From pixel-perfect frontends to robust backend APIs, I enjoy every layer of the stack.
                Whether designing an e-commerce platform or training ML models, my goal is always
                to build things that make an impact.
              </p>
              <p>
                Currently working as a Full Stack Developer at{' '}
                <span className="text-white font-medium">Bloomer</span>, building a video-first
                e-commerce platform. Off-screen: badminton, cricket, Sudoku, and music.
              </p>

              <div className="pt-4 border-t border-white/6">
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">Recent Tech</p>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 font-mono text-sm">
                  {['JavaScript (ES6+)', 'React', 'Node.js', 'Express.js', 'Python', 'Django'].map((tech) => (
                    <li key={tech} className="flex items-center gap-2 text-white/50">
                      <span className="w-1 h-1 bg-white/40 rounded-full" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="relative group">
                {/* Offset border */}
                <div className="absolute -inset-2 border border-white/5 rounded-sm transition-all duration-500 group-hover:-inset-3" />
                <div className="relative overflow-hidden rounded-sm border border-white/10 aspect-square">
                  <img
                    src="/raghava.webp"
                    alt="Raghavendra Arella"
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Caption tag */}
                <div className="mt-3 text-center font-mono text-[10px] text-white/20 tracking-widest uppercase">
                  CS @ RGUKT · Andhra Pradesh, India
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
