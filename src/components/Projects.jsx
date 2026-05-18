import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ImmersiveCarousel from './ui/ImmersiveCarousel';

// ── project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'PaperVault',
    subtitle: 'RGUKT Question Paper Repository',
    tag: 'Full Stack Web App',
    image: '/rgukt_sgpa_cgpa_calculator.png',
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
    image: '/illustration.png',
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
    image: '/kids_hobby.png',
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
    image: '/bloomer.png',
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
    image: '/bit_code_converter.png',
    description:
      'Converts between Binary, Decimal, Octal, Hex, generates Gray Codes and Hamming Codes with error detection. Firebase Auth & Google Analytics integration for user tracking and analytics.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Raghavendra0348/bit-code-converter',
    live: 'https://bit-code-converter.vercel.app/',
  },
];

// map project data → ImmersiveCarousel card format
const carouselCards = projects.map((p) => ({
  image:      { src: p.image, alt: p.title },
  title:      p.title.toUpperCase(),
  buttonText: p.live ? 'View Live ↗' : 'GitHub ↗',
  link:       p.live || p.github,
}));

// ── Projects section ─────────────────────────────────────────────────────────
export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative bg-white" style={{ paddingTop: '6rem', paddingBottom: 0 }}>
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* ── Section heading ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-5 mb-3">
            <span className="font-mono text-xs text-black/30 tracking-[0.2em] uppercase">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Projects</h2>
            <div className="h-px bg-black/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-black/35 font-mono text-sm ml-10 md:ml-14">Things I have built</p>
        </motion.div>
      </div>

      {/* ── Immersive Carousel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ width: '100%', height: '900px' }}
      >
        <ImmersiveCarousel
          cards={carouselCards}
          backgroundColor="#0A0A0A"
          cardBackground="#FFFFFF"
          titleColor="#111111"
          buttonBackground="#111111"
          buttonTextColor="#FFFFFF"
          cardRadius={20}
          imageRadius={14}
          cardPadding={18}
          showArrows={true}
          arrowColor="#FFFFFF"
          enableMouseWheel={true}
          cardShadow="0 24px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.18)"
        />
      </motion.div>

      {/* ── Subtle bottom fade into next section ── */}
      <div
        style={{
          height: 60,
          background: 'linear-gradient(to bottom, #0A0A0A 0%, #ffffff 100%)',
        }}
      />
    </section>
  );
}
