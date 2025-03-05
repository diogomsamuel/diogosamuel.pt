import { motion } from 'framer-motion';

export function FAQSection() {
  const faqs = [
    {
      question: "Como funciona a compra dos planos?",
      answer: "O processo é 100% digital e automático. Após a compra, recebes imediatamente um email com acesso a todos os materiais do plano escolhido, incluindo PDFs e vídeos explicativos."
    },
    {
      question: "Que materiais estão incluídos em cada plano?",
      answer: "Cada plano inclui o programa de treino detalhado em PDF, guia de nutrição adaptável, vídeos explicativos dos exercícios e acesso à biblioteca completa de exercícios. Tudo com atualizações gratuitas vitalícias."
    },
    {
      question: "Os planos são adaptados ao meu nível?",
      answer: "Sim! Cada plano tem variações para diferentes níveis de experiência, com progressões e regressões para cada exercício. Além disso, inclui opções para diferentes frequências de treino semanais."
    },
    {
      question: "Preciso de equipamento específico?",
      answer: "Os planos são desenhados para um ginásio comum. Na compra, terás acesso a uma lista completa do equipamento necessário e sugestões de alternativas para exercícios quando necessário."
    },
    {
      question: "Como funciona a garantia de satisfação?",
      answer: "Oferecemos 7 dias de garantia incondicional. Se não ficares satisfeito com o plano por qualquer motivo, basta enviares um email e devolvemos 100% do valor da compra, sem questões."
    },
    {
      question: "Posso usar o plano em qualquer ginásio?",
      answer: "Sim! Os planos são flexíveis e incluem alternativas para os exercícios principais, permitindo-te adaptar o treino ao equipamento disponível no teu ginásio."
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 py-2 px-6 bg-[#FF8A00]/10 rounded-full">
            <p className="text-[#FF8A00] font-bold uppercase tracking-wider">FAQ</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            Dúvidas <span className="text-[#FF8A00]">Frequentes</span>
          </h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Tudo o que precisas de saber sobre os planos de treino
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] rounded-2xl border border-white/5 p-8 hover:border-[#FF8A00]/20 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
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
          <p className="text-gray-400 mb-6">
            Ainda tens dúvidas? Entra em contacto
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 text-[#FF8A00] font-bold hover:text-[#FF5F00] transition-colors"
          >
            Falar Contigo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 