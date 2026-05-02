# Raghavendra Arella — Portfolio Website

## Overview
A static portfolio website for Raghavendra Arella, a Full Stack Developer and CS student at RGUKT. The site showcases skills, projects, and contact information.

## Tech Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (no frameworks/build tools)
- **Server**: Node.js built-in `http` module (static file server)
- **Fonts**: Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- **Icons**: Font Awesome 6.4.0

## Project Structure
```
/
├── index.html          # Main portfolio page
├── style.css           # All styles
├── main.js             # Interactive JS (cursor, animations, scroll, etc.)
├── server.js           # Node.js static file server (port 5000)
├── 404.html            # Custom 404 page
├── assets/
│   └── resume.pdf      # Downloadable resume
├── portfolio.jpeg       # Profile/favicon image
├── raghava.jpg/.jpeg/.webp  # Hero section images
├── sky.webp            # Background asset
├── rgukt.webp          # RGUKT logo
├── bit_code_converter.png   # Project screenshot
└── rgukt_sgpa_cgpa_calculator.png  # Project screenshot
```

## Running Locally
The workflow `Start application` runs `node server.js` on port 5000.

## Deployment
Configured as a **static** deployment. The entire root directory (`.`) is served as the public directory.
