import Link from 'next/link';

export function Navbar() {
  return (
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
  );
} 