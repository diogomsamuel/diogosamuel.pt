import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { YouTubeSection } from "../components/sections/YouTubeSection";
import { FeaturedProgramsSection } from "../components/sections/FeaturedProgramsSection";
import { WhyBuySection } from "../components/sections/WhyBuySection";
import { InstitutoSection } from "../components/sections/InstitutoSection";
import { FAQSection } from "../components/sections/FAQSection";
import { CTASection } from "../components/sections/CTASection";

// Função Home - Landing Page
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Definição dos links sociais
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/diogosvmuel",
      icon: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
      color: "text-[#E4405F]"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@diogosvmuel",
      icon: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
      color: "text-[#FF0000]"
    },
    {
      name: "X",
      url: "https://twitter.com/diogosvmuel",
      icon: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
      color: "text-white"
    }
  ];

  // Definição das categorias de produtos
  const categories = [
    { id: 'all', name: 'Todos os Planos' },
    { id: 'gym', name: 'Ginásio' },
    { id: 'home', name: 'Em Casa' },
    { id: 'nutrition', name: 'Nutrição' }
  ];

  // Definição dos produtos
  const products = [
    {
      id: 1,
      title: 'Plano Básico de Hipertrofia',
      description: 'Perfeito para iniciantes que querem ganhar massa muscular. Foco nos principais grupos musculares com treinos 3x por semana.',
      price: '€19.99',
      originalPrice: '€29.99',
      discount: '33% DESC',
      category: 'gym'
    },
    {
      id: 2,
      title: 'Plano Intermediário 5x',
      description: 'Para praticantes com experiência. Divisão de treino em 5 dias focando em grupos musculares específicos.',
      price: '€29.99',
      originalPrice: '€39.99',
      discount: '25% DESC',
      category: 'gym'
    },
    {
      id: 3,
      title: 'Plano Avançado PPL',
      description: 'Programa Push/Pull/Legs para maximizar os ganhos musculares. Recomendado para praticantes avançados.',
      price: '€39.99',
      originalPrice: '€49.99',
      discount: '20% DESC',
      category: 'gym'
    },
    {
      id: 4,
      title: 'Treino em Casa - Básico',
      description: 'Treinos eficientes sem equipamento. Ideal para quem não tem acesso a ginásio.',
      price: '€14.99',
      originalPrice: '€24.99',
      discount: '40% DESC',
      category: 'home'
    },
    {
      id: 5,
      title: 'Treino em Casa - Completo',
      description: 'Programa completo usando apenas peso corporal e equipamentos básicos em casa.',
      price: '€24.99',
      originalPrice: '€34.99',
      discount: '28% DESC',
      category: 'home'
    },
    {
      id: 6,
      title: 'Plano Nutricional Hipertrofia',
      description: 'Plano de alimentação focado em ganho de massa muscular, com opções para diferentes preferências alimentares.',
      price: '€34.99',
      originalPrice: '€44.99',
      discount: '22% DESC',
      category: 'nutrition'
    }
  ];

  // Definição dos produtos em destaque
  const featuredProducts = [
    {
      id: 101,
      title: 'Transformação Total',
      description: 'Um programa de 12 semanas para transformação física completa, combinando treino e plano alimentar coordenados.',
      price: '€49.99',
      originalPrice: '€79.99',
      discount: '37% DESC',
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
      features: [
        'Programa gradual de 8 semanas para iniciantes',
        'Guia nutricional para principiantes',
        'Técnicas de execução passo a passo',
        'Plano de progressão de cargas',
        'Calendário de treinos personalizável'
      ]
    }
  ];

  // Função para tratar a mudança de categoria
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Função para tratar a seleção de produto
  const handleProductSelect = (productId) => {
    // Por enquanto só um console.log - no futuro pode abrir um modal ou redirecionar
    console.log(`Produto selecionado: ${productId}`);
  };

  useEffect(() => {
    // Simulação de carregamento do site
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Diogo Samuel | Code, Lift, Repeat</title>
        <meta name="description" content="Documentando a minha jornada fitness desde o início. Vamos crescer e evoluir juntos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        // Tela de loading
        <div className="fixed inset-0 flex items-center justify-center bg-[#0D0D0D] z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-2xl font-bold text-white">A carregar...</h2>
          </div>
        </div>
      ) : (
        // Conteúdo principal
        <main className="bg-[#0D0D0D] min-h-screen">
          {/* Navbar fixo */}
          <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-[#0D0D0D]/90 border-b border-[#303030]">
            <div className="container mx-auto px-8 py-5">
              <div className="flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl text-white hover:text-[#FF8A00] transition-colors">
                  DIOGO SAMUEL
                </Link>
                
                <div className="hidden md:flex items-center space-x-10">
                  <a href="#about" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">Sobre</a>
                  <Link href="/products" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">Planos</Link>
                  <a href="#journey" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">Jornada</a>
                  <a href="#youtube" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">YouTube</a>
                  <a href="#faq" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">FAQ</a>
                </div>
                
                <Link href="/auth" 
                  className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white px-8 py-2.5 rounded-lg font-medium transition-all text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
                >
                  Login
                </Link>
              </div>
            </div>
          </nav>
          
          {/* Seções */}
          <div className="pt-16">
            <HeroSection />
            <AboutSection socialLinks={socialLinks} />
            <YouTubeSection />
            <FeaturedProgramsSection 
              products={featuredProducts}
              onProductSelect={handleProductSelect}
            />
            <WhyBuySection />
            <InstitutoSection />
            <FAQSection />
            <CTASection />
          </div>
          
          {/* Footer */}
          <footer className="bg-[#0A0A0A] border-t border-[#303030] text-white py-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Coluna 1 - Marca */}
                <div>
                  <h2 className="text-[#FF8A00] text-2xl font-bold">DIOGO SAMUEL</h2>
                  <p className="text-gray-400 text-sm mt-2">Code, lift, repeat - building strength in both worlds.</p>
                </div>
                
                {/* Coluna 2 - Links */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Planos</h3>
                    <ul className="space-y-2">
                      <li><a href="#featured" className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">Transformação Total</a></li>
                      <li><a href="#featured" className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">Pack Iniciante</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Conteúdo</h3>
                    <ul className="space-y-2">
                      <li><a href="#about" className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">Sobre</a></li>
                      <li><a href="#youtube" className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">YouTube</a></li>
                    </ul>
                  </div>
                </div>
                
                {/* Coluna 3 - Social */}
                <div className="flex flex-col items-end justify-between">
                  <div className="flex gap-4">
                    <a href="https://instagram.com/diogosvmuel" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 transition-opacity">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://youtube.com/@diogosvmuel" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:opacity-80 transition-opacity">
                      <span className="sr-only">YouTube</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/diogosvmuel" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity">
                      <span className="sr-only">X (Twitter)</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-[#303030] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                <p>&copy; {new Date().getFullYear()} Diogo Samuel. Todos os direitos reservados.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="/termos" className="hover:text-[#FF8A00] transition-colors">Termos</a>
                  <a href="/privacidade" className="hover:text-[#FF8A00] transition-colors">Privacidade</a>
                  <a href="/cookies" className="hover:text-[#FF8A00] transition-colors">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
