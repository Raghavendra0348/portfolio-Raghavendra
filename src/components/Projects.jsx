import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Folder } from 'lucide-react';

const featuredProjects = [
  {
    title: "PaperVault – RGUKT Repo",
    description: "Platform for RGUKT students to access and manage question papers across campuses. Features advanced search by course, campus, and year. Includes secure JWT authentication, bookmarks, and an admin dashboard.",
    tech: ["Node.js", "Express", "MySQL", "Sequelize"],
    github: "https://github.com/Raghavendra0348",
    image: null,
    gradient: "from-[#8A2BE2]/20 to-[#00F0FF]/20"
  },
  {
    title: "Medha AI – Campus Assistant",
    description: "Multilingual AI assistant using Gemini API for real-time campus queries. Includes voice interaction, image analysis, and modules for academics. Features a complaint tracking system with priority handling.",
    tech: ["React", "Node.js", "Firebase", "Gemini API"],
    github: "https://github.com/Raghavendra0348",
    image: null,
    gradient: "from-[#00F0FF]/20 to-[#8A2BE2]/20"
  },
  {
    title: "Kids Hobbies Prediction",
    description: "Machine Learning system to predict hobbies for children (5–12) using Random Forest. Implements a 13-parameter model with multi-algorithm comparison and an admin dashboard for performance visualization.",
    tech: ["React", "Django", "scikit-learn", "SQLite"],
    github: "https://github.com/Raghavendra0348",
    image: null,
    gradient: "from-[#1e293b] to-[#8A2BE2]/30"
  }
];

const otherProjects = [
  {
    title: "Bit Code Converter",
    description: "Converts between Binary, Decimal, Octal, Hex, Gray, and Hamming Codes with error detection.",
    tech: ["HTML/CSS/JS", "Firebase", "Vercel"],
    github: "https://github.com/Raghavendra0348/bit-code-converter",
    live: "https://bit-code-converter.vercel.app/",
    image: "/bit_code_converter.png"
  },
  {
    title: "RGUKT SGPA/CGPA Calculator",
    description: "Academic performance calculator for RGUKT students with Google Analytics integration.",
    tech: ["HTML/CSS/JS", "Firebase"],
    github: "https://github.com/Raghavendra0348/RGUKT-SGPA-CGPA-Calculator",
    live: "https://rgukt-sgpa-cgpa-calculator.vercel.app/",
    image: "/rgukt_sgpa_cgpa_calculator.png"
  }
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-[#8A2BE2] font-mono text-2xl font-normal">04.</span>
              Some Things I've Built
            </h2>
            <div className="h-[1px] bg-[#1e293b] flex-grow max-w-[300px]" />
          </div>

          {/* Featured Projects - Large Cards */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}>
                <div className="w-full lg:w-7/12 relative group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} rounded-sm opacity-80 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100 z-10`} />
                  <div className="bg-[#10141D] w-full aspect-video rounded-sm border border-[rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center relative">
                    <Folder className="text-[#8B949E] opacity-20 w-32 h-32 absolute" />
                    <div className="z-20 text-center px-4">
                      <h4 className="text-2xl font-bold text-white/50 tracking-wider uppercase">{project.title}</h4>
                    </div>
                  </div>
                </div>

                <div className={`w-full lg:w-5/12 flex flex-col ${idx % 2 !== 0 ? 'lg:items-start text-left' : 'lg:items-end lg:text-right'}`}>
                  <p className="text-[#00F0FF] font-mono text-sm mb-2">Featured Project</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{project.title}</h3>
                  <div className="bg-[#10141D] p-6 rounded-sm border border-[rgba(255,255,255,0.05)] glow-box z-20 w-full mb-6">
                    <p className="text-[#8B949E] text-base leading-relaxed">{project.description}</p>
                  </div>
                  <ul className={`flex flex-wrap gap-4 font-mono text-sm text-[#8B949E] mb-6 ${idx % 2 !== 0 ? 'justify-start' : 'lg:justify-end'}`}>
                    {project.tech.map(t => <li key={t}>{t}</li>)}
                  </ul>
                  <div className={`flex items-center gap-4 text-[#E2E8F0] ${idx % 2 !== 0 ? 'justify-start' : 'lg:justify-end'}`}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors p-2">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Web Apps Grid */}
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-center text-white mb-12">Other Noteworthy Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-[#10141D] rounded-sm border border-[rgba(255,255,255,0.05)] overflow-hidden flex flex-col h-full glow-box"
                >
                  <div className="h-48 overflow-hidden relative border-b border-[rgba(255,255,255,0.05)]">
                    <div className="absolute inset-0 bg-[#00F0FF]/10 mix-blend-multiply z-10 transition-opacity hover:opacity-0" />
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <Folder className="text-[#00F0FF]" size={32} />
                      <div className="flex gap-3 text-[#8B949E]">
                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF]"><Github size={20} /></a>}
                        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF]"><ExternalLink size={20} /></a>}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
                    <p className="text-[#8B949E] text-sm mb-6 flex-grow">{project.description}</p>
                    <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#8A2BE2] mt-auto">
                      {project.tech.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
