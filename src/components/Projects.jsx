import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'PaperVault',
    subtitle: 'RGUKT Question Paper Repository',
    description:
      'Full-stack platform for RGUKT students to access and manage question papers across campuses. Advanced search and filtering by course, campus, exam type, and year. Secure JWT authentication with bookmarks, download tracking, and an admin dashboard.',
    tech: ['Node.js', 'Express.js', 'MySQL', 'Sequelize', 'JavaScript'],
    github: 'https://github.com/Raghavendra0348',
    live: null,
    tag: 'Full Stack Web App',
  },
  {
    id: '02',
    title: 'Medha AI',
    subtitle: 'RGUKT Campus Assistant',
    description:
      'Multilingual AI assistant powered by Gemini API for real-time campus queries. Voice interaction, image analysis, multilingual support. Modules for academics, campus services, and administrative guidance. Role-based authentication for students and admins.',
    tech: ['React', 'Node.js', 'Firebase', 'Gemini API'],
    github: 'https://github.com/Raghavendra0348',
    live: '#',
    tag: 'AI-Powered App',
  },
  {
    id: '03',
    title: 'Kids Hobbies Prediction',
    subtitle: 'ML Prediction System',
    description:
      'Machine Learning system to predict hobbies for children (5–12) using Random Forest. 13-parameter prediction model with multi-algorithm comparison. JWT authentication with prediction history, feedback system, and admin dashboard with ML performance visualizations.',
    tech: ['React', 'Django', 'DRF', 'scikit-learn', 'SQLite'],
    github: 'https://github.com/Raghavendra0348',
    live: null,
    tag: 'Machine Learning',
  },
  {
    id: '04',
    title: 'Bloomer',
    subtitle: 'Video-First E-Commerce Platform',
    description:
      'Building a next-generation video-first e-commerce platform for creator-driven commerce. Scalable backend APIs, real-time data handling with Firestore, and interactive UI for seamless watch, swipe, and shop experience.',
    tech: ['Node.js', 'Express.js', 'React.js', 'Firestore'],
    github: 'https://github.com/Raghavendra0348',
    live: '#',
    tag: 'Live · Work',
  },
  {
    id: '05',
    title: 'Bit Code Converter',
    subtitle: 'Number System Converter',
    description:
      'Converts between Binary, Decimal, Octal, Hex, generates Gray Codes and Hamming Codes with error detection. Firebase Auth & Google Analytics integration.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Raghavendra0348/bit-code-converter',
    live: 'https://bit-code-converter.vercel.app/',
    tag: 'Web App',
  },
  {
    id: '06',
    title: 'RGUKT CGPA Calculator',
    subtitle: 'Academic Performance Tool',
    description:
      'Responsive SGPA/CGPA calculator for RGUKT students with Firebase authentication, Google Analytics, and Search Console integration. Used by hundreds of students.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Raghavendra0348/RGUKT-SGPA-CGPA-Calculator',
    live: 'https://rgukt-sgpa-cgpa-calculator.vercel.app/',
    tag: 'Web App',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mx.set(50);
    my.set(50);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-3d-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="project-3d-card rounded-sm overflow-hidden flex flex-col h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-sm"
          style={{
            background: hovered
              ? `radial-gradient(circle at ${mx.get()}% ${my.get()}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
              : 'none',
            transition: 'background 0.1s'
          }}
        />

        <div className="p-7 flex flex-col h-full relative z-0">
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase border border-white/8 px-2 py-1 rounded-sm">
              {project.tag}
            </span>
            <div className="flex items-center gap-3 text-white/30">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1" title="GitHub">
                  <Github size={16} />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1" title="Live">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Number */}
          <div className="font-mono text-4xl font-bold text-white/6 mb-3 leading-none select-none">
            {project.id}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-white/35 font-mono text-xs mb-4 tracking-wide">{project.subtitle}</p>

          {/* Description */}
          <p className="text-white/45 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {project.tech.map(t => (
              <span key={t} className="font-mono text-[11px] text-white/30 bg-white/[0.04] px-2 py-0.5 rounded-sm border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom hover bar */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="py-24 relative bg-black">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-5 mb-3">
            <span className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Projects</h2>
            <div className="h-px bg-white/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-white/30 font-mono text-sm ml-10 md:ml-14">
            Things I have built — hover for 3D effect
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
