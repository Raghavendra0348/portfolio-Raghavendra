import React from 'react';
import FlowArt, { FlowSection } from './ui/story-scroll';

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    num:         '01',
    title:       'Kids Hobbies ML',
    subtitle:    'ML Prediction System',
    tag:         'Machine Learning · Live',
    bullets: [
      'Developed a Random Forest-based hobby recommendation system for children aged 5–12, trained on 12,000+ records achieving 93% prediction accuracy.',
      'Engineered a questionnaire with 36+ behavioral, academic, sports, arts, health, and analytical-thinking parameters to identify interests and predict suitable hobbies.',
      'Performed comparative evaluation of Random Forest, SVM, KNN, and Decision Tree models, selecting the best based on accuracy and generalization.',
      'Built a full-stack platform using React, Django, scikit-learn & JWT Authentication with prediction history, user feedback, and interactive analytics dashboards.',
    ],
    tech:        ['React', 'Django', 'Django REST Framework', 'scikit-learn', 'SQLite', 'JWT Auth', 'Python'],
    github:      'https://github.com/Raghavendra0348/Kids_Hobby_Prediction_New',
    live:        'https://kids-hobby-prediction-new.vercel.app',
    bg:          '#1A3DE8',
    color:       '#ffffff',
    accent:      '#FEBC2E',
    image:       '/kids_hobby.png',
  },
  {
    num:         '02',
    title:       'PaperVault',
    subtitle:    'RGUKT Question Paper Repository',
    tag:         'Full Stack Web App',
    bullets: [
      'Built a centralized repository with search, subject-wise filtering, bookmarks, download tracking, and JWT authentication for RGUKT students.',
      'Implemented a student upload & admin approval workflow, enabling moderated contributions and maintaining content authenticity.',
      'Developed an admin dashboard to manage users, papers, approvals, and analytics using Node.js, Express.js, MySQL, and Sequelize ORM.',
    ],
    tech:        ['React', 'Node.js', 'Express.js', 'MySQL', 'Sequelize ORM', 'JWT Auth'],
    github:      'https://github.com/Raghavendra0348/WT_Project',
    live:        'https://rgukt-question-papers.vercel.app/',
    bg:          '#f5f0e8',
    color:       '#000000',
    accent:      '#6366F1',
    image:       '/image.png',
  },
  {
    num:         '03',
    title:       'Medha AI',
    subtitle:    'RGUKT Campus Assistant',
    tag:         'AI-Powered · Live',
    bullets: [
      'Built a multilingual AI campus assistant powered by the Gemini API, integrating voice input, image analysis, and text-based conversations for academic, administrative, and campus queries.',
      'Designed and implemented a role-based complaint management system with RBAC, enabling students and administrators to submit, track, and resolve campus issues end-to-end.',
    ],
    tech:        ['React', 'Node.js', 'Express.js', 'Firebase', 'Gemini API', 'RBAC'],
    github:      'https://github.com/Raghavendra0348/IT_Club_Hackathon',
    live:        'https://rgukt-medha-ai.vercel.app/',
    bg:          '#000000',
    color:       '#ffffff',
    accent:      '#10B981',
    image:       '/medha.png',
  },
  {
    num:         '04',
    title:       'Bloomer',
    subtitle:    'Video-First E-Commerce Platform',
    tag:         'Work · Live',
    description: 'Built a Comming Soon Landing page for Next-generation video-first e-commerce platform focused on creator-driven commerce. Scalable backend APIs with real-time data handling via Firestore, and an interactive UI designed for seamless watch, swipe, and shop experiences.',
    tech:        ['React.js', 'Node.js', 'Express.js', 'Firestore', 'Firebase'],
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
    tech:        ['React 18', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Radix UI', 'Framer Motion'],
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

          {/* CTA links — directly under project name */}
          <div className="flex gap-3 mt-4">
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

          <p className="mt-3 font-mono text-sm" style={{ color: muted }}>
            {p.subtitle}
          </p>

          {/* Tech Stack — right below subtitle */}
          <div className="mt-4">
            <p
              className="font-mono font-bold text-[10px] uppercase tracking-[0.18em] mb-2"
              style={{ color: p.accent }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span
                  key={t}
                  className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: `${p.accent}18`,
                    border: `1px solid ${p.accent}44`,
                    color: p.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
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

      {/* ── bottom row: description / bullets (full width) ── */}
      <div className="pb-8 md:pb-0">
        {/* description / bullets */}
        <div>
          {p.bullets ? (
            <ul className="space-y-2">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[clamp(0.78rem,1.2vw,0.92rem)] leading-relaxed">
                  <span style={{ color: p.accent, flexShrink: 0, marginTop: '0.25em' }}>▸</span>
                  <span style={{ color: muted }}>{b}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed"
              style={{ color: muted, maxWidth: '56ch' }}
            >
              {p.description}
            </p>
          )}
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
