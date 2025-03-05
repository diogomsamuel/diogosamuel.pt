import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="relative bg-[#0D0D0D] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
              Planos a Partir de <span className="text-[#FF8A00]">39.99€</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Compra única. Sem subscrições. Acesso vitalício a todas as atualizações.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#141414] p-6 rounded-2xl border border-white/5 flex items-center"
          >
            <div className="text-center w-full">
              <div className="bg-[#FF8A00]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Compra Única</h3>
              <p className="text-gray-400 text-sm">Sem mensalidades ou custos escondidos</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#141414] p-6 rounded-2xl border border-white/5 flex items-center"
          >
            <div className="text-center w-full">
              <div className="bg-[#FF8A00]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Download Imediato</h3>
              <p className="text-gray-400 text-sm">Acesso instantâneo a todo o material</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#141414] p-6 rounded-2xl border border-white/5 flex items-center"
          >
            <div className="text-center w-full">
              <div className="bg-[#FF8A00]/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Garantia 7 Dias</h3>
              <p className="text-gray-400 text-sm">Satisfação garantida ou dinheiro de volta</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a 
            href="/products"
            className="inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-bold py-4 px-10 rounded-xl text-lg transition-colors duration-300"
          >
            Ver Planos Disponíveis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 