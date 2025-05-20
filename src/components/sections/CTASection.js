import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Let's Connect
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Follow my journey on social media for daily inspiration, fitness tips, 
            and authentic lifestyle content. Let's grow together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
              Subscribe on YouTube
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 