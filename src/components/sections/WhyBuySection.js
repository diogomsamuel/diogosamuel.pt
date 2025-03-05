import { motion } from 'framer-motion';

export function WhyBuySection() {
  const reasons = [
    {
      title: "Planos Testados",
      description: "Planos de treino que uso no meu dia-a-dia, testados e otimizados para resultados reais.",
      icon: (
        <svg className="w-8 h-8 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Base Científica",
      description: "Treino e nutrição fundamentados em ciência, mas explicados de forma clara e prática.",
      icon: (
        <svg className="w-8 h-8 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Recursos Completos",
      description: "Vídeos explicativos, guias de nutrição e biblioteca de exercícios incluídos em cada plano.",
      icon: (
        <svg className="w-8 h-8 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Evolução Garantida",
      description: "Planos estruturados para progressão contínua, adaptados ao teu nível e objetivos.",
      icon: (
        <svg className="w-8 h-8 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 py-2 px-6 bg-[#FF8A00]/10 rounded-full">
            <p className="text-[#FF8A00] font-bold uppercase tracking-wider">Qualidade Garantida</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            Planos com <span className="text-[#FF8A00]">Resultados Reais</span>
          </h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Descobre porque os meus planos de treino são diferentes e como podem ajudar-te a atingir os teus objetivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] rounded-2xl border border-white/5 p-8 hover:border-[#FF8A00]/20 transition-all duration-500"
            >
              <div className="bg-[#FF8A00]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="#featured-programs"
            className="inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-bold py-4 px-10 rounded-xl text-lg transition-colors duration-300"
          >
            Explorar Planos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 