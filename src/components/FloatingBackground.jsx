import React, { useEffect, useRef } from 'react';

class Blob {
  constructor(x, y, radius, numPoints, speed, drift) {
    this.cx = x;
    this.cy = y;
    this.baseRadius = radius;
    this.numPoints = numPoints;
    this.speed = speed;
    this.phases = Array.from({ length: numPoints }, () => Math.random() * Math.PI * 2);
    this.freqs  = Array.from({ length: numPoints }, () => 0.5 + Math.random() * 1.0);
    this.amps   = Array.from({ length: numPoints }, () => radius * (0.15 + Math.random() * 0.25));
    this.vx = (Math.random() - 0.5) * drift * 2;
    this.vy = (Math.random() - 0.5) * drift * 2;
    this.time = Math.random() * 100;
    this.W = 1; this.H = 1;
  }

  update() {
    this.time += this.speed;
    this.cx += this.vx;
    this.cy += this.vy;
    const pad = this.baseRadius * 2;
    if (this.cx >  this.W + pad) this.cx = -pad;
    if (this.cx < -pad)          this.cx =  this.W + pad;
    if (this.cy >  this.H + pad) this.cy = -pad;
    if (this.cy < -pad)          this.cy =  this.H + pad;
  }

  getPoints() {
    return Array.from({ length: this.numPoints }, (_, i) => {
      const angle = (i / this.numPoints) * Math.PI * 2;
      const r = this.baseRadius
        + this.amps[i] * Math.sin(this.freqs[i] * this.time + this.phases[i]);
      return { x: this.cx + Math.cos(angle) * r, y: this.cy + Math.sin(angle) * r };
    });
  }

  draw(ctx) {
    const pts = this.getPoints();
    const n = pts.length;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const curr     = pts[i];
      const next     = pts[(i + 1) % n];
      const prev     = pts[(i - 1 + n) % n];
      const nextnext = pts[(i + 2) % n];
      if (i === 0) ctx.moveTo(curr.x, curr.y);
      const t = 0.45;
      ctx.bezierCurveTo(
        curr.x + (next.x - prev.x) * t / 2,
        curr.y + (next.y - prev.y) * t / 2,
        next.x - (nextnext.x - curr.x) * t / 2,
        next.y - (nextnext.y - curr.y) * t / 2,
        next.x, next.y
      );
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.82)';
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

    function build() {
      const s = Math.min(W, H);
      blobs = [
        new Blob(W * 0.10, H * 0.50, s * 0.26, 10, 0.022, 1.8),
        new Blob(W * 0.80, H * 0.20, s * 0.16, 9,  0.030, 2.2),
        new Blob(W * 0.62, H * 0.65, s * 0.10, 8,  0.040, 2.8),
        new Blob(W * 0.38, H * 0.28, s * 0.07, 7,  0.050, 3.2),
        new Blob(W * 0.90, H * 0.80, s * 0.20, 10, 0.018, 1.5),
      ];
      blobs.forEach(b => { b.W = W; b.H = H; });
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      build();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(b => { b.W = W; b.H = H; b.update(); b.draw(ctx); });
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
