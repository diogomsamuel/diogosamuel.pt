import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const HeroSection = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-16" style={{ scrollMarginTop: '64px' }}>
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Adjusted Overlay for Dark Header */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Leather Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/images/leather-texture.png')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title (Your Name) */}
          <h1 className="text-5xl md:text-7xl font-black tracking-wider uppercase mb-2 md:mb-4">
            Diogo Samuel
          </h1>

          {/* Statement Phrase melhorada para SEO e coesão visual */}
          <p className="text-base md:text-lg font-medium text-white/70 tracking-wide mb-6 md:mb-8 -mt-2">
            They talk. I set the standard.
          </p>

          {/* CTA Button (coerente com outros sections) */}
          <Link
            href="#about"
            className="relative group overflow-hidden px-8 py-4 bg-[#8B631A] text-white uppercase tracking-wider transition-all duration-300 inline-block border-2 border-[#8B631A] rounded-none font-bold text-base md:text-lg hover:bg-black hover:text-white hover:border-black"
          >
            <span className="relative z-10 flex items-center justify-center">Start here</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <motion.span 
            className="text-white/40 text-xs mt-2 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Scroll
          </motion.span>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-[#8B631A] text-white p-3 rounded-full shadow-lg hover:bg-[#6d4d14] transition-colors duration-300"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </section>
  );
}; 