/* ============================================================
   MAIN.JS — Portfolio Interactive Layer
   ============================================================ */

// ─── PRELOADER ────────────────────────────────────────────────
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.remove(), 700);
  }, 1600);
});

// ─── CUSTOM CURSOR ────────────────────────────────────────────
const cursorOuter = document.getElementById('cursor-outer');
const cursorInner = document.getElementById('cursor-inner');
let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorInner.style.left = e.clientX + 'px';
  cursorInner.style.top  = e.clientY + 'px';
});

(function animateCursor() {
  outerX += (mouseX - outerX) * 0.12;
  outerY += (mouseY - outerY) * 0.12;
  cursorOuter.style.left = outerX + 'px';
  cursorOuter.style.top  = outerY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .chip, .proj-card, .stat-card, .tl-card, .skill-group').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOuter.classList.add('hovered');
    cursorInner.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursorOuter.classList.remove('hovered');
    cursorInner.classList.remove('hovered');
  });
});

// ─── SCROLL PROGRESS ──────────────────────────────────────────
const scrollProgress = document.getElementById('scroll-progress');
const fabTop = document.getElementById('fab-top');

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
  scrollProgress.style.width = pct + '%';
  fabTop.classList.toggle('visible', scrollTop > 400);
});

fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── HEADER SCROLL EFFECT ─────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── ACTIVE NAV LINK ──────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const y = window.scrollY + 90;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-s="${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ─── MOBILE DRAWER ────────────────────────────────────────────
const menuToggle  = document.getElementById('menu-toggle');
const drawer      = document.getElementById('mobile-drawer');
const drawerClose = document.getElementById('drawer-close');

const openDrawer  = () => { drawer.classList.add('open'); menuToggle.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeDrawer = () => { drawer.classList.remove('open'); menuToggle.classList.remove('open'); document.body.style.overflow = ''; };

menuToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawer.addEventListener('click', e => { if (e.target === drawer) closeDrawer(); });
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

// ─── THEME TOGGLE ─────────────────────────────────────────────
const themeBtn  = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
let isDark = true;

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

// ─── TYPEWRITER ────────────────────────────────────────────────
const twEl = document.getElementById('typewriter');
const strings = [
  'Full Stack Developer',
  'Problem Solver',
  'CS Student @ RGUKT',
  'Open Source Enthusiast',
  'Creative Builder'
];
let si = 0, ci = 0, deleting = false;

function type() {
  const str = strings[si];
  twEl.textContent = deleting ? str.slice(0, ci--) : str.slice(0, ci++);
  let speed = deleting ? 45 : 95;
  if (!deleting && ci === str.length + 1) { speed = 1600; deleting = true; }
  else if (deleting && ci < 0) { deleting = false; si = (si + 1) % strings.length; ci = 0; speed = 250; }
  setTimeout(type, speed);
}
type();

// ─── PARTICLE CANVAS ──────────────────────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let mouse = { x: -9999, y: -9999 };

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() { this.init(); }
  init() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.8 + 0.4;
    this.a  = Math.random() * 0.45 + 0.08;
    this.c  = Math.random() > 0.5 ? '108,99,255' : '255,101,132';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.c},${this.a})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 14000));
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - d / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

(function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
})();

// ─── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ─── COUNTER ANIMATION ────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const end = parseInt(el.dataset.target);
    let count = 0;
    const step = end / 55;
    const timer = setInterval(() => {
      count += step;
      if (count >= end) { count = end; clearInterval(timer); }
      el.textContent = Math.floor(count) + '+';
    }, 18);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ─── PROFICIENCY BAR ANIMATION ────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.w + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.prof-fill').forEach(el => barObserver.observe(el));

// ─── 3D TILT ON PROJECT CARDS ─────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) *  8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    const glow = card.querySelector('.card-glow');
    if (glow) glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(108,99,255,0.18), transparent 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    const glow = card.querySelector('.card-glow');
    if (glow) glow.style.background = '';
  });
});

// ─── SMOOTH SCROLL FOR NAV LINKS ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── CONTACT FORM SUBMIT FEEDBACK ────────────────────────────
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        submitBtn.innerHTML = '<span>Sent! ✓</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      submitBtn.innerHTML = '<span>Error — Try Again</span> <i class="fas fa-times"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #ff6584, #ff4444)';
    }

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  });
}

// ─── STAGGER REVEAL DELAYS ────────────────────────────────────
document.querySelectorAll('.chips .chip').forEach((chip, i) => {
  chip.style.transitionDelay = (i * 60) + 'ms';
});
document.querySelectorAll('.proj-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 100) + 'ms';
});
document.querySelectorAll('.stat-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 80) + 'ms';
});
