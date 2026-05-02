import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, LayoutTemplate, BrainCircuit } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="text-[#00F0FF]" size={24} />,
    skills: ["Python", "Java", "C", "JavaScript", "SQL", "HTML/CSS"]
  },
  {
    title: "Frameworks",
    icon: <LayoutTemplate className="text-[#8A2BE2]" size={24} />,
    skills: ["React", "Node.js", "Express.js", "Django", "DRF"]
  },
  {
    title: "Technologies",
    icon: <Database className="text-[#00F0FF]" size={24} />,
    skills: ["Firebase", "Firestore", "MySQL", "SQLite", "REST APIs", "JWT"]
  },
  {
    title: "Machine Learning",
    icon: <BrainCircuit className="text-[#8A2BE2]" size={24} />,
    skills: ["scikit-learn", "Random Forest", "pandas", "Data Analysis"]
  }
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16 justify-center md:justify-start">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-[#8A2BE2] font-mono text-2xl font-normal">02.</span>
              Technical Arsenal
            </h2>
            <div className="h-[1px] bg-[#1e293b] flex-grow max-w-[200px] hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glow-box p-6 rounded-sm flex flex-col h-full bg-[#0A0D14]"
              >
                <div className="mb-6 bg-[#10141D] w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.05)]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{category.title}</h3>
                <ul className="space-y-3 mt-auto">
                  {category.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-3 text-[#8B949E] font-mono text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
