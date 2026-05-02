import React, { useEffect, useRef } from 'react';

export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, animId;
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 160;
    const particles = [];

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        // 3D coordinates in [-1, 1]
        this.x = (Math.random() - 0.5) * 2;
        this.y = (Math.random() - 0.5) * 2;
        this.z = Math.random() * 2 + 0.5; // depth [0.5, 2.5]
        this.vx = (Math.random() - 0.5) * 0.0006;
        this.vy = (Math.random() - 0.5) * 0.0004;
        this.vz = (Math.random() - 0.5) * 0.0003;
      }
      project() {
        const fov = 2.5;
        const scale = fov / (fov + this.z);
        return {
          sx: width / 2 + this.x * scale * width * 0.5,
          sy: height / 2 + this.y * scale * height * 0.5,
          scale,
        };
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        // Wrap around
        if (this.x > 1.5) this.x = -1.5;
        if (this.x < -1.5) this.x = 1.5;
        if (this.y > 1.5) this.y = -1.5;
        if (this.y < -1.5) this.y = 1.5;
        if (this.z > 3) this.z = 0.5;
        if (this.z < 0.5) this.z = 3;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Slow global rotation
    let angle = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      angle += 0.0008;

      // Apply gentle rotation to all particles
      const cos = Math.cos(angle * 0.3);
      const sin = Math.sin(angle * 0.3);

      const projected = particles.map(p => {
        p.update();
        // Rotate x/z plane
        const rx = p.x * cos - p.z * 0.15 * sin;
        const rz = p.z + p.x * 0.08 * sin;
        const fov = 2.5;
        const scale = fov / (fov + rz);
        return {
          sx: width / 2 + rx * scale * width * 0.45,
          sy: height / 2 + p.y * scale * height * 0.45,
          scale,
          rz,
        };
      });

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < projected.length; i++) {
        const { sx, sy, scale, rz } = projected[i];
        const radius = Math.max(1, scale * 2.5);
        const depth = 1 - (rz - 0.5) / 3;
        const opacity = 0.08 + depth * 0.22;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
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
