# Raghavendra Arella — Portfolio Website

## Overview
A premium, ultra-modern personal portfolio website for Raghavendra Arella — Full Stack Developer and CS student at RGUKT. Built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + custom CSS
- **Animations**: Framer Motion + react-intersection-observer
- **Icons**: Lucide React
- **Fonts**: Inter, Space Grotesk, JetBrains Mono (Google Fonts)

## Project Structure
```
/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root component, composes all sections
│   ├── index.css             # Global styles, Tailwind, CSS variables, utility classes
│   └── components/
│       ├── Navbar.jsx        # Sticky glassmorphism navbar with mobile menu
│       ├── Hero.jsx          # Cinematic hero with photo, animated heading, CTAs
│       ├── About.jsx         # About section with profile photo and bio
│       ├── Skills.jsx        # Technical skills grid (Languages, Frameworks, DB, ML)
│       ├── Experience.jsx    # Work experience timeline (Bloomer)
│       ├── Projects.jsx      # Featured projects + other projects grid
│       ├── Education.jsx     # Education cards (B.Tech + PUC at RGUKT)
│       ├── Contact.jsx       # Contact info + mailto CTA
│       └── Footer.jsx        # Minimal footer with social links
├── index.html                # HTML entry point
├── vite.config.js            # Vite config (port 5000, host 0.0.0.0, allowedHosts: true)
├── tailwind.config.js        # Tailwind config
├── postcss.config.js         # PostCSS config
├── package.json              # Dependencies
│
├── assets/resume.pdf         # Downloadable resume
├── raghava1.jpeg             # Primary hero/profile photo
├── raghava.jpg, raghava.webp # About section photo
├── bit_code_converter.png    # Project screenshot
├── rgukt_sgpa_cgpa_calculator.png  # Project screenshot
└── portfolio.jpeg            # Favicon
```

## Running Locally
Workflow: `Start application` — `npm run dev` — port 5000

## Deployment
- Type: **static** — Vite builds to `dist/`, served as static files
- Build command: `npm run build`
- Public dir: `dist`

## Color System
- Background: `#05060A` (deep dark)
- Card BG: `#0A0D14` / `#10141D`
- Accent Cyan: `#00F0FF` (electric blue/cyan)
- Accent Purple: `#8A2BE2`
- Text: `#E2E8F0` (main) / `#8B949E` (muted)
- Utility classes: `.text-gradient`, `.glow-box`, `.btn-primary`, `.glass-nav`

## Content (from Resume)
- **Owner**: Raghavendra Arella
- **Email**: arellaraghavendra@gmail.com
- **GitHub**: github.com/Raghavendra0348
- **LinkedIn**: linkedin.com/in/arella-raghavendra
- **Education**: B.Tech CS at RGUKT (2024-2028, CGPA 8.75)
- **Experience**: Full Stack Developer @ Bloomer (2025-present)
- **Projects**: PaperVault, Medha AI, Kids Hobbies Prediction, Bit Code Converter, RGUKT Calculator
