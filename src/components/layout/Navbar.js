import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navbar() {
  const router = useRouter();
  
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-[#0D0D0D]/90 border-b border-[#303030]">
      <div className="container mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-white hover:text-[#FF8A00] transition-colors">
            DIOGO SAMUEL
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <a 
              href="#about" 
              onClick={(e) => handleHashLink(e, '#about')} 
              className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
            >
              Sobre
            </a>
            <Link href="/products" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">
              Planos
            </Link>
            <Link href="/blog" className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium">
              Blog
            </Link>
            <a 
              href="https://youtube.com/@diogosvmuel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
            >
              YouTube
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleHashLink(e, '#faq')} 
              className="text-white/80 hover:text-[#FF8A00] transition-all text-sm uppercase tracking-wider font-medium"
            >
              FAQ
            </a>
          </div>
          
          <Link href="/auth" 
            className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white px-8 py-2.5 rounded-lg font-medium transition-all text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
} 