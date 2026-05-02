import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="experience" className="py-24 relative bg-[#f7f7f7]">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-16">
            <span className="font-mono text-xs text-black/25 tracking-[0.2em] uppercase">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Where I've Worked</h2>
            <div className="h-px bg-black/8 flex-grow hidden md:block" />
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />

            <div className="pl-10 relative">
              <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black/60 bg-[#f7f7f7]" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="text-xl font-bold text-black">Full Stack Developer</h3>
                <span className="text-black/40 font-mono text-sm">@ Bloomer</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-7">
                <p className="text-black/30 font-mono text-xs tracking-widest uppercase">2025 — Present</p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-black/40 bg-black/[0.04] border border-black/10 px-2 py-0.5 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                  Live
                </span>
              </div>

              <ul className="space-y-4">
                {[
                  'Developing a video-first e-commerce platform using Node.js, Express.js, React.js, and Firestore.',
                  'Designing scalable backend APIs and real-time data handling systems to support high concurrency.',
                  'Building interactive UI for seamless watch, swipe, and shop experiences, optimizing for performance.',
                  'Contributing to a next-generation shopping platform focused on creator-driven commerce.',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex gap-3 text-black/55 text-base leading-relaxed"
                  >
                    <span className="text-black/25 font-mono mt-1 flex-shrink-0">▹</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-7">
                {['Node.js', 'Express.js', 'React.js', 'Firestore', 'REST APIs'].map(t => (
                  <span key={t} className="font-mono text-[11px] text-black/40 bg-black/[0.04] border border-black/8 px-2.5 py-1 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
