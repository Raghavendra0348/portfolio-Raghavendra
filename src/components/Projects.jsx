import React from 'react';
import FlowArt, { FlowSection } from './ui/story-scroll';

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    num: '01',
    title: 'Amazon Clone',
    subtitle: 'Full-Stack E-Commerce Platform',
    tag: 'E-Commerce · Live',
    bullets: [
      'Built an Amazon-inspired storefront with product search, category filters, sorting, product reviews, and a responsive shopping experience.',
      'Implemented customer accounts, wishlists, cart management, saved addresses, Cash on Delivery, and Razorpay checkout.',
      'Developed order tracking and an admin dashboard for products, inventory, users, and orders using Express, PostgreSQL, and Prisma.',
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Razorpay'],
    github: 'https://github.com/Raghavendra0348/E_commerce',
    live: 'https://amazon-clone-e-commerce-18.vercel.app',
    bg: '#131921',
    color: '#ffffff',
    accent: '#FF9900',
    image: '/amazon-ecommerce.png',
  },
  {
    num: '02',
    title: 'DSA Prep Platform',
    subtitle: 'Company-Wise Interview Preparation',
    tag: 'Full Stack · Live',
    bullets: [
      'Built a company-wise interview preparation platform with LeetCode questions organized by company, topic, difficulty, and recency.',
      'Implemented a structured DSA roadmap, global search, bookmarks, personal notes, and question progress tracking.',
      'Developed authenticated dashboards with practice analytics using React, TanStack Query, Express, PostgreSQL, and Prisma.',
    ],
    tech: ['React', 'TanStack Query', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT Auth'],
    github: 'https://github.com/Raghavendra0348/DSA_Prep_Platform',
    live: 'https://dsa-preparation-platform.vercel.app/',
    bg: '#f4f0e8',
    color: '#000000',
    accent: '#C74528',
    image: '/dsa-prep.png',
  },
  {
    num:         '03',
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

];

// ── Single project FlowSection content ───────────────────────────────────────
function ProjectContent({ p }) {
  const muted = p.color === '#ffffff' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';
  const border = p.color === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';

  return (
    <>
      {/* ── top row: number + tag ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono font-bold text-xs tracking-[0.2em] uppercase" style={{ color: p.accent }}>
          {p.num} / {projects.length.toString().padStart(2, '0')}
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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start lg:items-center gap-6 lg:flex-1">
        <div className="min-w-0">
          <h2
            className="font-bold leading-[0.95] uppercase tracking-tight break-words"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 6.5rem)',
              color: p.color,
            }}
          >
            {p.title}
          </h2>

          {/* CTA links — directly under project name */}
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center font-mono font-semibold text-sm px-5 py-2.5 rounded-full transition-opacity hover:opacity-70"
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
                className="inline-flex min-h-11 items-center justify-center font-mono font-semibold text-sm px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
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
