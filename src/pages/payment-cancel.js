import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiAlertCircle, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function PaymentCancel() {
  return (
    <>
      <Head>
        <title>Pagamento Cancelado | Diogo Samuel</title>
        <meta name="description" content="Pagamento cancelado. Pode tentar novamente quando quiser." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-4 relative">
        <div className="absolute inset-0 bg-noise opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#FF8A00]/10 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-white">
                Diogo <span className="text-[#FF8A00]">Samuel</span>
              </h1>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl p-8 border border-[#333] shadow-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <div className="bg-gradient-to-r from-[#FF4B4B] to-[#FF0000] w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                <FiAlertCircle className="text-white text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Pagamento Cancelado</h2>
              <p className="text-xl text-gray-300 mb-8">
                O seu processo de pagamento foi cancelado. Não se preocupe, não foi cobrado nenhum valor.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products"
                  className="inline-flex items-center bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                >
                  <FiShoppingCart className="mr-2" /> Ver Planos
                </Link>
                
                <Link 
                  href="/"
                  className="inline-flex items-center bg-[#1A1A1A] border border-[#333] hover:border-[#FF8A00] text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  <FiArrowLeft className="mr-2" /> Voltar à Página Inicial
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center text-gray-400 text-sm"
          >
            <p>Se precisar de ajuda, contacte-nos através de <a href="mailto:suporte@diogosamuel.pt" className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline transition-colors">suporte@diogosamuel.pt</a></p>
          </motion.div>
        </div>
      </main>
    </>
  );
} 