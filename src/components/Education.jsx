import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16 justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-[#8A2BE2] font-mono text-2xl font-normal">05.</span>
              Education
            </h2>
            <div className="h-[1px] bg-[#1e293b] flex-grow max-w-[200px]" />
          </div>

          <div className="space-y-8">
            <div className="glow-box p-8 rounded-sm bg-[#10141D] flex items-start gap-6 border border-[rgba(255,255,255,0.05)]">
              <div className="hidden sm:flex bg-[#0A0D14] p-4 rounded-full text-[#00F0FF] border border-[rgba(255,255,255,0.05)] shrink-0">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">B.Tech in Computer Science</h3>
                <h4 className="text-[#8A2BE2] font-medium mb-2">RGUKT RK Valley</h4>
                <p className="text-[#8B949E] font-mono text-sm mb-4">2024 — 2028</p>
                <div className="inline-block bg-[#0A0D14] px-4 py-2 rounded-sm border border-[rgba(0,240,255,0.2)]">
                  <span className="text-[#00F0FF] font-mono text-sm">CGPA: 8.75</span>
                </div>
              </div>
            </div>

            <div className="glow-box p-8 rounded-sm bg-[#10141D] flex items-start gap-6 border border-[rgba(255,255,255,0.05)]">
              <div className="hidden sm:flex bg-[#0A0D14] p-4 rounded-full text-[#8A2BE2] border border-[rgba(255,255,255,0.05)] shrink-0">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pre-University Course (MPC)</h3>
                <h4 className="text-[#8A2BE2] font-medium mb-2">RGUKT RK Valley</h4>
                <p className="text-[#8B949E] font-mono text-sm mb-4">2022 — 2024</p>
                <div className="inline-block bg-[#0A0D14] px-4 py-2 rounded-sm border border-[rgba(0,240,255,0.2)]">
                  <span className="text-[#00F0FF] font-mono text-sm">CGPA: 9.04</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
