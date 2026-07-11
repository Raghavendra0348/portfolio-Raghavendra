import React, { useState, useCallback, useEffect, useRef } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// ── project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: "01",
    title: "Kids Hobbies ML",
    subtitle: "ML Prediction System",
    tag: "Machine Learning · Live",
    image: "/kids_hobby.png",
    tech: ["React", "Django", "scikit-learn", "SQLite"],
    github: "https://github.com/Raghavendra0348/Kids_Hobby_Prediction_New",
    live: "https://kids-hobby-prediction-new.vercel.app",
    accent: "#F59E0B",
  },
  {
    id: "02",
    title: "PaperVault",
    subtitle: "RGUKT Question Paper Repository",
    tag: "Full Stack Web App",
    image: "/rgukt_sgpa_cgpa_calculator.png",
    tech: ["Node.js", "Express.js", "MySQL", "Sequelize"],
    github: "https://github.com/Raghavendra0348/WT_Project",
    live: "https://rgukt-question-papers.vercel.app/",
    accent: "#6366F1",
  },
  {
    id: "03",
    title: "Medha AI",
    subtitle: "RGUKT Campus Assistant",
    tag: "AI-Powered · Live",
    image: "/medha.png",
    tech: ["React", "Node.js", "Firebase", "Gemini API"],
    github: "https://github.com/Raghavendra0348/IT_Club_Hackathon",
    live: "https://rgukt-medha-ai.vercel.app/",
    accent: "#10B981",
  },
  {
    id: "04",
    title: "Bloomer",
    subtitle: "Video-First E-Commerce",
    tag: "Work · Live",
    image: "/bloomer.png",
    tech: ["Node.js", "Express.js", "React.js", "Firestore"],
    github: "https://github.com/Raghavendra0348/demo",
    live: "https://bloomer.in",
    accent: "#EC4899",
  },
  {
    id: "05",
    title: "Digital Logic Design",
    subtitle: "Number System Tool",
    tag: "Web App · Live",
    image: "/digital.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
    github: "https://github.com/Raghavendra0348/digital-logic-dsign",
    live: "https://digital-logic-design.vercel.app/",
    accent: "#3B82F6",
  },
];

// ── Straight peek carousel ────────────────────────────────────────────────────
function StraightCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const timer               = useRef(null);
  const n = projects.length;

  const go = useCallback((next) => {
    const idx = (next + n) % n;
    setDir(next >= active ? 1 : -1);
    setActive(idx);
  }, [active, n]);

  const reset = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % n);
    }, 4000);
  }, [n]);

  useEffect(() => { reset(); return () => clearInterval(timer.current); }, [reset]);

  const p = projects[active];

  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 340, damping: 34 } },
    exit:   (d) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }),
  };

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* ── fake browser bar ── */}
      <div
        className="shrink-0 h-8 flex items-center gap-1.5 px-3 border-b border-white/5"
        style={{ background: "#161618" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div
          className="flex-1 mx-2 h-4 rounded flex items-center px-2"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-white/20 font-mono" style={{ fontSize: 9 }}>localhost:5000</span>
        </div>
        {/* dot nav */}
        <div className="flex items-center gap-1 pr-1">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { go(i); reset(); }}
              aria-label={projects[i].title}
              style={{
                width: i === active ? 20 : 6, height: 6,
                borderRadius: 3, border: "none", cursor: "pointer", padding: 0,
                background: i === active ? p.accent : "rgba(255,255,255,0.18)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── slide stage ── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex"
            style={{ background: "#111114" }}
          >
            {/* LEFT: image (full height, 44% width) */}
            <div className="relative shrink-0 overflow-hidden" style={{ width: "44%" }}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover object-top"
              />
              {/* right-edge fade */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, transparent 50%, #111114 100%)" }}
              />
              {/* accent glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 20% 40%, ${p.accent}28 0%, transparent 70%)` }}
              />
              {/* tag */}
              <div
                className="absolute top-3 left-3 font-mono font-bold uppercase"
                style={{
                  fontSize: 9, padding: "3px 10px", borderRadius: 20,
                  background: p.accent, color: "#fff", letterSpacing: "0.12em",
                }}
              >
                {p.tag}
              </div>
            </div>

            {/* RIGHT: info (perfectly straight, centered vertically) */}
            <div className="flex-1 flex flex-col justify-center px-6 py-5 overflow-hidden">
              <p
                className="font-mono font-bold mb-1"
                style={{ fontSize: 10, color: p.accent, letterSpacing: "0.16em" }}
              >
                {p.id} / 05
              </p>
              <h3
                className="font-extrabold leading-tight mb-2 text-white"
                style={{ fontSize: "clamp(1rem, 2.4vw, 1.5rem)", letterSpacing: "-0.02em" }}
              >
                {p.title}
              </h3>

              {/* CTA buttons — under the project name */}
              <div className="flex gap-2 mb-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity"
                  style={{
                    fontSize: 11, padding: "7px 14px", borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                    color: "#fff", textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity"
                    style={{
                      fontSize: 11, padding: "7px 14px", borderRadius: 8,
                      background: p.accent, color: "#fff", textDecoration: "none",
                    }}
                  >
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>

              <p className="font-medium mb-4" style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>
                {p.subtitle}
              </p>

              {/* tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span
                    key={t}
                    className="font-mono font-semibold uppercase"
                    style={{
                      fontSize: 9, padding: "3px 9px", borderRadius: 20,
                      border: `1px solid ${p.accent}55`,
                      color: p.accent, background: `${p.accent}15`,
                      letterSpacing: "0.07em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ← arrow */}
        <button
          onClick={() => { go(active - 1); reset(); }}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center hover:scale-110 transition-transform"
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#fff", cursor: "pointer",
          }}
        >
          <ChevronLeft size={14} />
        </button>

        {/* → arrow */}
        <button
          onClick={() => { go(active + 1); reset(); }}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center hover:scale-110 transition-transform"
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#fff", cursor: "pointer",
          }}
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ── progress bar ── */}
      <div className="shrink-0 h-[2px] w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          key={`pb-${active}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full origin-left"
          style={{ background: p.accent }}
        />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ProjectsShowcase() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/[0.03] font-mono text-xs text-black/40 tracking-widest uppercase"
            >
              <Sparkles size={11} />
              Featured Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight"
            >
              Projects that
              <br />
              <span className="text-black/30">speak for themselves</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-black/40 text-base md:text-lg max-w-xl mx-auto font-light"
            >
              Scroll to explore a curated selection of full-stack applications
              built with modern technologies.
            </motion.p>

            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 bg-black text-white rounded-full font-mono text-sm tracking-wide hover:bg-black/80 transition-colors"
            >
              <Code2 size={15} />
              View All Projects
              <ArrowRight size={14} />
            </motion.a>
          </div>
        }
      >
        <StraightCarousel />
      </ContainerScroll>
    </div>
  );
}
