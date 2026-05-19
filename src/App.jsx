import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
// import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Intro splash — rendered until onComplete fires */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main portfolio — fades in after intro */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full min-h-screen bg-[#05060A] text-[#E2E8F0]"
          >
            <div className="bg-noise" />
            <Navbar />
            <main className="flex flex-col w-full">
              <Hero />
              <About />
              <Skills />
              {/* <Experience /> */}
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
