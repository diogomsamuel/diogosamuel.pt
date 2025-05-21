import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 relative overflow-hidden bg-white text-black">
      
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden mb-8 lg:mb-0 max-w-md lg:max-w-lg mx-auto rounded-lg">
              <Image
                src="/images/product-placeholder.jpg"
                alt="Diogo Samuel"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column - Section Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-lg lg:max-w-none mx-auto lg:mx-0 text-center"
          >
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase">
              WHO AM I?
            </h2>
            <div className="space-y-6 text-lg">
              <p>
                I'm Diogo Samuel. No labels. No bullshit. I've spent too many years trying to fit into systems that weren't mine. Tried things that didn't work, pushed through situations that didn't speak to me, but I kept moving forward.
              </p>
              <p>
                Here's the thing: I'm not interested in following a script. I do things my own way, and I've always been about action over words. What matters is the process, the hustle, and staying focused. I'm not here to please anyone.
              </p>
              <p className="italic">
                I'm here to make shit happen.
              </p>
            </div>

            <Link
              href="#"
              className="bg-black text-white px-8 py-4 rounded-lg inline-block text-lg font-semibold hover:opacity-90 transition-opacity mt-8"
            >
              <span className="flex items-center justify-center">
                <span>GET TO KNOW MORE</span>
              </span>
            </Link>

            
          </motion.div>
        </div>
      </div>

      
    </section>
  );
}; 