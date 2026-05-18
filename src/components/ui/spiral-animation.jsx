import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ── Vector helpers ───────────────────────────────────────────── */
class Vector2D {
  constructor(x, y) { this.x = x; this.y = y; }
  static random(min, max) { return min + Math.random() * (max - min); }
}

class Vector3D {
  constructor(x, y, z) { this.x = x; this.y = y; this.z = z; }
}

/* ── Star ─────────────────────────────────────────────────────── */
class Star {
  constructor(cameraZ, cameraTravelDistance) {
    this.angle            = Math.random() * Math.PI * 2;
    this.distance         = 30 * Math.random() + 15;
    this.rotationDirection= Math.random() > 0.5 ? 1 : -1;
    this.expansionRate    = 1.2 + Math.random() * 0.8;
    this.finalScale       = 0.7 + Math.random() * 0.6;

    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);

    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);

    const lerp = (s, e, t) => s * (1 - t) + e * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p, ctrl) {
    const spiralPos = ctrl.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;
    if (q <= 0) return;

    const dp = ctrl.constrain(4 * q, 0, 1);

    const linearE  = dp;
    const elasticE = ctrl.easeOutElastic(dp);
    const powerE   = Math.pow(dp, 2);

    let easing;
    if (dp < 0.3)      easing = ctrl.lerp(linearE,  powerE,   dp / 0.3);
    else if (dp < 0.7) easing = ctrl.lerp(powerE,   elasticE, (dp - 0.3) / 0.4);
    else               easing = elasticE;

    let sx, sy;
    if (dp < 0.3) {
      sx = ctrl.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
      sy = ctrl.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
    } else if (dp < 0.7) {
      const mid = (dp - 0.3) / 0.4;
      const curve = Math.sin(mid * Math.PI) * this.rotationDirection * 1.5;
      const bx = spiralPos.x + this.dx * 0.3, by = spiralPos.y + this.dy * 0.3;
      const tx = spiralPos.x + this.dx * 0.7, ty = spiralPos.y + this.dy * 0.7;
      const px = -this.dy * 0.4 * curve, py = this.dx * 0.4 * curve;
      sx = ctrl.lerp(bx, tx, mid) + px * mid;
      sy = ctrl.lerp(by, ty, mid) + py * mid;
    } else {
      const fp = (dp - 0.7) / 0.3;
      const bx = spiralPos.x + this.dx * 0.7, by = spiralPos.y + this.dy * 0.7;
      const td = this.distance * this.expansionRate * 1.5;
      const sa = this.angle + 1.2 * this.rotationDirection * fp * Math.PI;
      const tx = spiralPos.x + td * Math.cos(sa);
      const ty = spiralPos.y + td * Math.sin(sa);
      sx = ctrl.lerp(bx, tx, fp);
      sy = ctrl.lerp(by, ty, fp);
    }

    const vx = (this.z - ctrl.cameraZ) * sx / ctrl.viewZoom;
    const vy = (this.z - ctrl.cameraZ) * sy / ctrl.viewZoom;

    let sizeMul = 1.0;
    if (dp < 0.6)  sizeMul = 1.0 + dp * 0.2;
    else           sizeMul = ctrl.lerp(1.2, this.finalScale, (dp - 0.6) / 0.4);

    ctrl.showProjectedDot(new Vector3D(vx, vy, this.z), 8.5 * this.strokeWeightFactor * sizeMul);
  }
}

/* ── AnimationController ─────────────────────────────────────── */
class AnimationController {
  constructor(canvas, ctx, dpr, size) {
    this.canvas  = canvas;
    this.ctx     = ctx;
    this.dpr     = dpr;
    this.size    = size;
    this.time    = 0;
    this.stars   = [];

    // Constants (public so Star can access via ctrl.xxx)
    this.changeEventTime      = 0.32;
    this.cameraZ              = -400;
    this.cameraTravelDistance = 3400;
    this.startDotYOffset      = 28;
    this.viewZoom             = 100;
    this.numberOfStars        = 5000;
    this.trailLength          = 80;

    this._setupRandomGenerator();
    this._setupTimeline();
  }

  _setupRandomGenerator() {
    const orig = Math.random;
    let seed = 1234;
    Math.random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < this.numberOfStars; i++)
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    Math.random = orig;
  }

  _setupTimeline() {
    this.timeline = gsap.timeline({ repeat: -1 });
    this.timeline.to(this, {
      time: 1, duration: 15, repeat: -1, ease: 'none',
      onUpdate: () => this.render(),
    });
  }

  /* Easing & math helpers */
  ease(p, g) {
    return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }
  easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0; if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }
  map(v, s1, e1, s2, e2) { return s2 + (e2 - s2) * ((v - s1) / (e1 - s1)); }
  constrain(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }
  lerp(s, e, t) { return s * (1 - t) + e * t; }

  spiralPath(p) {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const theta = 2 * Math.PI * 6 * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);
    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset);
  }

  showProjectedDot(position, sizeFactor) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;
    if (position.z > newCameraZ) {
      const depth = position.z - newCameraZ;
      const x  = this.viewZoom * position.x / depth;
      const y  = this.viewZoom * position.y / depth;
      const sw = 400 * sizeFactor / depth;
      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);

    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1);
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);

    ctx.rotate(-Math.PI * this.ease(t2, 2.7));

    /* Trail */
    for (let i = 0; i < this.trailLength; i++) {
      const f   = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw  = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      ctx.fillStyle = 'white';
      const pathTime = t1 - 0.00015 * i;
      const pos      = this.spiralPath(pathTime);
      const offset   = new Vector2D(pos.x + 5, pos.y + 5);
      const mid      = new Vector2D((pos.x + offset.x) / 2, (pos.y + offset.y) / 2);
      const dx = pos.x - mid.x, dy = pos.y - mid.y;
      const ang = Math.atan2(dy, dx);
      const o   = i % 2 === 0 ? -1 : 1;
      const r   = Math.sqrt(dx * dx + dy * dy);
      const bounce = Math.sin((Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5) * Math.PI) * 0.05 * (1 - (Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5));
      const ep  = this.easeOutElastic(Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5);
      const rx  = mid.x + r * (1 + bounce) * Math.cos(ang + o * Math.PI * ep);
      const ry  = mid.y + r * (1 + bounce) * Math.sin(ang + o * Math.PI * ep);
      ctx.beginPath();
      ctx.arc(rx, ry, sw / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Stars */
    ctx.fillStyle = 'white';
    for (const star of this.stars) star.render(t1, this);

    /* Start dot */
    if (this.time > this.changeEventTime) {
      const dy = this.cameraZ * this.startDotYOffset / this.viewZoom;
      this.showProjectedDot(new Vector3D(0, dy, this.cameraTravelDistance), 2.5);
    }

    ctx.restore();
  }

  pause()   { this.timeline.pause(); }
  resume()  { this.timeline.play(); }
  destroy() { this.timeline.kill(); }
}

/* ── React component ─────────────────────────────────────────── */
export function SpiralAnimation() {
  const canvasRef    = useRef(null);
  const animRef      = useRef(null);
  const [dims, setDims] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const onResize = () => setDims({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr  = window.devicePixelRatio || 1;
    const size = Math.max(dims.width, dims.height);

    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${dims.width}px`;
    canvas.style.height = `${dims.height}px`;
    ctx.scale(dpr, dpr);

    animRef.current = new AnimationController(canvas, ctx, dpr, size);
    return () => { animRef.current?.destroy(); animRef.current = null; };
  }, [dims]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
