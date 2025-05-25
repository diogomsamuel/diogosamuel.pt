import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 relative overflow-hidden bg-white text-black" style={{ scrollMarginTop: '64px' }}>
      
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative aspect-square overflow-hidden w-full max-w-md rounded-lg">
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
            className="relative max-w-lg lg:max-w-none mx-auto lg:mx-0 flex flex-col justify-center text-center"
          >
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 uppercase">
              WHO AM I?
            </h2>
            <div className="space-y-6 text-base md:text-lg">
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

            {/* Social Media Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {/* Instagram */}
              <a href="https://instagram.com/diogosvmuel" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-gray-800 shadow-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@diogosvmuel" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-gray-800 shadow-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com/@diogosvmuel" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-gray-800 shadow-md">
                {/* TikTok Official SVG */}
                <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M34.5 10.5C33.1193 9.11929 32.25 7.2625 32.25 5.25H27.75V32.25C27.75 35.0112 25.5112 37.25 22.75 37.25C19.9888 37.25 17.75 35.0112 17.75 32.25C17.75 29.4888 19.9888 27.25 22.75 27.25V22.75C17.201 22.75 12.75 27.201 12.75 32.75C12.75 38.299 17.201 42.75 22.75 42.75C28.299 42.75 32.75 38.299 32.75 32.75V18.25C34.9492 19.8012 37.6492 20.75 40.5 20.75V16.25C38.1193 16.25 35.8807 15.3807 34.5 13.75V10.5Z" fill="currentColor"/>
                  </g>
                </svg>
              </a>
              {/* X.com */}
              <a href="https://x.com/diogosvmuel" target="_blank" rel="noopener noreferrer" aria-label="X.com"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-gray-800 shadow-md">
                {/* X (Twitter) Official SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.53 3.47H20.5L14.62 10.09L21.5 20.5H15.68L11.38 14.5L6.44 20.5H3.47L9.7 13.41L3.09 3.5H9.02L13.01 8.97L17.53 3.47ZM16.48 18.68H18.13L8.6 5.62H6.82L16.48 18.68Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            
          </motion.div>
        </div>
      </div>

      
    </section>
  );
}; 