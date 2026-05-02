import React, { useEffect, useRef } from 'react';

/**
 * 3D torus ring of overlapping leaves.
 * A spotlight glow smoothly follows the mouse around the ring.
 * When the mouse leaves, the glow auto-rotates idly.
 */
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    const N = 28;           // leaves in the ring
    const TILT = 0.52;      // vertical squish for 3D perspective (1 = flat, 0.5 = tilted)

    // Smooth glow tracking
    let glowAngle = -Math.PI / 2;  // starts at top
    let targetGlowAngle = glowAngle;
    let idleT = 0;
    let isHovering = false;

    // ── Mouse: compute angle from canvas centre ──────────────────
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left  - W / 2;
      const my = (e.clientY - rect.top  - H / 2) / TILT;   // un-squish y
      const d  = Math.hypot(mx, my);
      const threshold = Math.min(W, H) * 0.42;
      if (d < threshold) {
        targetGlowAngle = Math.atan2(my, mx);
        isHovering = true;
      }
    }
    function onMouseLeave() { isHovering = false; }

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    // ── Draw one 3D-looking leaf ─────────────────────────────────
    // Leaf sits in local coords: tip at (0, -outerR), base at (0, -innerR)
    function drawLeaf(petalAngle, innerR, outerR, halfW, darkFrac) {
      const cx = W / 2;
      const cy = H / 2;
      const len  = outerR - innerR;
      const cos  = Math.cos(petalAngle);
      const sin  = Math.sin(petalAngle);

      // 4 key points in ring-local polar space, then project
      function pt(r, sideOffset) {
        // sideOffset is perpendicular to petal radial direction
        const px = cos * r - sin * sideOffset;
        const py = sin * r + cos * sideOffset;
        return { x: cx + px, y: cy + py * TILT };
      }

      const base   = innerR;
      const tip    = outerR;
      const bulge  = innerR + len * 0.55;  // widest point

      // ── Back face (slightly offset, darker) ──
      const backOff = len * 0.04;   // 3D thickness illusion
      ctx.beginPath();
      const btl = pt(tip   + backOff, -halfW * 0.3);
      const btr = pt(tip   + backOff,  halfW * 0.3);
      const bbl = pt(base  - backOff, -halfW * 0.25);
      const bbr = pt(base  - backOff,  halfW * 0.25);
      const bml = pt(bulge + backOff, -halfW * 0.95);
      const bmr = pt(bulge + backOff,  halfW * 0.95);
      ctx.moveTo(bbl.x, bbl.y);
      ctx.bezierCurveTo(bml.x - backOff, bml.y, btl.x, btl.y, btl.x, btl.y);
      ctx.lineTo(btr.x, btr.y);
      ctx.bezierCurveTo(bmr.x + backOff, bmr.y, bbr.x, bbr.y, bbr.x, bbr.y);
      ctx.closePath();
      const backG = Math.floor(200 - darkFrac * 160);
      ctx.fillStyle = `rgb(${backG},${backG},${backG})`;
      ctx.fill();

      // ── Front face ──
      ctx.beginPath();
      const tl = pt(tip,   -halfW * 0.22);
      const tr = pt(tip,    halfW * 0.22);
      const bl = pt(base,  -halfW * 0.18);
      const br = pt(base,   halfW * 0.18);
      const ml = pt(bulge, -halfW);
      const mr = pt(bulge,  halfW);
      ctx.moveTo(bl.x, bl.y);
      ctx.bezierCurveTo(ml.x, ml.y, tl.x, tl.y, tl.x, tl.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.bezierCurveTo(mr.x, mr.y, br.x, br.y, br.x, br.y);
      ctx.closePath();

      // Fill: light-gray → dark based on darkFrac (glow proximity)
      const g   = Math.floor(235 - darkFrac * 215);
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      if (darkFrac > 0.1) {
        ctx.shadowBlur  = darkFrac * 22;
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── Specular sheen: white gradient on upper-left ──
      const sheenGrad = ctx.createLinearGradient(
        ml.x, ml.y,
        mr.x, mr.y
      );
      sheenGrad.addColorStop(0,    `rgba(255,255,255,${0.60 - darkFrac * 0.45})`);
      sheenGrad.addColorStop(0.40, `rgba(255,255,255,${0.25 - darkFrac * 0.20})`);
      sheenGrad.addColorStop(1,    `rgba(0,0,0,${darkFrac * 0.08})`);
      ctx.fillStyle = sheenGrad;
      ctx.fill();

      // ── Glint dot near tip of darkened leaves ──
      if (darkFrac > 0.55) {
        const glintPt = pt(outerR - len * 0.12, 0);
        const rg = ctx.createRadialGradient(
          glintPt.x, glintPt.y, 0,
          glintPt.x, glintPt.y, halfW * 0.7
        );
        rg.addColorStop(0,   `rgba(255,255,255,${darkFrac * 0.85})`);
        rg.addColorStop(0.4, `rgba(255,255,255,${darkFrac * 0.25})`);
        rg.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.fillStyle = rg;
        ctx.fill();
      }
    }

    // ── Smooth angle lerp (shortest arc) ────────────────────────
    function lerpAngle(a, b, t) {
      let d = b - a;
      while (d >  Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      return a + d * t;
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      const size   = Math.min(W, H);
      const outerR = size * 0.38;
      const innerR = size * 0.15;
      const halfW  = (outerR - innerR) * 0.24;

      // Glow angle: follow mouse or idle-rotate
      if (isHovering) {
        glowAngle = lerpAngle(glowAngle, targetGlowAngle, 0.07);
      } else {
        idleT    += 0.008;
        glowAngle = lerpAngle(glowAngle, -Math.PI / 2 + idleT, 0.03);
      }

      // Glow spread: ~80° arc
      const SPREAD = Math.PI * 0.44;

      // Sort petals back-to-front for correct 3D overlap
      // In a tilted ring, petals at bottom (angle ≈ π/2) are "in front"
      const order = Array.from({ length: N }, (_, i) => i)
        .sort((a, b) => {
          const ya = Math.sin((a / N) * Math.PI * 2);
          const yb = Math.sin((b / N) * Math.PI * 2);
          return ya - yb; // draw bottom (front) last
        });

      for (const i of order) {
        const petalAngle = (i / N) * Math.PI * 2;

        // Angular distance to glow centre
        let diff = petalAngle - glowAngle;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const dist = Math.abs(diff);

        // Smooth glow falloff
        const raw  = Math.max(0, 1 - dist / SPREAD);
        const dark = raw * raw * (3 - 2 * raw);  // smoothstep

        drawLeaf(petalAngle, innerR, outerR, halfW, dark);
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
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
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
