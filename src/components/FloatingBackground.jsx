import React, { useEffect, useRef } from 'react';

// One single large organic blob — morphs continuously as a unified shape
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    const NUM_POINTS = 14;
    // Each point has its own phase + frequency for smooth organic morph
    const phases = Array.from({ length: NUM_POINTS }, () => Math.random() * Math.PI * 2);
    const freqs  = Array.from({ length: NUM_POINTS }, () => 0.4 + Math.random() * 0.5);

    let time = 0;
    // Blob center drifts slowly
    let cx = 0, cy = 0;
    let vx = 0.6, vy = 0.35;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W * 0.42;
      cy = H * 0.50;
    }

    function getPoints(t) {
      const baseR = Math.min(W, H) * 0.38;
      return Array.from({ length: NUM_POINTS }, (_, i) => {
        const angle = (i / NUM_POINTS) * Math.PI * 2;
        // Multiple harmonic layers for rich organic shape
        const r = baseR
          + baseR * 0.22 * Math.sin(freqs[i]       * t + phases[i])
          + baseR * 0.12 * Math.sin(freqs[i] * 2.1 * t + phases[i] * 1.3)
          + baseR * 0.07 * Math.sin(freqs[i] * 3.7 * t + phases[i] * 0.7);
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
      });
    }

    function drawBlob(pts) {
      const n = pts.length;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const curr     = pts[i];
        const next     = pts[(i + 1) % n];
        const prev     = pts[(i - 1 + n) % n];
        const nextnext = pts[(i + 2) % n];
        if (i === 0) ctx.moveTo(curr.x, curr.y);
        const tension = 0.42;
        ctx.bezierCurveTo(
          curr.x + (next.x - prev.x) * tension / 2,
          curr.y + (next.y - prev.y) * tension / 2,
          next.x - (nextnext.x - curr.x) * tension / 2,
          next.y - (nextnext.y - curr.y) * tension / 2,
          next.x, next.y
        );
      }
      ctx.closePath();
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      time += 0.018;

      // Drift center
      cx += vx;
      cy += vy;
      // Bounce off edges (with base radius margin)
      const margin = Math.min(W, H) * 0.22;
      if (cx > W + margin) cx = -margin;
      if (cx < -margin)    cx =  W + margin;
      if (cy > H + margin) cy = -margin;
      if (cy < -margin)    cy =  H + margin;

      drawBlob(getPoints(time));
      animId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
