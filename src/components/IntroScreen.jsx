import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpiralAnimation } from '@/components/ui/spiral-animation';

const LOADING_PHRASES = [
  'Initialising universe...',
  'Calibrating creativity...',
  'Loading my world...',
  'Almost there...',
];

export default function IntroScreen({ onComplete }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showEnter, setShowEnter]     = useState(false);
  const [exiting, setExiting]         = useState(false);

  /* Cycle through loading phrases */
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex(i => {
        const next = i + 1;
        if (next >= LOADING_PHRASES.length) {
          clearInterval(id);
          setTimeout(() => setShowEnter(true), 600);
          return i;
        }
        return next;
      });
    }, 1100);
    return () => clearInterval(id);
  }, []);

  /* Auto-advance after 6 s so user doesn't have to click */
  useEffect(() => {
    const id = setTimeout(() => handleEnter(), 6800);
    return () => clearTimeout(id);
  }, []);

  function handleEnter() {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 1100);
  }

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {/* Spiral canvas */}
          <div className="absolute inset-0">
            <SpiralAnimation />
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* Centre text block */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">

            {/* Name — big headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              className="text-center"
            >
              <p className="font-mono text-white/30 text-xs tracking-[0.35em] uppercase mb-3">
                portfolio
              </p>
              <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Raghavendra
              </h1>
              <p className="text-white/20 text-base md:text-lg tracking-widest mt-2 font-light">
                Full Stack Developer
              </p>
            </motion.div>

            {/* Thin separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              className="w-16 h-px bg-white/20 origin-left"
            />

            {/* Cycling loading phrase */}
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase text-center"
                >
                  {LOADING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Enter button — fades in when ready */}
            <AnimatePresence>
              {showEnter && (
                <motion.button
                  key="enter"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  onClick={handleEnter}
                  className="mt-4 text-white/60 text-sm tracking-[0.35em] uppercase font-extralight
                             border border-white/15 rounded-full px-8 py-3
                             hover:text-white hover:border-white/50
                             transition-all duration-500 hover:tracking-[0.5em]
                             backdrop-blur-sm"
                >
                  
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center"
          >
            <p className="font-mono text-white/15 text-[10px] tracking-[0.3em] uppercase">
              arellaraghavendra@gmail.com
            </p>
          </motion.div>
        </motion.div>
      ) : (
        /* Fade-out overlay */
        <motion.div
          key="exit"
          className="fixed inset-0 z-[9998] bg-black pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
}
