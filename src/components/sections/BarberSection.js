import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export const BarberSection = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  return (
    <section id="barber" className="py-12 relative overflow-hidden bg-white text-black" style={{ scrollMarginTop: '64px' }}>
      
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Grid with Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-stretch h-full barber-grid">

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex lg:justify-start h-full items-stretch"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden max-w-full lg:max-w-xl lg:h-full lg:aspect-auto">
              <Image
                src="/images/barber-placeholder-2.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Focus on the Craft"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Left Column - Section Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full text-center flex flex-col justify-start h-full lg:text-left"
          >
            
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 uppercase text-center">
              BECOMING A BARBER
            </h2>
            
            {/* Updated Description - User's story */}
            <div className="space-y-6 text-base md:text-lg text-justify">
              <p>
                I'm just starting out. No hype, no promises. Barbering caught my attention and I'm here to see where it goes with time. Still learning, still figuring it out. No pressure, no rush.
              </p>
              <p>
                This isn't about proving anything or chasing a dream overnight. It's just part of my story, one piece of the bigger picture.
              </p>
              <p>
                It's real, it's raw, and it's happening on my terms.
              </p>
            </div>

            {/* Destaque */}
            <div className="mt-12 flex flex-col items-center lg:items-start lg:text-left w-full">
              <div className="w-full h-1 bg-black mb-3 rounded" />
              <div className="mx-auto max-w-lg text-lg md:text-xl font-bold italic text-black text-justify text-center tracking-wide">
                Not cutting yet.{' '}
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="text-black transition-colors duration-200 font-bold hover:text-[#8B631A] focus:outline-none"
                  style={{ cursor: 'pointer' }}
                >
                  Watch this space.
                </button>
              </div>
              <div className="w-full h-1 bg-black mt-3 rounded" />
            </div>

          </motion.div>

        </div>
      </div>

      {/* Modal Booking Coming Soon */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-background-dark p-8 rounded-lg max-w-md w-full text-white relative">
            <button onClick={() => setShowComingSoon(false)} className="absolute top-2 right-2 text-white/60 hover:text-white text-xl">×</button>
            <div className="flex flex-col items-center">
              <svg className="mb-4 w-10 h-10 text-[#8B631A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <h2 className="text-lg font-bold mb-4">Booking coming soon</h2>
              <p className="text-sm mb-4 text-white/80">Online bookings are not available yet.<br/>Stay tuned for updates on my social media.</p>
              <button onClick={() => setShowComingSoon(false)} className="mt-2 px-4 py-2 bg-[#8B631A] text-white rounded-none font-bold hover:bg-black transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 