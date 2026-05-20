import React from 'react';
import FlowArt, { FlowSection } from './ui/story-scroll';

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    num:         '01',
    title:       'PaperVault',
    subtitle:    'RGUKT Question Paper Repository',
    tag:         'Full Stack Web App',
    description: 'Platform for RGUKT students to access and manage question papers across campuses. Advanced search and filtering by course, campus, exam type, and year. Secure JWT authentication with bookmarks, download tracking, and an admin dashboard for uploads and analytics.',
    tech:        ['Node.js', 'Express.js', 'MySQL', 'Sequelize', 'JavaScript'],
    github:      'https://github.com/Raghavendra0348/WT_Project',
    live:        'https://rgukt-question-papers.vercel.app/',
    bg:          '#f5f0e8',   // warm off-white
    color:       '#000000',
    accent:      '#6366F1',
    image:       '/image.png',
  },
  {
    num:         '02',
    title:       'Medha AI',
    subtitle:    'RGUKT Campus Assistant',
    tag:         'AI-Powered · Live',
    description: 'Multilingual AI assistant using Gemini API for real-time campus queries. Voice interaction, image analysis, and multilingual support. Modules for academics, campus services, and administrative guidance with complaint tracking and role-based authentication.',
    tech:        ['React', 'Node.js', 'Firebase', 'Gemini API'],
    github:      'https://github.com/Raghavendra0348/IT_Club_Hackathon',
    live:        'https://rgukt-medha-ai.vercel.app/',
    bg:          '#000000',
    color:       '#ffffff',
    accent:      '#10B981',
    image:       '/medha.png',
  },
  {
    num:         '03',
    title:       'Kids Hobbies ML',
    subtitle:    'ML Prediction System',
    tag:         'Machine Learning',
    description: 'Machine Learning system to predict hobbies for children (5–12) using Random Forest. 13-parameter prediction model with multi-algorithm comparison. JWT authentication with prediction history, feedback system, and admin dashboard with ML performance visualizations.',
    tech:        ['React', 'Django', 'DRF', 'scikit-learn', 'SQLite'],
    github:      'https://github.com/Sivananda10/Basic_Project',
    live:        null,
    bg:          '#1A3DE8',   // bold blue
    color:       '#ffffff',
    accent:      '#FEBC2E',
    image:       '/kids_hobby.png',
  },
  {
    num:         '04',
    title:       'Bloomer',
    subtitle:    'Video-First E-Commerce Platform',
    tag:         'Work · Live',
    description: 'Built a Comming Soon Landing page for Next-generation video-first e-commerce platform focused on creator-driven commerce. Scalable backend APIs with real-time data handling via Firestore, and an interactive UI designed for seamless watch, swipe, and shop experiences.',
    tech:        ['Node.js', 'Express.js', 'React.js', 'Firestore'],
    github:      'https://github.com/Raghavendra0348/demo',
    live:        'https://bloomer.in',
    bg:          '#EC4899',   // pink
    color:       '#ffffff',
    accent:      '#ffffff',
    image:       '/bloomer.png',
  },
  {
    num:         '05',
    title:       'Digital Logic Design',
    subtitle:    'Number System Tool',
    tag:         'Web App · Live',
    description: 'Built an interactive Digital Logic learning platform with real-time circuit simulations and visual explanations.Includes modules like Boolean Algebra, K-Maps, Adders, Counters, Flip-Flops, and Hamming Code.Designed a modern responsive interface to help students learn digital electronics easily and visually.',
    tech:        [' React 18 + TypeScript', 'Tailwind CSS', 'Shadcn/ui + Radix UI', 'Framer motion Animation'],
    github:      'https://github.com/Raghavendra0348/digital-logic-dsign',
    live:        'https://digital-logic-design.vercel.app/',
    bg:          '#0a0a0a',   // near black
    color:       '#ffffff',
    accent:      '#3B82F6',
    image:       '/digital.png',
  },
];

// ── Single project FlowSection content ───────────────────────────────────────
function ProjectContent({ p }) {
  const muted = p.color === '#ffffff' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';
  const border = p.color === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';

  return (
    <>
      {/* ── top row: number + tag ── */}
      <div className="flex items-center justify-between">
        <p className="font-mono font-bold text-xs tracking-[0.2em] uppercase" style={{ color: p.accent }}>
          {p.num} / 05
        </p>
        <span
          className="font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: p.accent, color: p.bg }}
        >
          {p.tag}
        </span>
      </div>

      {/* ── divider ── */}
      <hr className="my-4" style={{ border: 'none', borderTop: `1px solid ${border}` }} />

      {/* ── middle: title + image ── */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:flex-1">
        <div className="flex-1">
          <h2
            className="font-bold leading-[0.85] uppercase tracking-tight"
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 10rem)',
              color: p.color,
            }}
          >
            {p.title}
          </h2>
          <p className="mt-3 font-mono text-sm" style={{ color: muted }}>
            {p.subtitle}
          </p>
        </div>

        {/* project image */}
        <div
          className="w-full shrink-0 rounded-2xl overflow-hidden"
          style={{
            maxWidth: 'min(100%, clamp(280px, 34vw, 600px))',
            aspectRatio: '16/10',
            border: `1px solid ${border}`,
          }}
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* ── divider ── */}
      <hr className="my-4" style={{ border: 'none', borderTop: `1px solid ${border}` }} />

      {/* ── bottom row: description + tech + links ── */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end pb-8 md:pb-0">
        {/* description */}
        <p
          className="flex-1 text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed"
          style={{ color: muted, maxWidth: '52ch' }}
        >
          {p.description}
        </p>

        <div className="flex flex-col gap-4 md:items-end shrink-0">
          {/* tech pills */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {p.tech.map(t => (
              <span
                key={t}
                className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ border: `1px solid ${border}`, color: p.color }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA links */}
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-sm px-5 py-2.5 rounded-full transition-opacity hover:opacity-70"
              style={{
                border: `1.5px solid ${border}`,
                color: p.color,
                textDecoration: 'none',
              }}
            >
              GitHub ↗
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-sm px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
                style={{
                  background: p.accent,
                  color: p.bg,
                  textDecoration: 'none',
                }}
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Projects section ──────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects">
      {/* section label above the scroll */}
      <div
        className="relative bg-white py-16 px-6 md:px-12 text-center"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <p className="font-mono text-xs text-black/30 tracking-[0.2em] uppercase mb-3">04. Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
          Projects
        </h2>
        <p className="text-black/40 mt-3 font-mono text-sm">Scroll through things I have built</p>
      </div>

      <FlowArt aria-label="Projects story scroll">
        {projects.map((p) => (
          <FlowSection
            key={p.num}
            aria-label={p.title}
            style={{ backgroundColor: p.bg }}
          >
            <ProjectContent p={p} />
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}
