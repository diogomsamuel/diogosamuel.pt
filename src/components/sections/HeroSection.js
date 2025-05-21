import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
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
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title (Your Name) */}
          <h1 className="text-6xl md:text-8xl font-black tracking-wider uppercase mb-4">
            Diogo Samuel
          </h1>

          {/* Statement Phrase */}
          <p className="text-xl md:text-2xl text-white/80 font-light mb-12 italic">
            “Move quiet. Look sharp. Let the rest talk - that&apos;s the statement.”
          </p>

          {/* CTA Button (Example - adjust as needed) */}
          <Link
            href="#barber"
            className="relative group overflow-hidden px-8 py-4 bg-[#8B631A] text-white uppercase tracking-wider hover:bg-transparent hover:text-[#8B631A] transition-all duration-300 inline-block border-2 border-[#8B631A]"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">Explore My Work</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}; 