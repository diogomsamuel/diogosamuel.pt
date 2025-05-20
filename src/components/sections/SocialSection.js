import { motion } from 'framer-motion';
import Image from 'next/image';

export const SocialSection = () => {
  const socialContent = [
    {
      platform: 'Instagram',
      title: 'Lifestyle & Fitness',
      description: 'Siga minha jornada diária através do fitness, lifestyle e crescimento pessoal.',
      image: '/images/blog-lifestyle.svg',
      link: 'https://instagram.com/diogosvmuel',
      color: '#E4405F'
    },
    {
      platform: 'YouTube',
      title: 'Fitness & Motivação',
      description: 'Assista minha jornada fitness, treinos e conteúdo de lifestyle.',
      image: '/images/blog-treino.svg',
      link: 'https://youtube.com/@diogosvmuel',
      color: '#FF0000'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark-lighter to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Follow My Journey
            <span className="block text-accent mt-2 text-3xl">Join Me on Social Media</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Junte-se a mim nas redes sociais para inspiração diária, dicas de fitness e conteúdo de lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              className="group relative overflow-hidden rounded-3xl bg-background-dark-lighter shadow-2xl hover:shadow-accent/20 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/50 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${content.color}20`,
                      color: content.color
                    }}
                  >
                    {content.platform}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-3">{content.title}</h3>
                <p className="text-text-muted text-lg">{content.description}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 rounded-3xl transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}; 