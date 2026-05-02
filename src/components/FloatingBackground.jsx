import React, { useEffect, useRef } from 'react';

// Smooth organic morphing blobs — rich black on white, infinite loop

class Blob {
  constructor(x, y, radius, numPoints, speed, opts = {}) {
    this.cx = x;
    this.cy = y;
    this.baseRadius = radius;
    this.numPoints = numPoints;
    this.speed = speed;
    this.phases = Array.from({ length: numPoints }, () => Math.random() * Math.PI * 2);
    this.freqs = Array.from({ length: numPoints }, () => 0.4 + Math.random() * 0.6);
    this.amplitudes = Array.from({ length: numPoints }, () => radius * (0.12 + Math.random() * 0.2));
    this.vx = (Math.random() - 0.5) * (opts.drift || 0.25);
    this.vy = (Math.random() - 0.5) * (opts.drift || 0.18);
    this.opacity = opts.opacity || 0.06;
    this.time = Math.random() * 100;
    this.W = 0;
    this.H = 0;
  }

  update() {
    this.time += this.speed;
    this.cx += this.vx;
    this.cy += this.vy;
    // Wrap with padding
    const pad = this.baseRadius * 2;
    if (this.cx > this.W + pad) this.cx = -pad;
    if (this.cx < -pad) this.cx = this.W + pad;
    if (this.cy > this.H + pad) this.cy = -pad;
    if (this.cy < -pad) this.cy = this.H + pad;
  }

  // Get the N points of the blob polygon
  getPoints() {
    const pts = [];
    for (let i = 0; i < this.numPoints; i++) {
      const angle = (i / this.numPoints) * Math.PI * 2;
      const r = this.baseRadius
        + this.amplitudes[i] * Math.sin(this.freqs[i] * this.time + this.phases[i]);
      pts.push({
        x: this.cx + Math.cos(angle) * r,
        y: this.cy + Math.sin(angle) * r,
      });
    }
    return pts;
  }

  draw(ctx) {
    const pts = this.getPoints();
    const n = pts.length;

    ctx.beginPath();
    // Catmull-Rom–style smooth curve through points
    for (let i = 0; i < n; i++) {
      const curr = pts[i];
      const next = pts[(i + 1) % n];
      const prev = pts[(i - 1 + n) % n];
      const nextnext = pts[(i + 2) % n];

      if (i === 0) ctx.moveTo(curr.x, curr.y);

      // Control points (tension = 0.4)
      const t = 0.4;
      const cp1x = curr.x + (next.x - prev.x) * t / 2;
      const cp1y = curr.y + (next.y - prev.y) * t / 2;
      const cp2x = next.x - (nextnext.x - curr.x) * t / 2;
      const cp2y = next.y - (nextnext.y - curr.y) * t / 2;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
    }
    ctx.closePath();

    // Gradient fill — rich black center fading out
    const grad = ctx.createRadialGradient(
      this.cx, this.cy, 0,
      this.cx, this.cy, this.baseRadius * 1.4
    );
    grad.addColorStop(0, `rgba(0,0,0,${this.opacity})`);
    grad.addColorStop(1, `rgba(0,0,0,0)`);

    ctx.fillStyle = grad;
    ctx.fill();
  }
}

export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    let blobs = [];

    function buildBlobs() {
      blobs = [
        // Large hero blob — left side, slow morph
        new Blob(W * 0.12, H * 0.5, Math.min(W, H) * 0.28, 10, 0.006, { opacity: 0.055, drift: 0.15 }),
        // Medium blob — upper right
        new Blob(W * 0.78, H * 0.22, Math.min(W, H) * 0.16, 9, 0.009, { opacity: 0.045, drift: 0.2 }),
        // Small sphere-ish — center right
        new Blob(W * 0.65, H * 0.6, Math.min(W, H) * 0.09, 8, 0.014, { opacity: 0.06, drift: 0.28 }),
        // Tiny drifting blob
        new Blob(W * 0.4, H * 0.3, Math.min(W, H) * 0.06, 7, 0.018, { opacity: 0.04, drift: 0.35 }),
        // Background large soft blob — right edge
        new Blob(W * 0.9, H * 0.75, Math.min(W, H) * 0.22, 10, 0.005, { opacity: 0.035, drift: 0.1 }),
      ];
      blobs.forEach(b => { b.W = W; b.H = H; });
    }

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildBlobs();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      for (const b of blobs) {
        b.W = W;
        b.H = H;
        b.update();
        b.draw(ctx);
      }

      animId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
