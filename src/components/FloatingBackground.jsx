import React, { useEffect, useRef } from 'react';

// Spinning fan vortex — overlapping petal blades rotating in a circle
// Inspired by the reference: layered fan petals with black accent highlight zone
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    let t = 0;
    const N = 30;          // number of petals
    const SPEED = 0.007;   // rotation speed

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    // Draw a single surfboard-shaped petal
    // positioned at (0, -midR) in local space, along Y axis
    function petalPath(ctx, innerR, outerR, halfW) {
      const len  = outerR - innerR;
      const h4   = len * 0.25;
      const topY = -outerR;
      const botY = -innerR;
      const midY = -(innerR + len / 2);

      ctx.beginPath();
      ctx.moveTo(0, topY);
      // left side: out from tip → wide middle → back to base
      ctx.bezierCurveTo(-halfW * 0.35, topY + h4,
                        -halfW,        midY,
                        -halfW * 0.35, botY - h4);
      ctx.bezierCurveTo(-halfW * 0.1, botY, halfW * 0.1, botY,
                        halfW * 0.35, botY - h4);
      // right side back to tip
      ctx.bezierCurveTo(halfW,        midY,
                        halfW * 0.35, topY + h4,
                        0,            topY);
      ctx.closePath();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      const cx   = W / 2;
      const cy   = H / 2;
      const size = Math.min(W, H);

      const outerR = size * 0.40;
      const innerR = size * 0.16;
      const halfW  = (outerR - innerR) * 0.20;  // half-width of each petal

      // Fan blade tilt — petals sweep backwards like real fan blades
      const TILT = -Math.PI / 6;

      t += SPEED;

      // Highlight spotlight angle (rotates with the fan = static relative to fan)
      // Black petals occupy roughly 12% of the circle
      const HIGHLIGHT_N = 4;

      for (let i = 0; i < N; i++) {
        const baseAngle = (i / N) * Math.PI * 2 + t;

        // ─── Per-petal color ───
        // Highlight zone: last HIGHLIGHT_N petals drawn = on top + black accent
        const isHighlight = i >= N - HIGHLIGHT_N;
        const highlightFrac = isHighlight
          ? (i - (N - HIGHLIGHT_N)) / (HIGHLIGHT_N - 1)  // 0 → 1
          : -1;

        let fillColor, alpha, shadowBlur, shadowColor;

        if (isHighlight) {
          // Transition from dark-gray → pure black + slight glow
          const g = Math.floor(40 - highlightFrac * 40);
          fillColor   = `rgb(${g},${g},${g})`;
          alpha       = 0.9 + highlightFrac * 0.1;
          shadowBlur  = highlightFrac * 18;
          shadowColor = 'rgba(0,0,0,0.35)';
        } else {
          // Petals cycle from white (back) to light gray (just before highlight)
          const p  = i / (N - HIGHLIGHT_N);
          const gv = Math.floor(235 - p * 55);   // 235 → 180
          fillColor  = `rgb(${gv},${gv},${gv})`;
          alpha      = 0.55 + p * 0.30;
          shadowBlur = 4 + p * 8;
          shadowColor = 'rgba(0,0,0,0.18)';
        }

        ctx.save();
        ctx.globalAlpha  = alpha;
        ctx.shadowBlur   = shadowBlur;
        ctx.shadowColor  = shadowColor;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;

        ctx.translate(cx, cy);
        ctx.rotate(baseAngle + TILT);

        petalPath(ctx, innerR, outerR, halfW);
        ctx.fillStyle = fillColor;
        ctx.fill();

        // Subtle highlight sheen on non-black petals
        if (!isHighlight) {
          ctx.shadowBlur = 0;
          const grad = ctx.createLinearGradient(0, -outerR, 0, -innerR);
          grad.addColorStop(0,   'rgba(255,255,255,0.45)');
          grad.addColorStop(0.5, 'rgba(255,255,255,0.10)');
          grad.addColorStop(1,   'rgba(255,255,255,0.0)');
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Sheen on black petals — subtle white glint near tip
          ctx.shadowBlur = 0;
          const glint = ctx.createRadialGradient(0, -outerR + (outerR - innerR) * 0.18, 0,
                                                  0, -outerR + (outerR - innerR) * 0.18, halfW * 1.2);
          glint.addColorStop(0,   'rgba(255,255,255,0.55)');
          glint.addColorStop(1,   'rgba(255,255,255,0.0)');
          ctx.fillStyle = glint;
          ctx.fill();
        }

        ctx.restore();
      }

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
