import React, { useEffect, useRef } from 'react';

// 3D wireframe floating cubes / rectangular prisms
// Pure black (#000) on white — infinite loop

function createCube(cx, cy, cz, size) {
  const h = size / 2;
  // 8 vertices of a cube
  return {
    verts: [
      [-h, -h, -h], [ h, -h, -h], [ h,  h, -h], [-h,  h, -h],
      [-h, -h,  h], [ h, -h,  h], [ h,  h,  h], [-h,  h,  h],
    ],
    edges: [
      [0,1],[1,2],[2,3],[3,0], // back face
      [4,5],[5,6],[6,7],[7,4], // front face
      [0,4],[1,5],[2,6],[3,7], // connecting edges
    ],
    cx, cy, cz,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    vrx: (Math.random() - 0.5) * 0.008,
    vry: (Math.random() - 0.5) * 0.01,
    vrz: (Math.random() - 0.5) * 0.006,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: 0.06 + Math.random() * 0.12,
    size,
  };
}

export default function FloatingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    // Create varied cubes spread across the viewport
    const shapes = [];
    const SHAPE_COUNT = 14;
    for (let i = 0; i < SHAPE_COUNT; i++) {
      const size = 40 + Math.random() * 100;
      shapes.push(createCube(
        (Math.random() - 0.5) * 1600,
        (Math.random() - 0.5) * 900,
        Math.random() * 600 - 100,
        size
      ));
    }

    // Project 3D point → 2D screen
    function project(x, y, z) {
      const fov = 600;
      const d = fov / (fov + z + 300);
      return { sx: W / 2 + x * d, sy: H / 2 + y * d, d };
    }

    // Rotate point around X axis
    function rotX(v, a) {
      const [x, y, z] = v;
      return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
    }
    // Rotate point around Y axis
    function rotY(v, a) {
      const [x, y, z] = v;
      return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
    }
    // Rotate point around Z axis
    function rotZ(v, a) {
      const [x, y, z] = v;
      return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
    }

    function drawShape(s) {
      // Apply rotations to each vertex
      const transformed = s.verts.map(v => {
        let p = rotX(v, s.rx);
        p = rotY(p, s.ry);
        p = rotZ(p, s.rz);
        return [p[0] + s.cx, p[1] + s.cy, p[2] + s.cz];
      });

      // Project all vertices
      const projected = transformed.map(([x, y, z]) => project(x, y, z));

      // Draw edges
      ctx.beginPath();
      for (const [a, b] of s.edges) {
        const pa = projected[a];
        const pb = projected[b];
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
      }
      ctx.strokeStyle = `rgba(0, 0, 0, ${s.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      for (const s of shapes) {
        // Advance rotation
        s.rx += s.vrx;
        s.ry += s.vry;
        s.rz += s.vrz;
        // Drift position
        s.cx += s.vx;
        s.cy += s.vy;

        // Wrap around viewport (with margin)
        const margin = 500;
        if (s.cx > W / 2 + margin) s.cx = -W / 2 - margin;
        if (s.cx < -W / 2 - margin) s.cx = W / 2 + margin;
        if (s.cy > H / 2 + margin) s.cy = -H / 2 - margin;
        if (s.cy < -H / 2 - margin) s.cy = H / 2 + margin;

        drawShape(s);
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
