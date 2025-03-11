import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FeaturedProgramsSection } from "../components/sections/FeaturedProgramsSection";
import Image from 'next/image';
import axiosInstance from "../lib/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Função para lidar com a navegação por hash quando a página carrega
  useEffect(() => {
    // Verificar se há um hash na URL e rolar para a seção correspondente
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1];
      const targetElement = document.getElementById(hash);
      
      if (targetElement) {
        // Adicionar um pequeno delay para garantir que todos os elementos foram renderizados
        setTimeout(() => {
          // Compensar a altura da navbar fixa
          const navbarHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 500);
      }
    }
  }, [router.asPath, products]); // Adicionar products como dependência para que o scroll funcione após o carregamento dos produtos

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get("/api/plans");
        
        if (data.success) {
          // Transform API data to match the UI format
          const formattedProducts = data.plans.map(plan => {
            // Using the first variant as default
            const defaultVariant = plan.variants && plan.variants.length > 0 ? plan.variants[0] : null;
            
            return {
              id: plan.id,
              title: plan.name,
              description: plan.description,
              image: plan.image_url || "/images/placeholder-blog.svg",
              price: defaultVariant ? `${defaultVariant.price}€` : `${plan.base_price}€`,
              originalPrice: plan.discount_price ? `${plan.base_price}€` : null,
              discount: plan.discount_percentage ? `${plan.discount_percentage}% OFF` : null,
              category: plan.category_id,
              category_name: plan.category_name,
              features: plan.features ? plan.features.map(f => f.description) : [],
              variants: plan.variants || [],
              status: plan.status,
              is_active: plan.is_active
            };
          });
          
          setProducts(formattedProducts);
          setFilteredProducts(formattedProducts);
          
          // Extract unique categories
          const categoriesData = data.categories || [];
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Erro ao carregar planos. Usando dados temporários.");
        
        // Usar dados mockados temporários para não quebrar a experiência do usuário
        const mockProducts = [
          {
            id: 1,
            title: 'Plano Hipertrofia',
            description: 'Plano completo para ganho de massa muscular com treinos 5x por semana.',
            image: '/images/blog-treino.svg',
            price: '49.99€',
            originalPrice: '69.99€',
            discount: '28% OFF',
            category: 1,
            category_name: 'Treino',
            features: [
              'Treinos para todos os grupos musculares',
              'Calendário de 12 semanas',
              'Vídeos explicativos de cada exercício',
              'Suporte por 3 meses'
            ],
            variants: [],
            status: 'active',
            is_active: true
          },
          {
            id: 2,
            title: 'Plano Nutrição',
            description: 'Plano nutricional personalizado para maximizar seus ganhos e recuperação.',
            image: '/images/blog-nutricao.svg',
            price: '39.99€',
            originalPrice: '59.99€',
            discount: '33% OFF', 
            category: 2,
            category_name: 'Nutrição',
            features: [
              'Cardápio personalizado',
              'Cálculo de macronutrientes',
              'Receitas fitness',
              'Ajustes mensais'
            ],
            variants: [],
            status: 'active',
            is_active: true
          },
          {
            id: 3,
            title: 'Plano Completo',
            description: 'Combinação perfeita de treino e nutrição para resultados máximos.',
            image: '/images/blog-lifestyle.svg',
            price: '79.99€',
            originalPrice: '119.99€',
            discount: '33% OFF',
            category: 3,
            category_name: 'Lifestyle',
            features: [
              'Plano de treino completo',
              'Plano nutricional personalizado',
              'Suplementação recomendada',
              'Suporte prioritário',
              'Consultas mensais online'
            ],
            variants: [],
            status: 'active',
            is_active: true
          }
        ];
        
        const mockCategories = [
          { id: 'all', name: 'Todos' },
          { id: 1, name: 'Treino' },
          { id: 2, name: 'Nutrição' },
          { id: 3, name: 'Lifestyle' }
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setCategories(mockCategories);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => 
        product.category == selectedCategory
      ));
    }
  }, [selectedCategory, products]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handlePurchase = async (planId, variantId) => {
    try {
      setIsProcessing(true);
      
      // Check if user is logged in
      const sessionResponse = await axiosInstance.get("/api/session");
      if (!sessionResponse.data.valid) {
        toast.info("Por favor, faça login para comprar este plano.");
        router.push("/auth?redirect=products");
        return;
      }
      
      // Create purchase
      const { data } = await axiosInstance.post("/api/purchases/create", {
        plan_id: planId,
        variant_id: variantId || (products.find(p => p.id === planId).variants[0]?.id)
      });
      
      if (data.success && data.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error("Falha ao criar sessão de checkout");
      }
    } catch (error) {
      console.error("Error creating purchase:", error);
      toast.error("Erro ao processar compra. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Planos de Treino | Diogo Samuel</title>
        <meta name="description" content="Descubra os planos de treino personalizados do Diogo Samuel para transformar o seu corpo e saúde." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ToastContainer position="top-right" autoClose={5000} />

      <main className="bg-[#0D0D0D] min-h-screen relative">
        <div className="absolute inset-0 bg-noise opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#FF8A00]/10 via-transparent to-transparent"></div>
        
        <Navbar />

        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-32 pb-16 px-4 relative z-10"
        >
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Planos de Treino
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Escolhe o plano que melhor se adapta aos teus objetivos e nível de experiência. 
              Todos os programas incluem suporte personalizado e atualizações gratuitas.
            </p>
          </div>
        </motion.section>

        {/* Featured Programs Section */}
        <FeaturedProgramsSection />

        {/* Category Filter */}
        <section className="py-16 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white shadow-lg'
                    : 'bg-[#1A1A1A]/50 backdrop-blur-sm text-gray-400 hover:bg-[#1A1A1A] border border-[#333]'
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white shadow-lg'
                      : 'bg-[#1A1A1A]/50 backdrop-blur-sm text-gray-400 hover:bg-[#1A1A1A] border border-[#333]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-20">
                <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="mb-6 flex justify-center">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Fundo escuro circular */}
                    <circle cx="60" cy="60" r="50" fill="#1A1A1A" />
                    <circle cx="60" cy="60" r="49" stroke="#303030" strokeWidth="2" />
                    
                    {/* Ícone de pesquisa com lupa */}
                    <circle cx="48" cy="48" r="20" stroke="#FF8A00" strokeWidth="4" strokeOpacity="0.8" />
                    <line x1="63" y1="63" x2="80" y2="80" stroke="#FF8A00" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.8" />
                    
                    {/* X no centro para indicar "não encontrado" */}
                    <line x1="45" y1="45" x2="51" y2="51" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                    <line x1="51" y1="45" x2="45" y2="51" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum plano encontrado</h3>
                <p className="text-gray-400">Não encontrámos planos para esta categoria. Tente outra opção.</p>
              </motion.div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-80" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A00] transition-colors">{product.title}</h3>
                      <div className="flex flex-col items-end">
                        <span className="text-[#FF8A00] font-bold text-2xl">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                        )}
                        {product.discount && (
                          <span className="bg-[#FF8A00]/10 text-[#FF8A00] text-xs font-medium px-2 py-1 rounded">
                            {product.discount}
                          </span>
                        )}
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
                    <button 
                      onClick={() => handlePurchase(product.id)}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform group-hover:scale-105 duration-300"
                    >
                      {isProcessing ? 'Processando...' : 'Comprar Agora'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
} 