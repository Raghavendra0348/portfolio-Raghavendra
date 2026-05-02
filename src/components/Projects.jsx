import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, BookOpen, Brain, ShoppingBag, Code } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'PaperVault',
    subtitle: 'RGUKT Question Paper Repository',
    tag: 'Full Stack Web App',
    icon: <BookOpen size={48} strokeWidth={1} />,
    description:
      'Platform for RGUKT students to access and manage question papers across campuses. Advanced search and filtering by course, campus, exam type, and year. Secure JWT authentication with bookmarks, download tracking, and an admin dashboard for uploads and analytics.',
    tech: ['Node.js', 'Express.js', 'MySQL', 'Sequelize', 'JavaScript'],
    github: 'https://github.com/Raghavendra0348',
    live: null,
  },
  {
    id: '02',
    title: 'Medha AI',
    subtitle: 'RGUKT Campus Assistant',
    tag: 'AI-Powered App · Live',
    icon: <Brain size={48} strokeWidth={1} />,
    description:
      'Multilingual AI assistant using Gemini API for real-time campus queries. Voice interaction, image analysis, and multilingual support. Modules for academics, campus services, and administrative guidance with a complaint tracking system and role-based authentication.',
    tech: ['React', 'Node.js', 'Firebase', 'Gemini API'],
    github: 'https://github.com/Raghavendra0348',
    live: '#',
  },
  {
    id: '03',
    title: 'Kids Hobbies Prediction',
    subtitle: 'ML Prediction System',
    tag: 'Machine Learning',
    icon: <Brain size={48} strokeWidth={1} />,
    description:
      'Machine Learning system to predict hobbies for children (5–12) using Random Forest. 13-parameter prediction model with multi-algorithm comparison. JWT authentication with prediction history, feedback system, and admin dashboard with ML performance visualizations.',
    tech: ['React', 'Django', 'DRF', 'scikit-learn', 'SQLite'],
    github: 'https://github.com/Raghavendra0348',
    live: null,
  },
  {
    id: '04',
    title: 'Bloomer',
    subtitle: 'Video-First E-Commerce Platform',
    tag: 'Work · Live',
    icon: <ShoppingBag size={48} strokeWidth={1} />,
    description:
      'Next-generation video-first e-commerce platform focused on creator-driven commerce. Scalable backend APIs with real-time data handling via Firestore, and an interactive UI designed for seamless watch, swipe, and shop experiences.',
    tech: ['Node.js', 'Express.js', 'React.js', 'Firestore'],
    github: 'https://github.com/Raghavendra0348',
    live: '#',
  },
  {
    id: '05',
    title: 'Bit Code Converter',
    subtitle: 'Number System Converter',
    tag: 'Web App · Live',
    icon: <Code size={48} strokeWidth={1} />,
    description:
      'Converts between Binary, Decimal, Octal, Hex, generates Gray Codes and Hamming Codes with error detection. Firebase Auth & Google Analytics integration for user tracking and analytics.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Raghavendra0348/bit-code-converter',
    live: 'https://bit-code-converter.vercel.app/',
  },
];

function ProjectRow({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch gap-0`}
    >
      {/* Visual panel */}
      <div className="w-full lg:w-[58%] group">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className="project-panel rounded-sm w-full h-64 lg:h-full min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Large faint number */}
          <div className="absolute top-4 right-6 font-mono text-7xl font-bold text-black/[0.04] select-none leading-none">
            {project.id}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-black/20 group-hover:text-black/40 transition-colors duration-500 mb-6 relative z-10"
          >
            {project.icon}
          </motion.div>

          {/* Title */}
          <div className="relative z-10 text-center px-8">
            <p className="font-mono text-xs text-black/25 uppercase tracking-[0.25em] mb-2">{project.tag}</p>
            <h4 className="text-2xl md:text-3xl font-bold text-black/20 group-hover:text-black/35 transition-colors duration-500 tracking-tight">
              {project.title}
            </h4>
          </div>

          {/* Hover shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
      </div>

      {/* Text panel */}
      <div className={`w-full lg:w-[42%] flex flex-col ${isReversed ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} py-8 lg:py-0 ${isReversed ? 'lg:pr-0 lg:pl-10' : 'lg:pl-0 lg:pr-10'}`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-col h-full justify-center"
        >
          <p className="font-mono text-xs text-black/35 uppercase tracking-[0.2em] mb-3">Featured Project</p>
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-1 leading-tight">{project.title}</h3>
          <p className="text-black/40 font-mono text-sm mb-6">{project.subtitle}</p>

          <div className="bw-card p-5 rounded-sm mb-6 text-left shadow-sm">
            <p className="text-black/60 text-sm leading-relaxed">{project.description}</p>
          </div>

          <ul className={`flex flex-wrap gap-3 font-mono text-xs text-black/40 mb-6 ${isReversed ? 'justify-start' : 'lg:justify-end'}`}>
            {project.tech.map(t => <li key={t}>{t}</li>)}
          </ul>

          <div className={`flex items-center gap-4 text-black/35 ${isReversed ? 'justify-start' : 'lg:justify-end'}`}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="hover:text-black transition-colors p-2 hover:bg-black/5 rounded-sm border border-transparent hover:border-black/10" title="GitHub">
                <Github size={18} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="hover:text-black transition-colors p-2 hover:bg-black/5 rounded-sm border border-transparent hover:border-black/10" title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="py-24 relative bg-white">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-5 mb-3">
            <span className="font-mono text-xs text-black/30 tracking-[0.2em] uppercase">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Projects</h2>
            <div className="h-px bg-black/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-black/35 font-mono text-sm ml-10 md:ml-14">Things I have built</p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
