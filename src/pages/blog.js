import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { motion } from "framer-motion";

// Dados fictícios para o blog
const BLOG_POSTS = [
  {
    id: 1,
    title: "A importância do treino de força para a saúde geral",
    excerpt: "Descubra porque o treino de força é essencial para a sua saúde a longo prazo e como começar hoje mesmo.",
    imageUrl: "/images/blog-treino.svg",
    category: "Treino",
    date: "12 Mar 2024",
    readTime: "6 min"
  },
  {
    id: 2,
    title: "Nutrição para ganho de massa muscular",
    excerpt: "Aprenda quais alimentos devem fazer parte da sua dieta para maximizar seus ganhos no ginásio.",
    imageUrl: "/images/blog-nutricao.svg",
    category: "Nutrição",
    date: "5 Mar 2024",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "Como combinar código e fitness na sua rotina",
    excerpt: "Estratégias para profissionais de tecnologia manterem-se ativos mesmo com longas horas sentados.",
    imageUrl: "/images/blog-lifestyle.svg",
    category: "Lifestyle",
    date: "28 Fev 2024",
    readTime: "5 min"
  },
  {
    id: 4,
    title: "Mitos e verdades sobre suplementação",
    excerpt: "Desmistificando os suplementos mais populares e quais realmente funcionam baseado em evidências.",
    imageUrl: "/images/blog-nutricao.svg",
    category: "Nutrição",
    date: "20 Fev 2024",
    readTime: "7 min"
  },
  {
    id: 5,
    title: "Guia completo para iniciantes em musculação",
    excerpt: "Tudo o que você precisa saber para começar a treinar com pesos de forma segura e eficiente.",
    imageUrl: "/images/blog-treino.svg",
    category: "Treino",
    date: "15 Fev 2024",
    readTime: "10 min"
  },
  {
    id: 6,
    title: "Recuperação muscular: estratégias que realmente funcionam",
    excerpt: "Técnicas comprovadas para acelerar a recuperação e melhorar seus resultados.",
    imageUrl: "/images/blog-recuperacao.svg",
    category: "Recuperação",
    date: "8 Fev 2024",
    readTime: "6 min"
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'Treino', name: 'Treino' },
  { id: 'Nutrição', name: 'Nutrição' },
  { id: 'Lifestyle', name: 'Lifestyle' },
  { id: 'Recuperação', name: 'Recuperação' }
];

export default function Blog() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Filtrar os posts com base na categoria e termo de pesquisa
    let result = BLOG_POSTS;
    
    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(term) || 
          post.excerpt.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(result);
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <Head>
        <title>Blog | Diogo Samuel</title>
        <meta name="description" content="Artigos, dicas e conhecimento sobre fitness, nutrição e lifestyle para te ajudar a alcançar os teus objetivos." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
              Blog
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Dicas, artigos e conhecimento para te ajudar a alcançar teus objetivos fitness e de saúde,
              enquanto equilibras a vida digital com o bem-estar físico.
            </p>
          </div>
        </motion.section>

        {/* Search & Filter Section */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
              {/* Barra de pesquisa */}
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1A1A1A]/80 border border-[#333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  />
                  <svg 
                    className="absolute right-3 top-3 w-5 h-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filtros de Categoria */}
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white shadow-lg'
                        : 'bg-[#1A1A1A]/50 backdrop-blur-sm text-gray-400 hover:bg-[#1A1A1A] border border-[#333]'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensagem de Nenhum Resultado */}
            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4 text-5xl">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum artigo encontrado</h3>
                <p className="text-gray-400">Tente outra pesquisa ou categoria.</p>
              </motion.div>
            )}

            {/* Grid de Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all group"
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
                      <span className="absolute top-3 left-3 z-20 bg-[#FF8A00] text-white text-xs font-medium px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback para uma imagem padrão em caso de erro
                          e.target.src = "/images/placeholder-blog.svg";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A00] transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime} de leitura</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-16 px-4 relative z-10"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#252525] rounded-2xl p-8 md:p-12 border border-[#333] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-[#FF8A00]/20 to-transparent opacity-40" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Receba as últimas novidades e dicas
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl">
                  Subscreve a nossa newsletter para receberes artigos, dicas e promoções exclusivas diretamente no teu email.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="flex-grow bg-[#0D0D0D]/70 border border-[#333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
                  >
                    Subscrever
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        <Footer />
      </main>
    </>
  );
} 