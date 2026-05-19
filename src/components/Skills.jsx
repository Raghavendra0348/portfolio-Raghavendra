import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, LayoutTemplate, BrainCircuit } from 'lucide-react';

/* Official brand icons from Simple Icons (react-icons/si) */
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiDjango,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiGit,
  SiScikitlearn,
  SiPandas,
  SiJsonwebtokens,
  SiPostgresql,
} from 'react-icons/si';
import { FaJava, FaDatabase, FaServer, FaLock } from 'react-icons/fa';
import { TbBrandCpp } from 'react-icons/tb';
import { BiLogoPostgresql } from 'react-icons/bi';

/* ── Skill data with official icons & brand colours ────────────── */
const row1 = [
  { label: 'JavaScript', Icon: SiJavascript, accent: '#F7DF1E' },
  { label: 'Python',     Icon: SiPython,     accent: '#3776AB' },
  { label: 'React',      Icon: SiReact,      accent: '#61DAFB' },
  { label: 'Node.js',    Icon: SiNodedotjs,  accent: '#5FA04E' },
  { label: 'Express.js', Icon: SiExpress,    accent: '#888888' },
  { label: 'HTML / CSS', Icon: SiHtml5,      accent: '#E34F26' },
  // { label: 'Django',     Icon: SiDjango,     accent: '#0C4B33' },
  { label: 'Java',       Icon: FaJava,       accent: '#F89820' },
  { label: 'SQL',        Icon: FaDatabase,   accent: '#336791' },
  // { label: 'C Language', Icon: TbBrandCpp,   accent: '#00599C' },
];

const row2 = [
  { label: 'Firebase',    Icon: SiFirebase,      accent: '#FFCA28' },
  { label: 'MySQL',       Icon: SiMysql,         accent: '#4479A1' },
  // { label: 'SQLite',      Icon: SiSqlite,        accent: '#003B57' },
  { label: 'REST APIs',   Icon: FaServer,        accent: '#6D4AFF' },
  { label: 'JWT Auth',    Icon: SiJsonwebtokens, accent: '#D63AFF' },
  { label: 'Git & GitHub',Icon: SiGit,           accent: '#F05032' },
  { label: 'scikit-learn',Icon: SiScikitlearn,   accent: '#F7931E' },
  { label: 'Pandas',      Icon: SiPandas,        accent: '#150458' },
  // { label: 'PostgreSQL',  Icon: SiPostgresql,    accent: '#336791' },
  // { label: 'DRF',         Icon: SiDjango,        accent: '#A30000' },
];

/* ── Single skill card ────────────────────────────────────────── */
function SkillCard({ label, Icon, accent }) {
  return (
    <motion.div
      className="skill-card"
      whileHover="hovered"
      initial="idle"
      style={{ '--accent': accent }}
    >
      {/* Icon box */}
      <motion.div
        className="skill-icon-wrap"
        variants={{
          idle:    { y: 0,  scale: 1 },
          hovered: { y: -7, scale: 1.22 },
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <motion.span
          variants={{
            idle:    { rotate: 0 },
            hovered: { rotate: [0, -10, 10, -5, 0] },
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ display: 'flex' }}
        >
          <Icon size={28} />
        </motion.span>
      </motion.div>

      {/* Label */}
      <motion.span
        className="skill-label"
        variants={{
          idle:    { opacity: 0.5, y: 0 },
          hovered: { opacity: 1,   y: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>

      {/* Glow underline slides in */}
      <motion.div
        className="skill-glow"
        variants={{
          idle:    { scaleX: 0, opacity: 0 },
          hovered: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ── Infinite marquee row ─────────────────────────────────────── */
function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3 marquee-fade-mask">
      <div className={reverse ? 'marquee-track-slow-r' : 'marquee-track-slow'}>
        {doubled.map((item, i) => (
          <SkillCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative bg-[#f7f7f7] overflow-hidden">
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-4">
            <span className="font-mono text-xs text-black/25 tracking-[0.2em] uppercase">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Technical Arsenal</h2>
            <div className="h-px bg-black/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-black/35 font-mono text-sm mb-14 ml-10 md:ml-14">
            Technologies I work with daily — hover to explore
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </motion.div>

      {/* Stats grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 border border-black/8 rounded-sm overflow-hidden"
        >
          {[
            { label: 'Languages',    count: '6+', Icon: Code2 },
            { label: 'Frameworks',   count: '5+', Icon: LayoutTemplate },
            { label: 'Technologies', count: '6+', Icon: Database },
            { label: 'ML & Tools',   count: '4+', Icon: BrainCircuit },
          ].map(({ label, count, Icon }) => (
            <motion.div
              key={label}
              className="bg-white p-6 flex flex-col items-center gap-3 text-center group hover:bg-[#f7f7f7] transition-colors cursor-default"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-black/25 group-hover:text-black/70 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={20} />
              </motion.div>
              <div className="text-2xl font-bold text-black">{count}</div>
              <div className="font-mono text-xs text-black/35 uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
