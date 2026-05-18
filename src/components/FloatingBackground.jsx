import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── Seeded pseudo-random (deterministic, no layout jitter) ── */
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

/* ─── Particle constellation canvas ─────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    const COUNT = 55;

    const pts = Array.from({ length: COUNT }, (_, i) => ({
      x: seededRand(i * 3) * 100,      // percent
      y: seededRand(i * 3 + 1) * 100,
      vx: (seededRand(i * 3 + 2) - 0.5) * 0.018,
      vy: (seededRand(i * 3 + 3) - 0.5) * 0.018,
      r: seededRand(i * 3 + 4) * 1.8 + 0.8,
      opacity: seededRand(i * 3 + 5) * 0.35 + 0.08,
    }));

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const tick = () => {
      animId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 100; if (p.x > 100) p.x = 0;
        if (p.y < 0) p.y = 100; if (p.y > 100) p.y = 0;
      }

      // Draw connecting lines between nearby pts
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = (pts[i].x - pts[j].x) * W / 100;
          const dy = (pts[i].y - pts[j].y) * H / 100;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x * W / 100, pts[i].y * H / 100);
            ctx.lineTo(pts[j].x * W / 100, pts[j].y * H / 100);
            ctx.strokeStyle = `rgba(0,0,0,${0.04 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x * W / 100, p.y * H / 100, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.opacity})`;
        ctx.fill();
      }
    };

    resize();
    tick();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

/* ─── Orb config (deterministic positions) ──────────────────── */
const ORBS = [
  // [cx%, cy%, size, color, duration, delay, xAmp, yAmp]
  [72, 38, 520, 'rgba(120,120,255,0.13)', 18, 0,   30, 22],
  [80, 70, 380, 'rgba(200,100,255,0.10)', 14, 2,   18, 28],
  [60, 20, 300, 'rgba(80,200,255,0.09)',  20, 1,   22, 16],
  [88, 50, 260, 'rgba(255,150,100,0.08)', 16, 3,   14, 24],
  [65, 80, 340, 'rgba(100,220,180,0.08)', 22, 0.5, 26, 18],
  [50, 45, 200, 'rgba(255,200,80,0.07)',  12, 4,   20, 14],
];

/* ─── Single floating orb ───────────────────────────────────── */
function Orb({ cx, cy, size, color, duration, delay, xAmp, yAmp }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${cx}%`,
        top:  `${cy}%`,
        width:  size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${color}, transparent 72%)`,
        transform: 'translate(-50%, -50%)',
        filter: 'blur(36px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{
        x: [-xAmp, xAmp, -xAmp * 0.6, xAmp * 0.8, -xAmp],
        y: [-yAmp, yAmp * 0.6, -yAmp * 0.8, yAmp, -yAmp],
        scale: [1, 1.12, 0.94, 1.08, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
}

/* ─── Subtle morphing ring (SVG) ────────────────────────────── */
function MorphRing() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ right: '-6%', top: '5%', width: '52%', maxWidth: 620, zIndex: 0 }}
    >
      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', opacity: 0.55 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer dashed ring */}
        <motion.circle
          cx="250" cy="250" r="230"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="1"
          strokeDasharray="6 10"
          animate={{ r: [230, 236, 228, 234, 230] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Middle ring */}
        <motion.circle
          cx="250" cy="250" r="185"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="0.8"
          strokeDasharray="3 14"
          animate={{ r: [185, 178, 190, 182, 185] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.svg>

      {/* Rotating gradient arc overlay */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 60%, rgba(120,100,255,0.12) 80%, transparent 100%)',
          filter: 'blur(12px)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

/* ─── Floating geometric accent shapes ──────────────────────── */
const SHAPES = [
  { style: { right: '18%', top: '12%',  width: 48, height: 48 }, delay: 0,   dur: 7  },
  { style: { right: '8%',  top: '62%',  width: 28, height: 28 }, delay: 1.2, dur: 9  },
  { style: { right: '32%', top: '78%',  width: 36, height: 36 }, delay: 0.6, dur: 11 },
  { style: { right: '44%', top: '8%',   width: 22, height: 22 }, delay: 2,   dur: 8  },
];

function FloatingShapes() {
  return (
    <>
      {SHAPES.map(({ style, delay, dur }, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: i % 2 === 0 ? '30%' : '50%',
            border: '1px solid rgba(0,0,0,0.09)',
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'none',
            zIndex: 0,
            ...style,
          }}
          animate={{
            y: [-12, 12, -8, 14, -12],
            rotate: [0, 15, -10, 20, 0],
            opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
          }}
          transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

      {/* Aurora blobs */}
      {ORBS.map((o, i) => (
        <Orb
          key={i}
          cx={o[0]} cy={o[1]} size={o[2]} color={o[3]}
          duration={o[4]} delay={o[5]} xAmp={o[6]} yAmp={o[7]}
        />
      ))}

      {/* Rotating dashed rings (right side) */}
      <MorphRing />

      {/* Floating accent shapes */}
      <FloatingShapes />

      {/* Particle constellation layer */}
      <Particles />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 70% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 70% 50%, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
