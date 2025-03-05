import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex items-center justify-center text-white px-4 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/70 via-[#0D0D0D]/60 to-[#0D0D0D]/70"></div>
        <div className="absolute inset-0 bg-[#0D0D0D]/30"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/95 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #FF8A00 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      <div className="z-10 text-center max-w-5xl mt-[-2rem] relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-0 bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] px-8 tracking-tight leading-[1.25] uppercase">
            DIOGO SAMUEL
          </h1>
          <div className="relative mb-6">
            <span className="text-xl md:text-2xl lg:text-3xl text-white/70 font-bold uppercase tracking-[0.3em] line-through decoration-[#FF8A00] decoration-2">
              PROCRASTINAÇÃO
            </span>
          </div>
          
          <div className="relative w-48 md:w-64 h-[2px] mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5F00] to-transparent animate-pulse"></div>
          </div>

          <div className="mb-0">
            <p className="text-xs md:text-sm text-white/90 font-bold tracking-[0.2em] uppercase">
              TREINO • CONSISTÊNCIA • RESULTADOS
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center px-4"
        >
          <button
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#FF8A00]/30 uppercase tracking-wider"
          >
            Ver Planos de Treino
          </button>
          <button
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/5 backdrop-blur-sm border-2 border-[#FF8A00] text-[#FF8A00] hover:bg-[#FF8A00]/10 font-bold py-4 px-12 rounded-lg text-lg transition-all uppercase tracking-wider"
          >
            A Minha Jornada
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="hidden md:flex w-6 h-10 border-2 border-[#FF8A00]/50 rounded-full justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-[#FF8A00] to-[#FF5F00] rounded-full mt-2"></div>
        </div>
        <div className="md:hidden w-5 h-8 flex justify-center">
          <svg className="w-full h-full text-[#FF8A00]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
} 