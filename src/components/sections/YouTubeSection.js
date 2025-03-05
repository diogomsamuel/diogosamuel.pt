import { motion } from 'framer-motion';

export function YouTubeSection() {
  return (
    <section className="py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 py-2 px-6 bg-[#FF8A00]/10 rounded-full">
            <p className="text-[#FF8A00] font-bold uppercase tracking-wider">YouTube</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">Treinos Sem Filtros</h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            A minha jornada de transformação documentada em tempo real, mostrando cada treino e desafio como realmente acontece
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#141414] rounded-xl overflow-hidden shadow-xl hover:shadow-[#FF8A00]/10 transition-all duration-300"
          >
            <div className="aspect-video relative bg-[#1A1A1A]">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <svg className="w-16 h-16 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <div className="text-white font-medium">Treino completo em breve</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">TREINO COMPLETO: COSTAS E BÍCEPS</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-sm">Em breve</span>
                <span className="text-gray-400 text-sm">15:35</span>
              </div>
              <p className="text-gray-300 mb-6">Treino completo com todas as séries, repetições e cargas. Inclui dicas de execução e explicação das escolhas de exercícios.</p>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF8A00] font-bold hover:text-[#FF5F00] transition-colors"
              >
                Ver no YouTube
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white uppercase tracking-wide">O que vais encontrar:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#FF8A00] text-xs font-bold">1</span>
                </div>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Treinos Completos</span> - Cada sessão gravada na íntegra, mostrando a realidade de cada treino sem cortes
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#FF8A00] text-xs font-bold">2</span>
                </div>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Progressão Real</span> - Acompanha a evolução em tempo real, com pesos, séries e repetições de cada exercício
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#FF8A00] text-xs font-bold">3</span>
                </div>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Nutrição Transparente</span> - Dia alimentar completo, suplementação e dicas práticas para o dia a dia
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-[#FF8A00] text-xs font-bold">4</span>
                </div>
                <p className="text-gray-300">
                  <span className="text-white font-bold">100% Autêntico</span> - Dos sucessos aos fracassos, tudo documentado para mostrar a realidade da jornada
                </p>
              </li>
            </ul>
            <div className="pt-4">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-lg inline-flex items-center gap-3 hover:bg-red-700 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Subscreve o Canal
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 