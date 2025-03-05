import { motion } from 'framer-motion';

export function ProductsSection({ categories, products, selectedCategory, onCategoryChange, onProductSelect }) {
  return (
    <section id="products" className="py-24 px-4 bg-gradient-to-b from-[#0D0D0D]/90 to-[#0D0D0D]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 py-2 px-6 bg-gradient-to-r from-[#FF8A00]/10 to-[#FF5F00]/10 rounded-full">
            <p className="text-[#FF8A00] font-bold uppercase tracking-wider">Planos de Treino</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-wide">Os Meus Planos</h2>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`py-2 px-6 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Aviso Legal Conciso */}
          <div className="bg-gradient-to-r from-[#FF8A00]/10 to-[#FF5F00]/10 border border-[#FF8A00]/20 rounded-xl p-4 mb-12 max-w-3xl mx-auto">
            <p className="text-white text-sm">
              <span className="font-bold text-[#FF8A00]">Aviso Legal:</span> Estes planos são baseados em pesquisa e experiência pessoal, não constituindo prescrição de exercício físico nos termos da Lei n.º 39/2012. Consulte um profissional qualificado antes de iniciar.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-xl hover:shadow-[#FF8A00]/10 transition-all duration-300"
            >
              <div className="relative h-48">
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white text-sm font-bold py-1 px-3 rounded-full">
                  {product.discount}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#262626] flex items-center justify-center">
                  <div className="text-[#FF8A00] font-medium">
                    {product.title}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-bold text-[#FF8A00]">{product.price}</div>
                    <div className="text-gray-500 line-through text-sm">{product.originalPrice}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-2 py-1 text-xs text-gray-400">
                    {categories.find(c => c.id === product.category)?.name || 'Plano'}
                  </div>
                </div>
                <button
                  onClick={() => onProductSelect(product.id)}
                  className="w-full bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-[#FF8A00]/20 uppercase text-sm tracking-wide"
                >
                  Ver Detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 