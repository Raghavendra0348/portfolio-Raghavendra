import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SpiralAnimation } from '@/components/ui/spiral-animation';

const INTRO_DURATION_MS = 5000;
const LOADING_PHRASES = [
  'Initialising universe...',
  'Calibrating creativity...',
  'Loading my world...',
  'Almost there...',
];

export default function IntroScreen({ onComplete }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const phrases = setInterval(() => {
      setPhraseIndex(i => Math.min(i + 1, LOADING_PHRASES.length - 1));
    }, INTRO_DURATION_MS / LOADING_PHRASES.length);
    const complete = setTimeout(onComplete, INTRO_DURATION_MS);
    return () => {
      clearInterval(phrases);
      clearTimeout(complete);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
    >
      {/* Keep the decorative spiral visible at full brightness. */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <SpiralAnimation />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-5 py-16 text-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-4xl"
        >
          <p className="font-mono text-white/60 text-xs tracking-[0.35em] uppercase mb-4">
            Portfolio
          </p>
          <h1
            className="text-white font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 8vw, 6rem)' }}
          >
            Raghavendra
          </h1>
          <p
            className="text-white/90 text-base md:text-xl tracking-wide mt-4 font-medium"
            style={{ textShadow: '0 2px 8px #000, 0 0 16px #000' }}
          >
            Full Stack Developer
          </p>
        </motion.div>

        <div role="status" aria-label="Loading portfolio" className="flex flex-col items-center gap-4">
          <p aria-hidden="true" className="font-mono text-white/70 text-[10px] sm:text-xs tracking-[0.16em] uppercase">
            {LOADING_PHRASES[phraseIndex]}
          </p>
        </div>
      </div>

      <p className="absolute bottom-6 left-4 right-4 text-center font-mono text-white/50 text-[10px] tracking-wider">
        arellaraghavendra@gmail.com
      </p>
    </motion.div>
  );
}
