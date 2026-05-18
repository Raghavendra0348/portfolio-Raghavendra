/**
 * ImmersiveCarousel — Framer-free React port
 * Original: https://framer.com/m/ImmersiveCarousel-gIhelg.js
 */
import React, { useEffect, useState, useRef, useCallback, startTransition } from 'react';
import { motion } from 'framer-motion';

export default function ImmersiveCarousel({
  cards = [],
  backgroundColor = '#0A0A0A',
  cardBackground = '#FFFFFF',
  titleColor = '#000000',
  buttonBackground = '#000000',
  buttonTextColor = '#FFFFFF',
  cardRadius = 24,
  imageRadius = 16,
  cardPadding = 20,
  showArrows = true,
  arrowColor = '#FFFFFF',
  enableMouseWheel = true,
  cardShadow = '0 20px 60px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)',
}) {
  const cardCount = cards.length;
  const [activeIndex, setActiveIndex] = useState(Math.floor(cardCount / 2));
  const [isDragging]                  = useState(false);
  const containerRef                  = useRef(null);

  // ── responsive flags (recalc on resize) ─────────────────────────────────
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── navigation ───────────────────────────width────────────────────────────────
  const goToCard = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(cardCount - 1, index));
      startTransition(() => setActiveIndex(clamped));
    },
    [cardCount]
  );
  const handlePrevious = useCallback(() => goToCard(activeIndex - 1), [activeIndex, goToCard]);
  const handleNext     = useCallback(() => goToCard(activeIndex + 1), [activeIndex, goToCard]);

  // ── mouse-wheel support ──────────────────────────────────────────────────
  useEffect(() => {
    if (!enableMouseWheel) return;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 20)  handleNext();
        else if (e.deltaX < -20) handlePrevious();
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, [enableMouseWheel, handleNext, handlePrevious]);

  // ── keyboard support ─────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); handlePrevious(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrevious]);

  // ── card style calculator ────────────────────────────────────────────────
  const getCardStyle = useCallback(
    (index) => {
      const distance    = Math.abs(index - activeIndex);
      const direction   = index - activeIndex;
      const fixedOffset = isMobile ? 90 : isTablet ? 180 : 320;

      if (distance === 0) return { scale: 1,                            opacity: 1, blur: 0,             zIndex: 10, translateX: 0,                  translateY: 0 };
      if (distance === 1) return { scale: isMobile?.92:isTablet?.80:.85, opacity: 1, blur: isMobile?0:3,  zIndex: 5,  translateX: direction*fixedOffset, translateY: isMobile?5:isTablet?15:20 };
      if (distance === 2) return { scale: isMobile?.88:isTablet?.65:.70, opacity: 1, blur: isMobile?1:6,  zIndex: 3,  translateX: direction*fixedOffset, translateY: isMobile?8:isTablet?30:40 };
      return               { scale: isMobile?.85:isTablet?.55:.60, opacity: 1, blur: isMobile?2:8,  zIndex: 1,  translateX: direction*fixedOffset, translateY: isMobile?10:isTablet?45:60 };
    },
    [activeIndex, isMobile, isTablet]
  );

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{
        width: '100%', height: '100%', backgroundColor,
        position: 'relative', overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '0 20px' : '0',
      }}
    >
      {/* ── card stack ── */}
      <div style={{
        position: 'relative', width: '100%',
        height: isMobile ? 'calc(100% - 80px)' : '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {cards.map((card, index) => {
          const cs       = getCardStyle(index);
          const isActive = index === activeIndex;
          const img      = card.image || { src: '', alt: '' };

          return (
            <motion.div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${card.title} — ${isActive ? 'Active' : 'Click to view'}`}
              style={{
                position: 'absolute',
                width:    isMobile ? '95%'   : isTablet ? '65%'  : '800px',
                maxWidth: isMobile ? '460px' : isTablet ? '620px': '800px',
                aspectRatio: '16/9',
                cursor: isActive ? 'default' : 'pointer',
                zIndex: cs.zIndex, outline: 'none',
              }}
              animate={{
                scale:  cs.scale,
                opacity: cs.opacity,
                x:      cs.translateX,
                y:      cs.translateY,
                filter: `blur(${cs.blur}px)`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => { if (!isActive && !isDragging) goToCard(index); }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isActive) {
                  e.preventDefault(); goToCard(index);
                }
              }}
              whileHover={isActive ? { scale: cs.scale * 1.02 } : undefined}
            >
              <div style={{
                width: '100%', height: '100%',
                backgroundColor: cardBackground,
                borderRadius: cardRadius,
                padding: cardPadding,
                paddingBottom: isMobile ? cardPadding + 32 : cardPadding + 24,
                display: 'flex', flexDirection: 'column',
                gap: isMobile ? 12 : 16,
                boxShadow: cardShadow,
              }}>
                {/* title */}
                <div style={{
                  color: titleColor, textAlign: 'center',
                  fontSize: isMobile ? '13px' : '15px',
                  fontWeight: '700', letterSpacing: '0.1em',
                  fontFamily: 'inherit', wordWrap: 'break-word',
                }}>
                  {card.title}
                </div>

                {/* image + CTA */}
                <div style={{ flex: 1, borderRadius: imageRadius, overflow: 'visible', position: 'relative', minHeight: 0 }}>
                  <img
                    src={img.src} alt={img.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: imageRadius }}
                  />
                  <a
                    href={card.link}
                    target="_blank" rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    aria-hidden={!isActive}
                    onClick={(e) => { if (!isActive) e.preventDefault(); }}
                    style={{
                      backgroundColor: buttonBackground,
                      color: buttonTextColor,
                      padding: isMobile ? '14px 28px' : '12px 28px',
                      borderRadius: 100,
                      textAlign: 'center', textDecoration: 'none',
                      fontSize: '13px', fontWeight: '600', letterSpacing: '-0.01em',
                      pointerEvents: isActive ? 'auto' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'absolute',
                      bottom: isMobile ? '-24px' : '-20px',
                      left: '50%', transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap', zIndex: 10,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    {card.buttonText}
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── arrow buttons ── */}
      {showArrows && (
        <>
          {/* prev */}
          <button
            onClick={handlePrevious}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            style={{
              position: 'absolute',
              left:   isMobile ? 'calc(50% - 60px)' : 20,
              top:    isMobile ? 'auto' : '50%',
              bottom: isMobile ? 40 : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              width: isMobile ? 40 : 50, height: isMobile ? 40 : 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: `1px solid ${arrowColor}`,
              color: arrowColor,
              cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: activeIndex === 0 ? 0.3 : 1,
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width={isMobile?16:20} height={isMobile?16:20} viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* next */}
          <button
            onClick={handleNext}
            disabled={activeIndex === cardCount - 1}
            aria-label="Next project"
            style={{
              position: 'absolute',
              right:  isMobile ? 'calc(50% - 60px)' : 20,
              top:    isMobile ? 'auto' : '50%',
              bottom: isMobile ? 40 : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              width: isMobile ? 40 : 50, height: isMobile ? 40 : 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: `1px solid ${arrowColor}`,
              color: arrowColor,
              cursor: activeIndex === cardCount - 1 ? 'not-allowed' : 'pointer',
              opacity: activeIndex === cardCount - 1 ? 0.3 : 1,
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width={isMobile?16:20} height={isMobile?16:20} viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* dot indicators */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? 8 : 20,
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 100,
          }}>
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8, borderRadius: 4,
                  backgroundColor: i === activeIndex ? arrowColor : `${arrowColor}55`,
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
