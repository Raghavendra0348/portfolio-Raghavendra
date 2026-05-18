import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

export default function ProjectsShowcase() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/[0.03] font-mono text-xs text-black/40 tracking-widest uppercase"
            >
              <Sparkles size={11} />
              Featured Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight"
            >
              Projects that
              <br />
              <span className="text-black/30">speak for themselves</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-black/40 text-base md:text-lg max-w-xl mx-auto font-light"
            >
              Scroll to explore a curated selection of full-stack applications
              built with modern technologies.
            </motion.p>

            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 bg-black text-white rounded-full font-mono text-sm tracking-wide hover:bg-black/80 transition-colors"
            >
              <Code2 size={15} />
              View All Projects
              <ArrowRight size={14} />
            </motion.a>
          </div>
        }
      >
        {/* Dashboard preview inside the 3D card */}
        <div className="w-full h-full relative overflow-hidden rounded-xl">
          {/* Fake browser chrome */}
          <div className="w-full h-8 bg-[#1a1a1a] flex items-center gap-1.5 px-3 border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="flex-1 mx-3 h-4 bg-white/5 rounded-sm flex items-center px-2">
              <span className="text-white/20 font-mono text-[9px]">localhost:5000</span>
            </div>
          </div>

          {/* Main content preview */}
          <img
            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1400&q=80"
            alt="Projects showcase preview"
            className="w-full h-[calc(100%-2rem)] object-cover object-top"
          />

          {/* Overlay cards */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            {[
              { title: 'Bloomer', tag: 'Video e-Commerce', color: '#6D4AFF' },
              { title: 'CareerPilot', tag: 'AI Multi-Agent', color: '#F05032' },
              { title: 'De-Lit', tag: 'Full Stack Blog', color: '#0C4B33' },
            ].map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -4 }}
                className="flex-1 bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-3"
              >
                <div
                  className="w-2 h-2 rounded-full mb-2"
                  style={{ background: p.color }}
                />
                <div className="text-white text-xs font-semibold">{p.title}</div>
                <div className="text-white/40 text-[10px] font-mono mt-0.5">{p.tag}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
