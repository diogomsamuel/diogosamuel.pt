import { motion } from 'framer-motion';
import Image from 'next/image';

export function FeaturedProgramsSection() {
  const featuredProducts = [
    {
      id: 101,
      title: 'Transformação Total',
      description: 'Um programa de 12 semanas para transformação física completa, combinando treino e plano alimentar coordenados.',
      price: '€49.99',
      originalPrice: '€79.99',
      discount: '37% DESC',
      image: '/images/programs/transformacao-total.jpg',
      features: [
        'Plano de treino detalhado para 12 semanas',
        'Plano nutricional completo com macros calculados',
        'Acompanhamento de progresso semanal',
        'Vídeos explicativos de todos os exercícios',
        'Suporte via e-mail por 3 meses'
      ]
    },
    {
      id: 102,
      title: 'Pack Iniciante Completo',
      description: 'Tudo o que precisas para começar a tua jornada fitness com o pé direito, mesmo sem experiência prévia.',
      price: '€39.99',
      originalPrice: '€59.99',
      discount: '33% DESC',
      image: '/images/programs/pack-iniciante.jpg',
      features: [
        'Programa gradual de 8 semanas para iniciantes',
        'Guia nutricional para principiantes',
        'Técnicas de execução passo a passo',
        'Plano de progressão de cargas',
        'Calendário de treinos personalizável'
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white mb-8">Planos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#303030] hover:border-[#FF8A00] transition-colors">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{product.title}</h3>
                  <div className="flex flex-col items-end">
                    <span className="text-[#FF8A00] font-bold text-2xl">{product.price}</span>
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                    <span className="bg-[#FF8A00]/10 text-[#FF8A00] text-xs font-medium px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">{product.description}</p>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-[#FF8A00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 