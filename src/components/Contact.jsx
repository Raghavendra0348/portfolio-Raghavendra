import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-32 relative text-center">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[#00F0FF] mb-4 tracking-widest">06. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
          
          <p className="text-[#8B949E] text-lg mb-12 leading-relaxed">
            I'm currently looking for new opportunities to build impactful products. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>

          <a 
            href="mailto:arellaraghavendra@gmail.com" 
            className="inline-block btn-primary px-10 py-5 rounded-sm font-mono text-sm tracking-widest uppercase mb-16"
          >
            Say Hello
          </a>

          <div className="bg-[#10141D] p-8 rounded-sm border border-[rgba(255,255,255,0.05)] text-left glow-box mx-auto max-w-md">
            <h3 className="text-white font-bold mb-4 font-mono text-center">Contact Info</h3>
            <ul className="space-y-4 text-[#8B949E]">
              <li className="flex gap-4 items-center">
                <span className="text-[#00F0FF] font-mono">Email:</span>
                <a href="mailto:arellaraghavendra@gmail.com" className="hover:text-[#00F0FF] transition-colors">arellaraghavendra@gmail.com</a>
              </li>
              <li className="flex gap-4 items-center">
                <span className="text-[#8A2BE2] font-mono">Phone:</span>
                <a href="tel:+917674919477" className="hover:text-[#8A2BE2] transition-colors">+91 7674919477</a>
              </li>
              <li className="flex gap-4 items-center">
                <span className="text-[#00F0FF] font-mono">Location:</span>
                <span>Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
