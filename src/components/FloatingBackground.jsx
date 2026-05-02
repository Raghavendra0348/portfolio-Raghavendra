import React, { useEffect, useRef } from 'react';

// Organic blob whose CENTER follows a lemniscate (∞ symbol) path continuously
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    const N = 16; // points on blob perimeter
    const phases = Array.from({ length: N }, (_, i) => (i / N) * Math.PI * 2);
    const freqs  = Array.from({ length: N }, () => 0.35 + Math.random() * 0.45);
    const amps   = Array.from({ length: N }, () => 0.13 + Math.random() * 0.14);

    let t = 0;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    // Lemniscate of Bernoulli — ∞ symbol parametric
    // x(t) = a·cos(t) / (1 + sin²(t))
    // y(t) = a·sin(t)·cos(t) / (1 + sin²(t))
    function infinityCenter(t) {
      const a  = Math.min(W, H) * 0.28;   // size of the ∞ loop
      const st = Math.sin(t), ct = Math.cos(t);
      const denom = 1 + st * st;
      return {
        x: W / 2 + (a * ct)      / denom,
        y: H / 2 + (a * st * ct) / denom,
      };
    }

    function getPoints(cx, cy, t) {
      const base = Math.min(W, H) * 0.22;
      return Array.from({ length: N }, (_, i) => {
        const angle = (i / N) * Math.PI * 2;
        const r = base * (1
          + amps[i]            * Math.sin(freqs[i]        * t + phases[i])
          + amps[i] * 0.45     * Math.sin(freqs[i] * 2.3  * t + phases[i] + 1.1)
        );
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
      });
    }

    function drawBlob(pts) {
      const n = pts.length;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const cur  = pts[i];
        const nxt  = pts[(i + 1) % n];
        const prv  = pts[(i - 1 + n) % n];
        const nn   = pts[(i + 2) % n];
        if (i === 0) ctx.moveTo(cur.x, cur.y);
        const k = 0.42;
        ctx.bezierCurveTo(
          cur.x + (nxt.x - prv.x) * k / 2,
          cur.y + (nxt.y - prv.y) * k / 2,
          nxt.x - (nn.x  - cur.x) * k / 2,
          nxt.y - (nn.y  - cur.y) * k / 2,
          nxt.x, nxt.y
        );
      }
      ctx.closePath();
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012; // speed of travel along ∞ path

      const { x: cx, y: cy } = infinityCenter(t);
      drawBlob(getPoints(cx, cy, t));

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
