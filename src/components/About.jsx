import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="about" className="relative bg-white py-24 md:py-32">
      <div className="section-line absolute top-0 left-0 right-0" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">

          {/* ── LEFT: SVG illustration in a bordered frame ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[380px] shrink-0 mx-auto lg:mx-0"
          >
            <div
              className="relative"
              style={{
                border: '0px solid #000',
                borderRadius: 6,
                padding: '0',
                background: '#fff',
                overflow: 'hidden',
              }}
            >
              <img
                src="/about-me.svg"
                alt="Raghavendra Arella illustration"
                className="w-full h-auto block"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: text content ── */}
          <div className="flex-1 flex flex-col justify-center">
            {/* heading */}
            <motion.div {...fade(0)} className="mb-6">
              <p className="font-mono text-xs text-black/30 tracking-[0.22em] uppercase mb-3">
                01. Who I am
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight">
                About <span className="font-extrabold">Me</span>
              </h2>
            </motion.div>

            {/* paragraphs */}
            <div className="space-y-5 text-black/55 text-[15px] md:text-base leading-[1.85]">
              <motion.p {...fade(0.1)}>
                I'm a passionate full-stack developer specializing in{' '}
                <strong className="text-black font-semibold">React.js &amp; Node.js</strong>.
                I thrive on blending technical expertise with sleek UI/UX design to build
                high-performing, user-friendly applications.
              </motion.p>

              <motion.p {...fade(0.18)}>
                My web development journey started at{' '}
                <strong className="text-black font-semibold">RGUKT RK Valley</strong>, and since
                then I've continuously evolved — taking on new challenges and keeping up with the
                latest technologies. Today I build{' '}
                <strong className="text-black font-semibold">cutting-edge web applications</strong>{' '}
                using React.js, Node.js, Express, MySQL, Firebase, and more.
              </motion.p>

              <motion.p {...fade(0.26)}>
                Currently working as a Full Stack Developer at{' '}
                <strong className="text-black font-semibold">Bloomer</strong>, building a
                video-first e-commerce platform. Beyond coding, I enjoy sharing knowledge,
                collaborating on open-source projects, and following the journey of{' '}
                <strong className="text-black font-semibold">early-stage startups</strong>.
                Feel free to check out my projects on{' '}
                <a
                  href="https://github.com/Raghavendra0348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
                >
                  GitHub
                </a>.
              </motion.p>
            </div>

            {/* quick stats row */}
            <motion.div
              {...fade(0.34)}
              className="mt-10 flex flex-wrap gap-8"
            >
              {[
                { value: '5+', label: 'Projects Built' },
                { value: '2+', label: 'Years Coding' },
                { value: '3+', label: 'Tech Stacks' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-extrabold text-black tracking-tight">{value}</p>
                  <p className="text-[11px] font-mono text-black/35 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
