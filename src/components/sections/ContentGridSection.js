import { motion } from 'framer-motion';
import Image from 'next/image';

export const ContentGridSection = () => {
  return (
    <section id="content-grid" className="py-12 relative overflow-hidden bg-white text-black text-center">
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Title - Made smaller */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-4 uppercase"
        >
          THE GRIND. THE RIDE. THE ART.
        </motion.h2>
        
        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Lifestyle Item */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full overflow-hidden">
               <Image
                src="/images/lifestyle-placeholder.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Lifestyle"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Category Name below image */}
            <div className="mt-4 text-lg font-bold uppercase">
              Lifestyle
            </div>
          </motion.div>

          {/* Fitness Item */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/images/fitness-placeholder.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Fitness"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Category Name below image */}
             <div className="mt-4 text-lg font-bold uppercase">
              Fitness
            </div>
          </motion.div>

          {/* Barbering Item */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group flex flex-col justify-between"
          >
             <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/images/barbering-placeholder.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Barbering"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Category Name below image */}
             <div className="mt-4 text-lg font-bold uppercase">
              Barbering
            </div>
          </motion.div>

          {/* Engine Roar Item */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group flex flex-col justify-between"
          >
             <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/images/engine-roar-placeholder.jpg" // <<-- CHANGE THIS IMAGE PATH
                alt="Engine Roar"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Category Name below image */}
             <div className="mt-4 text-lg font-bold uppercase">
              ENGINE ROAR
            </div>
          </motion.div>

        </div>
        {/* Frase de indicação dos conteúdos */}
        <div className="mt-4 text-center text-sm md:text-base italic text-gray-400">
          The world I live in. The content I create.
        </div>
      </div>
    </section>
  );
}; 