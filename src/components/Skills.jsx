import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2, Database, LayoutTemplate, BrainCircuit,
  Globe, Server, GitBranch, Cpu, FileCode, Terminal,
  Layers, Box, Cloud, Lock, Zap, BarChart2
} from 'lucide-react';

const row1 = [
  { label: 'JavaScript', icon: <FileCode size={16} /> },
  { label: 'Python', icon: <Code2 size={16} /> },
  { label: 'React', icon: <Layers size={16} /> },
  { label: 'Node.js', icon: <Server size={16} /> },
  { label: 'Express.js', icon: <Zap size={16} /> },
  { label: 'HTML / CSS', icon: <Globe size={16} /> },
  { label: 'Django', icon: <Box size={16} /> },
  { label: 'Java', icon: <Terminal size={16} /> },
  { label: 'SQL', icon: <Database size={16} /> },
  { label: 'C Language', icon: <Cpu size={16} /> },
];

const row2 = [
  { label: 'Firebase', icon: <Cloud size={16} /> },
  { label: 'Firestore', icon: <Database size={16} /> },
  { label: 'MySQL', icon: <Database size={16} /> },
  { label: 'SQLite', icon: <Database size={16} /> },
  { label: 'REST APIs', icon: <Globe size={16} /> },
  { label: 'JWT Auth', icon: <Lock size={16} /> },
  { label: 'Git & GitHub', icon: <GitBranch size={16} /> },
  { label: 'scikit-learn', icon: <BrainCircuit size={16} /> },
  { label: 'Pandas', icon: <BarChart2 size={16} /> },
  { label: 'DRF', icon: <LayoutTemplate size={16} /> },
];

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
        {doubled.map((item, i) => (
          <div key={i} className="skill-pill">
            <span className="text-white/50">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative bg-black overflow-hidden">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-6">
            <span className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Arsenal</h2>
            <div className="h-px bg-white/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-white/35 font-mono text-sm mb-14 ml-10 md:ml-14">
            Technologies I work with daily
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee (no container padding) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </motion.div>

      {/* Category summary grid below marquee */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden"
        >
          {[
            { label: 'Languages', count: '6+', icon: <Code2 size={18} /> },
            { label: 'Frameworks', count: '5+', icon: <LayoutTemplate size={18} /> },
            { label: 'Technologies', count: '6+', icon: <Database size={18} /> },
            { label: 'ML & Tools', count: '4+', icon: <BrainCircuit size={18} /> },
          ].map((cat) => (
            <div key={cat.label} className="bg-[#0d0d0d] p-6 flex flex-col items-center gap-3 text-center group hover:bg-[#141414] transition-colors">
              <div className="text-white/30 group-hover:text-white/60 transition-colors">{cat.icon}</div>
              <div className="text-2xl font-bold text-white">{cat.count}</div>
              <div className="font-mono text-xs text-white/35 uppercase tracking-widest">{cat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
