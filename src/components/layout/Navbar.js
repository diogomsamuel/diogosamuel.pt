import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Verificar o scroll para adicionar sombra na navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu móvel quando a rota mudar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);
  
  // Função melhorada para lidar com links internos com hash
  const handleHashLink = (e, hash) => {
    e.preventDefault();
    
    // Extrair o ID do hash (remover #)
    const id = hash.replace('#', '');
    
    // Se estiver na página inicial, rolar diretamente para a seção
    if (router.pathname === '/') {
      // Tentar encontrar o elemento
      const element = document.getElementById(id);
      
      if (element) {
        // Compensar a altura da navbar fixa para rolagem precisa
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Elemento com ID "${id}" não encontrado na página`);
      }
    } else {
      // Se estiver em outra página, navegar para a página inicial com o hash
      console.log(`Navegando para /${hash}`);
      router.push('/' + hash);
    }
  };

  const navLinks = [
    { href: '#about', label: 'Sobre', isHash: true },
    { href: '/products', label: 'Planos', isHash: false },
    { href: '/blog', label: 'Blog', isHash: false },
    { href: 'https://youtube.com/@diogosvmuel', label: 'YouTube', isExternal: true },
    { href: '#faq', label: 'FAQ', isHash: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-[#0D0D0D]/90 border-b border-[#303030] transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 sm:px-8 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-white hover:text-[#FF8A00] transition-colors">
            DIOGO SAMUEL
          </Link>
          
          {/* Links de navegação para desktop */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link, index) => (
              link.isExternal ? (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
                >
                  {link.label}
                </a>
              ) : link.isHash ? (
                <a 
                  key={index}
                  href={link.href} 
                  onClick={(e) => handleHashLink(e, link.href)} 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/auth" 
              className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white px-6 sm:px-8 py-2.5 rounded-lg font-medium transition-all text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
            >
              Login
            </Link>
            
            {/* Botão para menu mobile */}
            <button 
              className="lg:hidden flex flex-col space-y-1.5 p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
        
        {/* Menu mobile */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-3 py-4">
            {navLinks.map((link, index) => (
              link.isExternal ? (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium py-2"
                >
                  {link.label}
                </a>
              ) : link.isHash ? (
                <a 
                  key={index}
                  href={link.href} 
                  onClick={(e) => handleHashLink(e, link.href)} 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium py-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium py-2"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 