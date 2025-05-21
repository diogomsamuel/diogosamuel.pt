import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const BarberSection = () => {
  return (
    <section id="craft" className="py-16 relative overflow-hidden bg-white text-black">
      
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Grid with Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">

          {/* Left Column - Section Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-lg lg:max-w-none mx-auto lg:mx-0 text-center"
          >
            
            {/* Section Title */}
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase"> 
              SHAPING SKILL, BUILDING STYLE
            </h2>
            
            {/* Updated Description - User's story with quotes and signature */}
            <p className="mb-6 leading-relaxed text-lg">
              &quot;After years spent seated in the chair, I spent a lot of time trying to find my path — jumping between courses that didn't fulfill me and jobs that only paid the bills. I've always appreciated the care, the detail, the ritual.
            </p>
            <p className="mb-8 leading-relaxed text-lg">
              And after countless hours in the chair, I realized that the place I was meant to be was right there: clippers in hand, learning an art that truly resonates with me.&quot;
            </p>
            {/* Added Signature */}
            <p className="mb-8 leading-relaxed text-lg font-bold">
              - Diogo Samuel
            </p>

            {/* BOOK NOW Button */}
            <Link
              href="#" // <<-- ADD BOOKING LINK HERE
              // target="_blank" // Uncomment to open in new tab
              // rel="noopener noreferrer" // Uncomment for security when using target="_blank"
              className="bg-black text-white px-8 py-4 rounded-lg inline-block text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="flex items-center justify-center">
                <span>BOOK NOW</span> {/* Button text */}
              </span>
            </Link>

          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image - Placeholder */}
            {/* Set aspect ratio to square for all screen sizes, limited max width on md and lg screens */}
            <div className="relative aspect-square overflow-hidden mb-8 lg:mb-0 max-w-md lg:max-w-lg mx-auto rounded-lg">
              <Image
                src="/images/barber-placeholder-2.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Focus on the Craft"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>

      
    </section>
  );
}; 