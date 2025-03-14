import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Função para lidar com links internos com hash
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
      router.push('/' + hash);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Aqui você pode implementar a lógica para enviar o email para sua API
      // Por enquanto, vamos apenas simular um sucesso
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#303030] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Coluna 1 - Marca */}
          <div>
            <h2 className="text-[#FF8A00] text-2xl font-bold">DIOGO SAMUEL</h2>
            <p className="text-gray-400 text-sm mt-2 mb-4">Code, lift, repeat - building strength in both worlds.</p>
            
            {/* Ícones sociais agora abaixo do slogan */}
            <div className="flex gap-4 mt-4">
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
          
          {/* Coluna 2 - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Planos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#featured" onClick={(e) => handleHashLink(e, '#featured')} className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">
                    Transformação Total
                  </a>
                </li>
                <li>
                  <a href="#featured" onClick={(e) => handleHashLink(e, '#featured')} className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">
                    Pack Iniciante
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Conteúdo</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" onClick={(e) => handleHashLink(e, '#about')} className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@diogosvmuel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => handleHashLink(e, '#faq')} className="text-gray-400 hover:text-[#FF8A00] transition-colors text-sm">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Coluna 3 - Newsletter */}
          <div className="flex flex-col items-end justify-between">
            <div className="w-full">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Newsletter</h3>
              {subscribed ? (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-center">
                  <p className="text-green-400 text-sm">Obrigado por subscrever!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu email"
                      required
                      className="bg-[#1F1F1F] border border-[#303030] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:opacity-50"
                    >
                      {loading ? 'Aguarde...' : 'Subscrever'}
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                  <p className="text-gray-500 text-xs mt-2">
                    Fique a par das novidades e dicas exclusivas
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#303030] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <p>&copy; {new Date().getFullYear()} Diogo Samuel. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/termos" className="hover:text-[#FF8A00] transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-[#FF8A00] transition-colors">Privacidade</Link>
            <Link href="/cookies" className="hover:text-[#FF8A00] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 