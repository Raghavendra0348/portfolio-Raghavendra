import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-[#8A2BE2] font-mono text-2xl font-normal">01.</span>
              About Me
            </h2>
            <div className="h-[1px] bg-[#1e293b] flex-grow max-w-[300px]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6 text-[#8B949E] text-lg leading-relaxed">
              <p>
                Hello! I'm Raghavendra, a self-driven Computer Science student at RGUKT RK Valley. I love building full-stack web applications that solve real problems, constantly exploring the intersection of design, engineering, and artificial intelligence.
              </p>
              <p>
                My journey into tech started with curiosity and evolved into a deep passion for creating. From pixel-perfect frontends to robust, scalable backend APIs, I enjoy every layer of the stack. Whether I'm designing a new e-commerce platform or training machine learning models for predictions, my goal is always to build things that make an impact.
              </p>
              <p>
                Currently, I'm working as a Full Stack Developer at <span className="text-[#00F0FF]">Bloomer</span>, building a video-first e-commerce platform. When I'm not coding, you can find me playing badminton or cricket, solving Sudoku puzzles, or listening to music.
              </p>
              
              <div className="pt-6">
                <p className="font-mono text-[#00F0FF] mb-4">Here are a few technologies I've been working with recently:</p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {['JavaScript (ES6+)', 'React', 'Node.js', 'Express.js', 'Python', 'Django'].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="text-[#8A2BE2]">▹</span> {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 relative block w-full max-w-[350px] mx-auto lg:mx-0 lg:ml-auto">
              <div className="relative rounded-sm overflow-hidden glow-box border border-[#8A2BE2]/30 group aspect-square">
                <div className="absolute inset-0 bg-[#8A2BE2]/20 mix-blend-multiply transition-colors duration-500 z-10 group-hover:bg-transparent" />
                <img 
                  src="/raghava.webp" 
                  alt="Raghavendra" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
