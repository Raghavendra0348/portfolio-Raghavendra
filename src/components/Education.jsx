import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap } from 'lucide-react';

const degrees = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'RGUKT RK Valley',
    period: '2024 — 2028',
    cgpa: '8.75',
  },
  {
    degree: 'Pre-University Course (MPC)',
    school: 'RGUKT RK Valley',
    period: '2022 — 2024',
    cgpa: '9.04',
  },
];

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-24 relative bg-black">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-16">
            <span className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase">05.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Education</h2>
            <div className="h-px bg-white/8 flex-grow hidden md:block" />
          </div>

          <div className="space-y-5">
            {degrees.map((d, i) => (
              <motion.div
                key={d.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="bw-card rounded-sm p-7 flex items-start gap-6 group"
              >
                <div className="hidden sm:flex w-11 h-11 rounded-sm border border-white/10 bg-white/[0.03] items-center justify-center text-white/35 flex-shrink-0 group-hover:border-white/20 group-hover:text-white/60 transition-all">
                  <GraduationCap size={22} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{d.degree}</h3>
                    <div className="flex-shrink-0 font-mono text-xs text-white/25 border border-white/8 px-2.5 py-1 rounded-sm bg-white/[0.03]">
                      CGPA: {d.cgpa}
                    </div>
                  </div>
                  <p className="text-white/50 font-medium mb-1">{d.school}</p>
                  <p className="font-mono text-xs text-white/25 tracking-widest uppercase">{d.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
