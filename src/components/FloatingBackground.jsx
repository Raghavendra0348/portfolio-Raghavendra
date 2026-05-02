import React, { useEffect, useRef } from 'react';

/**
 * Software-rendered 3D petal ring.
 * Real perspective projection + painter's-algorithm z-sort + diffuse lighting.
 * No WebGL required.
 */
export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;

    /* ── Config ─────────────────────────────────────────── */
    const N          = 28;
    const RING_R     = 1.9;    // ring radius (world units)
    const PETAL_LEN  = 0.80;   // leaf length
    const PETAL_W    = 0.30;   // leaf half-width at widest
    const DEPTH      = 0.11;   // extrusion thickness

    /* ── Petal 2-D profile (tangent/up local coords, centred at 0) ── */
    const profile = [
      [ 0.00,  0.50],   // tip
      [-0.18,  0.42],
      [-PETAL_W, 0.05],
      [-0.18, -0.45],
      [ 0.00, -0.50],   // base
      [ 0.18, -0.45],
      [ PETAL_W, 0.05],
      [ 0.18,  0.42],
    ].map(([x, y]) => [x, y * PETAL_LEN * 1.0]); // scale to PETAL_LEN

    /* ── 3-D math helpers ───────────────────────────────── */
    const dot  = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    const norm = v => { const m = Math.hypot(...v); return m ? v.map(c => c/m) : v; };
    const sub  = (a, b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
    const cross = (a, b) => [
      a[1]*b[2] - a[2]*b[1],
      a[2]*b[0] - a[0]*b[2],
      a[0]*b[1] - a[1]*b[0],
    ];

    /* Rotation matrices */
    function rotY(v, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return [c*v[0]+s*v[2], v[1], -s*v[0]+c*v[2]];
    }
    function rotX(v, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return [v[0], c*v[1]-s*v[2], s*v[1]+c*v[2]];
    }

    /* Perspective projection */
    const FOC = 5.5;  // focal length (world units)
    function project(p) {
      const z = p[2] + FOC;
      const s = (z > 0.01 ? FOC / z : FOC / 0.01);
      // Positioned in right half, vertically centred
      const scale = Math.min(W, H) / 5.2;
      const px = W * 0.67 + p[0] * s * scale;
      const py = H * 0.50 - p[1] * s * scale;
      return [px, py, p[2]];
    }

    /* ── Build geometry ─────────────────────────────────── */
    // Each petal: front polygon, back polygon, side quads
    function buildPetals() {
      const petals = [];
      for (let i = 0; i < N; i++) {
        const alpha = (i / N) * Math.PI * 2;
        const cos = Math.cos(alpha), sin = Math.sin(alpha);
        // Local axes in world space
        const R = [cos, 0, sin];      // radial (extrusion direction)
        const T = [-sin, 0, cos];     // tangential
        const U = [0, 1, 0];          // up

        // Map 2-D profile point → 3-D world (front/back)
        const front3 = profile.map(([lx, ly]) => [
          RING_R*cos + T[0]*lx + U[0]*ly + R[0]* DEPTH/2,
          RING_R*0   + T[1]*lx + U[1]*ly + R[1]* DEPTH/2,
          RING_R*sin + T[2]*lx + U[2]*ly + R[2]* DEPTH/2,
        ]);
        const back3 = profile.map(([lx, ly]) => [
          RING_R*cos + T[0]*lx + U[0]*ly - R[0]* DEPTH/2,
          RING_R*0   + T[1]*lx + U[1]*ly - R[1]* DEPTH/2,
          RING_R*sin + T[2]*lx + U[2]*ly - R[2]* DEPTH/2,
        ]);

        petals.push({ i, alpha, front3, back3, R, T, U });
      }
      return petals;
    }
    const basePetals = buildPetals();

    /* ── Mouse / rotation ───────────────────────────────── */
    let rotYaw = 0,   rotPitch = 0.45;
    let tgtYaw = 0,   tgtPitch = 0.45;
    let dragging = false, px0 = 0, py0 = 0;
    let autoT = 0;

    canvas.style.cursor = 'grab';
    function onDown(e) { dragging = true; px0 = e.clientX; py0 = e.clientY; canvas.style.cursor = 'grabbing'; }
    function onUp()    { dragging = false; canvas.style.cursor = 'grab'; }
    function onMove(e) {
      if (!dragging) return;
      tgtYaw   += (e.clientX - px0) * 0.012;
      tgtPitch += (e.clientY - py0) * 0.008;
      tgtPitch  = Math.max(-0.9, Math.min(1.4, tgtPitch));
      px0 = e.clientX; py0 = e.clientY;
    }
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('mousemove', onMove);

    /* ── Lights ─────────────────────────────────────────── */
    const KEY_LIGHT   = norm([2, 4, 3]);
    const FILL_LIGHT  = norm([-2, 1, 2]);
    const AMBIENT     = 0.32;

    function lightFactor(normal) {
      const kd = Math.max(0, dot(normal, KEY_LIGHT))  * 0.72;
      const fd = Math.max(0, dot(normal, FILL_LIGHT)) * 0.28;
      return Math.min(1, AMBIENT + kd + fd);
    }

    /* ── Resize ─────────────────────────────────────────── */
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    /* ── Draw polygon ───────────────────────────────────── */
    function drawPoly(pts2d, fillStyle, shadowAmt) {
      if (pts2d.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts2d[0][0], pts2d[0][1]);
      for (let k = 1; k < pts2d.length; k++) ctx.lineTo(pts2d[k][0], pts2d[k][1]);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      if (shadowAmt > 0) {
        ctx.shadowBlur  = shadowAmt;
        ctx.shadowColor = 'rgba(0,0,0,0.55)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    /* ── Main loop ──────────────────────────────────────── */
    function tick() {
      animId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      autoT  += 0.010;
      if (!dragging) tgtYaw += 0.008;
      rotYaw   += (tgtYaw   - rotYaw)   * 0.06;
      rotPitch += (tgtPitch - rotPitch) * 0.06;

      /* ── Spotlight position (auto-rotates around ring) ── */
      const spotAngle = autoT;

      /* ── Build renderable polygons ── */
      const faces = [];

      basePetals.forEach(({ i, alpha, front3, back3, R }) => {
        // Apply rotation to all vertices
        const applyRot = v => rotX(rotY(v, rotYaw), rotPitch);

        const fr = front3.map(applyRot);
        const bk = back3.map(applyRot);
        const rn = applyRot(R);   // rotated outward normal (front face)

        // Face centre (average z) for depth sorting
        const fz = fr.reduce((s, v) => s + v[2], 0) / fr.length;
        const bz = bk.reduce((s, v) => s + v[2], 0) / bk.length;

        /* ── Lighting ─────────────────────────────── */
        // Angular distance of this petal from spotlight
        let diff = alpha - spotAngle;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const rawGlow = Math.max(0, 1 - Math.abs(diff) / (Math.PI * 0.38));
        const glow    = rawGlow * rawGlow * (3 - 2 * rawGlow); // smoothstep

        // Base lighting from geometry normal
        const lit = lightFactor(rn);

        // Final colour: white → black based on glow
        const baseGray = Math.round(240 * lit);
        const finalGray = Math.round(baseGray * (1 - glow * 0.92));
        const shade = `rgb(${finalGray},${finalGray},${finalGray})`;

        // Sheen: lighter stripe on front face
        const sheenGray = Math.min(255, finalGray + 35);
        const sheen = `rgba(${sheenGray},${sheenGray},${sheenGray},0.45)`;

        // Side face (top edge only - visible seam)
        for (let k = 0; k < profile.length; k++) {
          const k2 = (k + 1) % profile.length;
          const sideVerts = [fr[k], fr[k2], bk[k2], bk[k]];
          const sz = sideVerts.reduce((s, v) => s + v[2], 0) / 4;
          // Side normal = cross product
          const sn = norm(cross(sub(fr[k2], fr[k]), sub(bk[k], fr[k])));
          const sideLit = lightFactor(sn);
          const sg = Math.round(200 * sideLit * (1 - glow * 0.7));
          faces.push({
            z:    sz,
            pts2d: sideVerts.map(project),
            fill:  `rgb(${sg},${sg},${sg})`,
            shadow: 0,
          });
        }

        // Back face (flip normal)
        const backNorm = rn.map(c => -c);
        const backLit  = lightFactor(backNorm);
        const bg       = Math.round(210 * backLit * (1 - glow * 0.6));
        faces.push({
          z:    bz - 0.001,
          pts2d: [...bk].reverse().map(project),
          fill:  `rgb(${bg},${bg},${bg})`,
          shadow: 0,
        });

        // Front face
        faces.push({
          z:    fz,
          pts2d: fr.map(project),
          fill:  shade,
          sheen,
          shadow: glow * 18,
        });
      });

      /* ── Painter's algorithm: back → front ── */
      faces.sort((a, b) => a.z - b.z);

      for (const face of faces) {
        drawPoly(face.pts2d, face.fill, face.shadow || 0);
        if (face.sheen) drawPoly(face.pts2d, face.sheen, 0);
      }
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, cursor: 'grab' }}
    />
  );
}
