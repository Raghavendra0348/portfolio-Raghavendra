import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
// import { KnotAnimation } from './ui/knot-animation';

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com/
// 2. Add an Email Service (Gmail, Outlook…)
// 3. Create a template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Replace the three strings below with your real IDs from your EmailJS dashboard
const EJ_SERVICE  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EJ_TEMPLATE = 'YOUR_TEMPLATE_ID'; // e.g. 'template_xyz456'
const EJ_KEY      = 'YOUR_PUBLIC_KEY';  // e.g. 'aBcDeFgHiJkL'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      subject:    form.subject || 'Portfolio Contact',
      message:    form.message,
      to_email:   'arellaraghavendra@gmail.com',
    };

    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, templateParams, EJ_KEY);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send. Please email me directly at arellaraghavendra@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    { icon: <Mail size={16} />, label: 'Email', value: 'arellaraghavendra@gmail.com', href: 'mailto:arellaraghavendra@gmail.com' },
    // { icon: <Phone size={16} />, label: 'Phone', value: '+91 7674919477', href: 'tel:+917674919477' },
    { icon: <MapPin size={16} />, label: 'Location', value: 'Andhra Pradesh, India', href: null },
  ];

  const socials = [
    { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/Raghavendra0348' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/in/arella-raghavendra' },
    { icon: <Mail size={18} />, label: 'Email', href: 'mailto:arellaraghavendra@gmail.com' },
  ];

  return (
    <section id="contact" className="py-28 relative bg-white">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-5 mb-4">
            <span className="font-mono text-xs text-black/25 tracking-[0.2em] uppercase">06.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Get In Touch</h2>
            <div className="h-px bg-black/8 flex-grow max-w-xs hidden md:block" />
          </div>
          <p className="text-black/40 text-sm ml-10 md:ml-14 mb-16 max-w-lg">
            Open to new opportunities, freelance projects, and collaborations. Drop a message and I'll get back to you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-sm border border-black/10 bg-black/[0.02] flex items-center justify-center text-black/35 group-hover:border-black/25 group-hover:text-black/60 transition-all flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-black/60 hover:text-black transition-colors text-sm break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-black/60 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-black/6" />

              <div>
                <p className="font-mono text-[10px] text-black/25 uppercase tracking-widest mb-4">Find me on</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-black/10 text-black/40 hover:text-black hover:border-black/30 transition-all font-mono text-xs">
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-black/[0.03] border border-black/8 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-black/50 animate-pulse flex-shrink-0" />
                <span className="font-mono text-xs text-black/40">Available for new projects</span>
              </div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input id="name" name="name" type="text" className="form-input" placeholder="Enter Your Name"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" className="form-input" placeholder="mail@example.com"
                      value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" className="form-input" placeholder="Project Collaboration"
                    value={form.subject} onChange={handleChange} />
                </div>

                <div>
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={6} className="form-input resize-none"
                    placeholder="Tell me about your project or idea..."
                    value={form.message} onChange={handleChange} required />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full btn-primary py-4 rounded-sm font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sent ? (
                    <><CheckCircle size={16} /> Message Sent! I'll get back to you soon.</>
                  ) : sending ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded bg-red-50 border border-red-200">
                    <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-red-600 font-mono text-[11px]">{error}</p>
                  </div>
                )}

                <p className="text-black/25 font-mono text-[10px] text-center tracking-wide">
                  Your message is sent directly to my inbox — no mail client needed.
                </p>
              </form>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
