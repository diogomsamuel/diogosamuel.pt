import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutSection = ({ socialLinks }) => {
  return (
    <section className="py-20 bg-background-dark-lighter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-image.jpg"
                alt="About Diogo Samuel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-40" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">About Me</h2>
            <p className="text-text-muted mb-8">
              I'm a fitness enthusiast, barber, and content creator passionate about sharing my journey 
              and inspiring others. Through my social media platforms, I document my fitness progress, 
              lifestyle choices, and personal growth.
            </p>
            <p className="text-text-muted mb-8">
              My content focuses on fitness, lifestyle, and the balance between work and personal life. 
              I believe in authenticity and sharing both the successes and challenges of the journey.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-background hover:bg-background-dark transition-colors ${link.color}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 