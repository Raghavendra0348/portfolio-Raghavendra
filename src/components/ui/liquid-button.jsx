/**
 * liquid-button.jsx
 * Black & white liquid gradient buttons — LiquidButton (CTA) + LiquidNavLink (nav pills)
 */
import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── B&W palette ────────────────────────────────────────────────────────────────
const BW = {
  color1:  '#FFFFFF', color2:  '#1a1a1a', color3:  '#888888',
  color4:  '#F0F0F0', color5:  '#EBEBEB', color6:  '#CCCCCC',
  color7:  '#222222', color8:  '#111111', color9:  '#555555',
  color10: '#999999', color11: '#000000', color12: '#AAAAAA',
  color13: '#0A0A0A', color14: '#BBBBBB', color15: '#DDDDDD',
  color16: '#333333', color17: '#444444',
};

const SVG_ORDER = ['svg1','svg2','svg3','svg4','svg3','svg2','svg1'];

function buildStops(states, order) {
  const maxLen = Math.max(...Object.values(states).map(s => s.stops.length));
  return Array.from({ length: maxLen }, (_, i) =>
    order.map(k => states[k].stops[i] ?? states[k].stops.at(-1))
  );
}

// ── Animated gradient SVG (unique gradient ID per instance) ──────────────────
function GradientSvg({ uid, isHovered, colors }) {
  const states = {
    svg1: {
      gt: 'translate(287.5 280) rotate(-29.0546) scale(689.807 1000)',
      stops: [
        {o:0,c:colors.color1},{o:.188423,c:colors.color2},{o:.260417,c:colors.color3},
        {o:.328792,c:colors.color4},{o:.328892,c:colors.color5},{o:.328992,c:colors.color1},
        {o:.442708,c:colors.color6},{o:.537556,c:colors.color7},{o:.631738,c:colors.color1},
        {o:.725645,c:colors.color8},{o:.817779,c:colors.color9},{o:.84375,c:colors.color10},
        {o:.90569,c:colors.color1},{o:1,c:colors.color11},
      ],
    },
    svg2: {
      gt: 'translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)',
      stops: [
        {o:0,c:colors.color1},{o:.104167,c:colors.color12},{o:.182292,c:colors.color13},
        {o:.28125,c:colors.color1},{o:.328792,c:colors.color4},{o:.328892,c:colors.color5},
        {o:.453125,c:colors.color6},{o:.515625,c:colors.color7},{o:.631738,c:colors.color1},
        {o:.692708,c:colors.color8},{o:.75,c:colors.color14},{o:.817708,c:colors.color9},
        {o:.869792,c:colors.color10},{o:1,c:colors.color1},
      ],
    },
    svg3: {
      gt: 'translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)',
      stops: [
        {o:0,c:colors.color1},{o:.188423,c:colors.color2},{o:.307292,c:colors.color1},
        {o:.328792,c:colors.color4},{o:.328892,c:colors.color5},{o:.442708,c:colors.color15},
        {o:.537556,c:colors.color16},{o:.631738,c:colors.color1},{o:.725645,c:colors.color17},
        {o:.817779,c:colors.color9},{o:.84375,c:colors.color10},{o:.90569,c:colors.color1},
        {o:1,c:colors.color11},
      ],
    },
    svg4: {
      gt: 'translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)',
      stops: [
        {o:.109375,c:colors.color11},{o:.171875,c:colors.color2},{o:.260417,c:colors.color13},
        {o:.328792,c:colors.color4},{o:.328892,c:colors.color5},{o:.328992,c:colors.color1},
        {o:.442708,c:colors.color6},{o:.515625,c:colors.color7},{o:.631738,c:colors.color1},
        {o:.692708,c:colors.color8},{o:.817708,c:colors.color9},{o:.869792,c:colors.color10},
        {o:1,c:colors.color11},
      ],
    },
  };

  const stopsArr  = buildStops(states, SVG_ORDER);
  const transforms = SVG_ORDER.map(k => states[k].gt);
  const anim = isHovered
    ? { gradientTransform: transforms, transition: { duration: 50, repeat: Infinity, ease: 'linear' } }
    : { gradientTransform: transforms, transition: { duration: 10, repeat: Infinity, ease: 'linear' } };

  const gradId = `lg-${uid}`;

  return (
    <svg className="w-full h-full" width="1030" height="280" viewBox="0 0 1030 280" fill="none">
      <rect width="1030" height="280" rx="140" fill={`url(#${gradId})`} />
      <defs>
        <motion.radialGradient id={gradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" animate={anim}>
          {stopsArr.map((cfgs, i) => (
            <AnimatePresence key={i}>
              <motion.stop
                initial={{ offset: cfgs[0].o, stopColor: cfgs[0].c }}
                animate={{ offset: cfgs.map(c => c.o), stopColor: cfgs.map(c => c.c) }}
                transition={{ duration: 0, ease: 'linear', repeat: Infinity }}
              />
            </AnimatePresence>
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  );
}

function LiquidLayers({ uid, isHovered }) {
  const rows = [
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference w-[443px] h-[121px]',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference w-[443px] h-[121px]',
    'top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-difference w-[443px] h-[121px]',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference w-[756px] h-[207px]',
    'top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-difference w-[756px] h-[207px]',
    'top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-difference w-[756px] h-[207px]',
    'top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light w-[756px] h-[207px]',
  ];
  return (
    <>
      {rows.map((cls, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <GradientSvg uid={`${uid}-${i}`} isHovered={isHovered} colors={BW} />
        </div>
      ))}
    </>
  );
}

// ── LiquidButton — solid dark CTA (Resume) ────────────────────────────────────
export default function LiquidButton({ href, onClick, children, className = '' }) {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, '');

  const surface = (
    <span
      className={`relative inline-flex items-center justify-center h-[2.2em] px-5 ${className}`}
      style={{ borderRadius: 9999, border: '2px solid #000' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* outer glow */}
      <span className="absolute w-[113%] h-[130%] top-[9%] left-1/2 -translate-x-1/2 blur-[19px] opacity-60 pointer-events-none overflow-hidden" style={{ borderRadius: 9999 }}>
        <span className="absolute inset-0 rounded-full bg-[#d9d9d9] blur-[6px]" />
        <LiquidLayers uid={`${uid}g`} isHovered={hovered} />
      </span>
      {/* under-shadow */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92%] h-[112%] rounded-full bg-black blur-[7px] pointer-events-none" />
      {/* main pill */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-0 rounded-full bg-[#d9d9d9]" />
        <span className="absolute inset-0 rounded-full bg-black" />
        <LiquidLayers uid={uid} isHovered={hovered} />
        {[1,2,3,4,5].map(n => (
          <span key={n} className={`absolute inset-0 rounded-full border-[3px] border-white/20 mix-blend-overlay ${n<=2?'blur-[3px]':n===3?'blur-[5px]':'blur-[4px]'}`} />
        ))}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70%] h-[43%] rounded-full bg-black/60 blur-[15px]" />
      </span>
      {/* label */}
      <span className="relative z-10 text-white font-mono font-semibold tracking-wide text-[13px] whitespace-nowrap select-none">
        {children}
      </span>
    </span>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', textDecoration:'none' }}>{surface}</a>;
  return <button onClick={onClick} style={{ background:'none', border:'none', padding:0, cursor:'pointer', display:'inline-flex' }}>{surface}</button>;
}

// ── LiquidNavLink — ghost pill, liquid reveals on hover ───────────────────────
export function LiquidNavLink({ href, children, onClick }) {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, '');

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'inline-flex' }}
    >
      <span
        className="relative inline-flex items-center justify-center px-3 py-1.5 rounded-full overflow-hidden"
        style={{ minWidth: 64 }}
      >
        {/* liquid bg — shown only on hover */}
        <motion.span
          className="absolute inset-0 rounded-full overflow-hidden"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* base black fill */}
          <span className="absolute inset-0 rounded-full bg-black" />
          <LiquidLayers uid={uid} isHovered={hovered} />
          {[1,2,3].map(n => (
            <span key={n} className="absolute inset-0 rounded-full border-[2px] border-white/10 mix-blend-overlay blur-[3px]" />
          ))}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70%] h-[50%] rounded-full bg-black/50 blur-[10px]" />
        </motion.span>

        {/* label — transitions from dark to white */}
        <motion.span
          className="relative z-10 font-mono text-[13px] font-medium whitespace-nowrap select-none"
          animate={{ color: hovered ? '#ffffff' : 'rgba(0,0,0,0.5)' }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </span>
    </a>
  );
}
