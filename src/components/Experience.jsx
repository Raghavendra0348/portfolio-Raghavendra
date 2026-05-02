import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-[#8A2BE2] font-mono text-2xl font-normal">03.</span>
              Where I've Worked
            </h2>
            <div className="h-[1px] bg-[#1e293b] flex-grow" />
          </div>

          <div className="relative border-l border-[#1e293b] ml-4 md:ml-0 md:pl-8 py-4">
            
            <div className="absolute w-3 h-3 bg-[#00F0FF] rounded-full -left-[6px] md:-left-[44px] top-6 shadow-[0_0_10px_#00F0FF]" />

            <div className="pl-8 md:pl-0">
              <h3 className="text-2xl font-bold text-white mb-1">
                Full Stack Developer <span className="text-[#00F0FF]">@ Bloomer</span>
              </h3>
              <p className="text-[#8B949E] font-mono text-sm mb-6">2025 — Present | Live project</p>
              
              <ul className="space-y-4 text-[#E2E8F0] text-base leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#8A2BE2] font-mono mt-1">▹</span>
                  <span>Developing a video-first e-commerce platform using Node.js, Express.js, React.js, and Firestore.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8A2BE2] font-mono mt-1">▹</span>
                  <span>Designing scalable backend APIs and real-time data handling systems to support high concurrency.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8A2BE2] font-mono mt-1">▹</span>
                  <span>Building interactive UI for seamless watch, swipe, and shop experiences, optimizing for performance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8A2BE2] font-mono mt-1">▹</span>
                  <span>Contributing to a next-generation shopping platform focused on creator-driven commerce.</span>
                </li>
              </ul>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
