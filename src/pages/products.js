import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FeaturedProgramsSection } from "../components/sections/FeaturedProgramsSection";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Categorias de produtos
  const categories = [
    { id: 'all', name: 'Todos os Planos' },
    { id: 'gym', name: 'Ginásio' },
    { id: 'home', name: 'Em Casa' },
    { id: 'nutrition', name: 'Nutrição' }
  ];

  // Produtos regulares
  const products = [
    {
      id: 1,
      title: 'Plano Básico de Hipertrofia',
      description: 'Perfeito para iniciantes que querem ganhar massa muscular. Foco nos principais grupos musculares com treinos 3x por semana.',
      price: '€19.99',
      originalPrice: '€29.99',
      discount: '33% DESC',
      category: 'gym',
      image: '/images/programs/hipertrofia-basico.jpg',
      features: [
        'Treinos 3x por semana',
        'Foco em exercícios compostos',
        'Guia de execução dos exercícios',
        'Planilha de progressão',
        'Suporte via e-mail'
      ]
    },
    {
      id: 2,
      title: 'Plano Intermediário 5x',
      description: 'Para praticantes com experiência. Divisão de treino em 5 dias focando em grupos musculares específicos.',
      price: '€29.99',
      originalPrice: '€39.99',
      discount: '25% DESC',
      category: 'gym',
      image: '/images/programs/intermediario-5x.jpg',
      features: [
        'Treinos 5x por semana',
        'Divisão muscular otimizada',
        'Técnicas avançadas de treino',
        'Periodização de cargas',
        'Suporte via e-mail'
      ]
    },
    {
      id: 3,
      title: 'Plano Avançado PPL',
      description: 'Programa Push/Pull/Legs para maximizar os ganhos musculares. Recomendado para praticantes avançados.',
      price: '€39.99',
      originalPrice: '€49.99',
      discount: '20% DESC',
      category: 'gym',
      image: '/images/programs/avancado-ppl.jpg',
      features: [
        'Treinos 6x por semana',
        'Sistema Push/Pull/Legs',
        'Técnicas de intensificação',
        'Periodização avançada',
        'Suporte via e-mail'
      ]
    },
    {
      id: 4,
      title: 'Treino em Casa - Básico',
      description: 'Treinos eficientes sem equipamento. Ideal para quem não tem acesso a ginásio.',
      price: '€14.99',
      originalPrice: '€24.99',
      discount: '40% DESC',
      category: 'home',
      image: '/images/programs/casa-basico.jpg',
      features: [
        'Treinos com peso corporal',
        'Exercícios para todos os grupos musculares',
        'Guia de execução detalhado',
        'Progressões para cada exercício',
        'Suporte via e-mail'
      ]
    },
    {
      id: 5,
      title: 'Treino em Casa - Completo',
      description: 'Programa completo usando apenas peso corporal e equipamentos básicos em casa.',
      price: '€24.99',
      originalPrice: '€34.99',
      discount: '28% DESC',
      category: 'home',
      image: '/images/programs/casa-completo.jpg',
      features: [
        'Treinos com equipamentos básicos',
        'Plano de progressão detalhado',
        'Vídeos explicativos',
        'Variações para cada nível',
        'Suporte via e-mail'
      ]
    },
    {
      id: 6,
      title: 'Plano Nutricional Hipertrofia',
      description: 'Plano de alimentação focado em ganho de massa muscular, com opções para diferentes preferências alimentares.',
      price: '€34.99',
      originalPrice: '€44.99',
      discount: '22% DESC',
      category: 'nutrition',
      image: '/images/programs/nutricao-hipertrofia.jpg',
      features: [
        'Cálculo personalizado de macros',
        'Lista de substituições de alimentos',
        'Receitas práticas e saudáveis',
        'Guia de suplementação',
        'Suporte via e-mail'
      ]
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Planos de Treino | Diogo Samuel</title>
        <meta name="description" content="Planos de treino personalizados para todos os níveis. Transforme seu corpo com programas estruturados e suporte profissional." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#0D0D0D] min-h-screen">
        <Navbar />

        {/* Header Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Planos de Treino
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Escolhe o plano que melhor se adapta aos teus objetivos e nível de experiência. 
              Todos os programas incluem suporte personalizado e atualizações gratuitas.
            </p>
          </div>
        </section>

        {/* Featured Programs Section */}
        <FeaturedProgramsSection />

        {/* Category Filter */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#FF8A00] text-white'
                      : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#303030]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#303030] hover:border-[#FF8A00] transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
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

        <Footer />
      </main>
    </>
  );
} 