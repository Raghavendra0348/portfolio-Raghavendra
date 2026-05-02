import React, { useEffect, useRef } from 'react';

/**
 * 3D petal ring — matches reference:
 * Smooth rounded-capsule petals in a fan-swept ring,
 * tilted for 3D perspective, with a travelling glow spotlight.
 */
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    /* ─── Config ──────────────────────────────────────── */
    const N          = 24;      // number of petals
    const TILT       = 0.50;    // vertical squish (0 = flat, 1 = upright)
    const SWEEP      = 0.38;    // fan-blade sweep (radians each petal leans)
    const SPEED      = 0.010;   // glow travel speed
    const SPREAD     = Math.PI * 0.36;  // glow arc half-width

    let glowT  = 0;
    let rotY   = 0;   // manual drag rotation
    let tgtRot = 0;
    let isDrag = false, px0 = 0;

    canvas.addEventListener('mousedown', e => { isDrag = true; px0 = e.clientX; });
    window.addEventListener('mouseup',   () => { isDrag = false; });
    window.addEventListener('mousemove', e => {
      if (!isDrag) return;
      tgtRot += (e.clientX - px0) * 0.010;
      px0 = e.clientX;
    });

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    /* ─── Draw one petal ──────────────────────────────── */
    // In local space: petal long-axis = Y, centred at origin
    // pw = half-width, ph = half-height
    function petalPath(pw, ph) {
      ctx.beginPath();
      // Fully-rounded capsule (stadium shape)
      ctx.moveTo(-pw, -ph + pw);
      ctx.arc(0, -ph + pw, pw, Math.PI, 0);
      ctx.lineTo(pw, ph - pw);
      ctx.arc(0, ph - pw, pw, 0, Math.PI);
      ctx.closePath();
    }

    /* ─── Render loop ─────────────────────────────────── */
    function tick() {
      animId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      const S  = Math.min(W, H);
      const cr = S * 0.38;          // ring radius (canvas px)
      const pw = cr * 0.145;        // petal half-width
      const ph = cr * 0.38;         // petal half-height
      const cx = W * 0.66;          // ring centre-X (right half)
      const cy = H * 0.50;          // ring centre-Y

      glowT += SPEED;
      if (!isDrag) tgtRot += 0.004;
      rotY += (tgtRot - rotY) * 0.06;

      // Build petal descriptors sorted back-to-front
      const petals = [];
      for (let i = 0; i < N; i++) {
        const base  = (i / N) * Math.PI * 2 + rotY;
        // Petal centre position in 3D-ish space
        const x3    = Math.cos(base) * cr;
        const y3raw = Math.sin(base) * cr;
        const y2    = y3raw * TILT;         // flattened for tilt
        const z     = y3raw;                // z-depth = raw y (not squished)

        // Petal draw rotation: radial direction + sweep offset
        const drawAngle = base + SWEEP;

        // Glow amount (0-1) based on proximity to spotlight
        let diff = base - glowT;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const raw  = Math.max(0, 1 - Math.abs(diff) / SPREAD);
        const glow = raw * raw * (3 - 2 * raw);

        petals.push({ x: cx + x3, y: cy + y2, z, drawAngle, glow, i });
      }

      // Painter: draw from back (most negative z) to front
      petals.sort((a, b) => a.z - b.z);

      for (const { x, y, drawAngle, glow } of petals) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(drawAngle);

        // ── Side edge (thin 3-D depth strip) ──────────
        ctx.save();
        ctx.translate(pw * 0.6, pw * 0.15);
        ctx.scale(0.22, 0.97);
        petalPath(pw, ph);
        const edgeG = Math.round(170 - glow * 110);
        ctx.fillStyle = `rgb(${edgeG},${edgeG},${edgeG})`;
        ctx.fill();
        ctx.restore();

        // ── Main face ─────────────────────────────────
        petalPath(pw, ph);

        // Main face colour: light-gray (0 glow) → black (full glow)
        const baseGray = 240;
        const fg = Math.round(baseGray - glow * (baseGray - 8));

        // Gradient: lighter top-left edge (the "bevel highlight")
        const grad = ctx.createLinearGradient(-pw, -ph, pw * 0.6, ph * 0.3);
        const hi  = Math.min(255, fg + 55);
        const lo  = Math.max(0,   fg - 20);
        grad.addColorStop(0,   `rgb(${hi},${hi},${hi})`);
        grad.addColorStop(0.4, `rgb(${fg},${fg},${fg})`);
        grad.addColorStop(1,   `rgb(${lo},${lo},${lo})`);
        ctx.fillStyle = grad;

        // Drop shadow for depth
        ctx.shadowColor  = 'rgba(0,0,0,0.28)';
        ctx.shadowBlur   = 8 + glow * 14;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;
        ctx.fill();
        ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

        // ── Specular glint on glowing petals ──────────
        if (glow > 0.3) {
          petalPath(pw, ph);
          const glintR = pw * 0.7;
          const glintX = -pw * 0.18;
          const glintY = -ph * 0.55;
          const glint  = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, glintR);
          glint.addColorStop(0,   `rgba(255,255,255,${glow * 0.90})`);
          glint.addColorStop(0.45,`rgba(255,255,255,${glow * 0.30})`);
          glint.addColorStop(1,   'rgba(255,255,255,0)');
          ctx.fillStyle = glint;
          ctx.fill();
        }

        // ── Bevel highlight — thin top-left rim ───────
        petalPath(pw, ph);
        const bev = ctx.createLinearGradient(-pw, -ph, -pw * 0.1, 0);
        bev.addColorStop(0,   `rgba(255,255,255,${0.55 - glow * 0.35})`);
        bev.addColorStop(0.6, 'rgba(255,255,255,0.06)');
        bev.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.fillStyle = bev;
        ctx.fill();

        ctx.restore();
      }
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mouseup',   () => {});
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, cursor: 'grab', pointerEvents: 'none' }}
    />
  );
}
