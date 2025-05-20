import { motion } from 'framer-motion';
import Image from 'next/image';

export const SocialSection = () => {
  const socialContent = [
    {
      platform: 'Instagram',
      title: 'Lifestyle & Fitness',
      description: 'Follow my daily journey through fitness, lifestyle, and personal growth.',
      image: '/images/instagram-preview.jpg',
      link: 'https://instagram.com/diogosvmuel'
    },
    {
      platform: 'YouTube',
      title: 'Fitness & Motivation',
      description: 'Watch my fitness journey, workouts, and lifestyle content.',
      image: '/images/youtube-preview.jpg',
      link: 'https://youtube.com/@diogosvmuel'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Follow My Journey</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Join me on social media for daily inspiration, fitness tips, and lifestyle content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialContent.map((content, index) => (
            <motion.a
              key={content.platform}
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-background-dark-lighter"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent font-medium mb-2 block">{content.platform}</span>
                <h3 className="text-2xl font-bold text-foreground mb-2">{content.title}</h3>
                <p className="text-text-muted">{content.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}; 