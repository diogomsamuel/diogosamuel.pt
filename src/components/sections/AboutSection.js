import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection({ socialLinks }) {
  return (
    <section id="about" className="py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-block mb-4 py-2 px-6 bg-gradient-to-r from-[#FF8A00]/10 to-[#FF5F00]/10 rounded-full">
            <p className="text-[#FF8A00] font-bold uppercase tracking-wider">A Minha Jornada</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
            A Transformar o Meu <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] to-[#FF5F00]">Corpo e Conhecimento</span>
          </h2>
          <div className="text-gray-300 space-y-6 text-lg text-justify">
            <p>
              Chamo-me Diogo Samuel. De um miúdo magro a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] font-semibold">'falso magro'</span> em 2020, decidi estudar e treinar a sério. Mesmo com altos e baixos, provei que é possível ter resultados reais sem vida perfeita.
            </p>
            <p>
              O maior plot twist? Perdi-me entre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] font-semibold">negócios, trabalho e estudos</span>. Ganhei <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] font-semibold">15 Kg</span>, mas agora?  É hora de mostrar que dá para conciliar tudo sem desculpas, sem atalhos.
            </p>
            <p>
              Este é o meu comeback: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] font-semibold">100% real - 0% filtros</span>. Uma transformação do zero com treinos brutais e desafios reais. Cada vitória e cada derrota, tudo exposto.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-6">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 py-2 px-4 ${social.color} rounded-lg hover:bg-[#FF8A00]/20 transition-colors`}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox={social.name === 'Twitter' ? '0 0 512 512' : '0 0 576 512'} fill="currentColor">
                  <path d={social.icon} />
                </svg>
                <span className="font-bold text-sm">{social.name.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-[#FF8A00]/10">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8A00] to-[#FF5F00] opacity-20 blur-2xl"></div>
            <div className="absolute inset-0 rounded-2xl border border-[#FF8A00]/10"></div>
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image
                src="/images/profile.jpeg"
                alt="Diogo Samuel - Personal Trainer"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 