import { motion } from 'framer-motion';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background-dark-lighter" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Diogo Samuel
              <span className="block text-accent mt-2">Lifestyle & Fitness</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
              Follow my journey through fitness, lifestyle, and personal growth. 
              Let&apos;s inspire and grow together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://instagram.com/diogosvmuel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-secondary transition-colors"
              >
                Follow on Instagram
              </motion.a>
              <motion.a
                href="https://youtube.com/@diogosvmuel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-background-dark-lighter text-foreground rounded-full font-medium hover:bg-background-dark transition-colors"
              >
                Watch on YouTube
              </motion.a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-image.jpg"
                alt="Diogo Samuel"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}; 