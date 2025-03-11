import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { YouTubeSection } from "../components/sections/YouTubeSection";
import { FeaturedProgramsSection } from "../components/sections/FeaturedProgramsSection";
import { WhyBuySection } from "../components/sections/WhyBuySection";
import { InstitutoSection } from "../components/sections/InstitutoSection";
import { FAQSection } from "../components/sections/FAQSection";
import { CTASection } from "../components/sections/CTASection";
import { useRouter } from "next/router";

// Função Home - Landing Page
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  // Função para lidar com a navegação por hash quando a página carrega
  useEffect(() => {
    // Verificar se há um hash na URL e rolar para a seção correspondente
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1];
      const scrollToSection = () => {
        const targetElement = document.getElementById(hash);
        
        if (targetElement) {
          // Compensar a altura da navbar fixa
          const navbarHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
        return false;
      };

      // Tentar rolar com um pequeno delay para garantir que os elementos foram renderizados
      setTimeout(() => {
        // Se não conseguir encontrar na primeira tentativa, tentar algumas vezes mais
        let attempts = 0;
        const maxAttempts = 5;
        const interval = setInterval(() => {
          if (scrollToSection() || attempts >= maxAttempts) {
            clearInterval(interval);
          }
          attempts++;
        }, 200);
      }, 300);
    }
  }, [router.asPath]);

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
          {/* Navbar */}
          <Navbar />
          
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
          <Footer />
        </main>
      )}
    </>
  );
}
